package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"google.golang.org/api/option"
	"google.golang.org/api/sheets/v4"
)

type Event struct {
	Title           string         `json:"title"`
	Description     string         `json:"description"`
	SeatsAvailable  SeatsAvailable `json:"seatsAvailable"`
	Start           string         `json:"start"`
	BackgroundColor string         `json:"backgroundColor"`
}

type SeatsAvailable struct {
	S103a6 bool `json:"s103a6"`
	S103b5 bool `json:"s103b5"`
	S103b6 bool `json:"s103b6"`
	S103b7 bool `json:"s103b7"`
}

type Response struct {
	Events []Event `json:"events"`
}

func main() {
	http.HandleFunc("/v1/spring-training-games", handleGetSpringTrainingGames)
	fmt.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleGetSpringTrainingGames(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	pathToCredentials := os.Getenv("GOOGLE_SHEETS_CREDENTIALS")
	if pathToCredentials == "" {
		http.Error(w, "GOOGLE_SHEETS_CREDENTIALS environment variable is not set", http.StatusInternalServerError)
		return
	}

	srv, err := sheets.NewService(ctx, option.WithCredentialsFile(pathToCredentials))
	if err != nil {
		http.Error(w, fmt.Sprintf("Unable to retrieve Sheets client: %v", err), http.StatusInternalServerError)
		return
	}

	spreadsheetId := "1GI2AWXcDdTAKTPdYVmLN6vvX0Bz7whRxZRQM1EnDBY4"
	readRange := "2025!A1:I16"

	resp, err := srv.Spreadsheets.Values.Get(spreadsheetId, readRange).Do()
	if err != nil {
		http.Error(w, fmt.Sprintf("Unable to retrieve data from sheet: %v", err), http.StatusInternalServerError)
		return
	}

	// Skip header row and process data
	var events []Event
	for _, row := range resp.Values[1:] {
		if len(row) < 9 {
			continue
		}

		// Parse date
		date, err := time.Parse("01/02/2006", row[3].(string))
		if err != nil {
			continue
		}

		// Create event
		event := Event{
			Title:       row[0].(string),
			Description: row[1].(string),
			SeatsAvailable: SeatsAvailable{
				S103a6: strings.ToLower(row[5].(string)) == "available",
				S103b5: strings.ToLower(row[6].(string)) == "available",
				S103b6: strings.ToLower(row[7].(string)) == "available",
				S103b7: strings.ToLower(row[8].(string)) == "available",
			},
			Start:           date.Format("2006-01-02"),
			BackgroundColor: determineBackgroundColor(row[5:]...),
		}
		events = append(events, event)
	}

	// Create response
	response := Response{
		Events: events,
	}

	// Set JSON response headers
	w.Header().Set("Content-Type", "application/json")

	// Encode and send response
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, fmt.Sprintf("Error encoding JSON: %v", err), http.StatusInternalServerError)
		return
	}
}

func determineBackgroundColor(seats ...interface{}) string {
	availableCount := 0
	for _, seat := range seats {
		if strings.ToLower(seat.(string)) == "available" {
			availableCount++
		}
	}

	if availableCount == len(seats) {
		return "#28a745" // All seats available - green
	} else if availableCount == 0 {
		return "#dc3545" // No seats available - red
	}
	return "#ffa500" // Some seats available - orange
}

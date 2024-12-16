# Spring Training API

This is a Go application that serves data from Google Sheets for spring training
games.

## Prerequisites

- Docker and Docker Compose installed on your system
- Google Sheets API credentials (saved as `credentials.json`)

## Setup

1. Place your Google Sheets API credentials file in the project root directory as
  `credentials.json`
2. Build and run the application using Docker Compose:

```bash
docker-compose up --build
```

3. The API will be available at `http://localhost:8080/v1/spring-training-games`

## API Endpoints

### GET /v1/spring-training-games

Returns spring training games data from the configured Google Sheet.

## Development

To run the application without Docker:

1. Make sure you have Go installed
2. Set the environment variable for credentials:

```bash
export GOOGLE_SHEETS_CREDENTIALS=./credentials.json
```

3. Run the application:

```
go run main.go
```

## Environment Variables

- `GOOGLE_SHEETS_CREDENTIALS`: Path to the Google Sheets API credentials JSON file

## Notes

- Make sure your `credentials.json` file is kept secure and not committed to version control
- The application runs on port 8080 by default
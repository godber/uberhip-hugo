import json
from datetime import datetime

def ordinal(n):
    if 10 <= n % 100 <= 20:
        suffix = 'th'
    else:
        suffix = {1: 'st', 2: 'nd', 3: 'rd'}.get(n % 10, 'th')
    return str(n) + suffix

def parse_games_file(filename):
    events = []
    
    # Sample seat data - in reality this might come from another source
    default_seats = {
        "s103a6": True,
        "s103b5": True,
        "s103b6": True,
        "s103b7": True
    }
    
    with open(filename, 'r') as file:
        for line in file:
            if line.strip():  # Skip empty lines
                # Parse each line
                parts = line.strip().split(' at Giants ')
                opponent = parts[0]
                date_str = parts[1]
                
                # Parse the date
                date_obj = datetime.strptime(date_str, '%a, %b %d, %Y %I:%M%p MST')
                formatted_date = date_obj.strftime('%Y-%m-%d')
                
                # Create event object
                event = {
                    "title": opponent,
                    "description": f"Giants versus {opponent} at {date_obj.strftime('%I:%M%p')} on {date_obj.strftime('%A, %B')} {ordinal(date_obj.day)}, {date_obj.strftime('%Y')}",
                    "seatsAvailable": default_seats.copy(),
                    "start": formatted_date,
                    # Using a default green color, but you could customize based on team
                    "backgroundColor": "#28a745"
                }
                
                events.append(event)
    
    # Create the final JSON structure
    output = {"events": events}
    
    return output

# Run the parser and save to JSON file
if __name__ == "__main__":
    result = parse_games_file('games.txt')
    
    # Save to JSON file with nice formatting
    with open('games.json', 'w') as outfile:
        json.dump(result, outfile, indent=2)
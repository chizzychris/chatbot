import json
import pandas as pd
import os

# Print the current working directory
print("Current working directory:", os.getcwd())

# Load the CSV file (adjust the path based on where the CSV file is stored)
df = pd.read_csv('C:/Users/USER/Downloads/chatbot/public/Datasetprojpowerbi.csv')

# Initialize an empty dictionary for intents
intents = {"intents": []}

# Iterate over the rows in the DataFrame
for index, row in df.iterrows():
    # Extract the pattern (complaint) and intent (category)
    pattern = row['Complaint']  # replace 'Complaint' with the actual column name in your CSV
    intent = row['Intent']      # replace 'Intent' with the actual column name in your CSV
    
    # Check if the intent already exists in the intents dictionary
    found_intent = False
    for intent_obj in intents['intents']:
        if intent_obj['tag'] == intent:
            intent_obj['patterns'].append(pattern)
            found_intent = True
            break
    
    # If the intent is not found, create a new intent object
    if not found_intent:
        intents['intents'].append({
            "tag": intent,
            "patterns": [pattern],
            "responses": ["Thank you for your complaint. We will address this issue as soon as possible."]
        })

# Save the intents to a JSON file locally
with open('intents.json', 'w') as json_file:
    json.dump(intents, json_file, indent=4)

print("Intents file created successfully.")

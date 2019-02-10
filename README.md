# speedtest-monitor

Hits speedtest.net continuously, logging the results on a Google Sheet.

### Setup
1. Get access to Google Drive.

    1. Go to the Google APIs Console.
    1. Create a new project.
    1. Click Enable API. Search for and enable the Google Drive API.
    1. Create credentials for a Web Server to access Application Data.
    1. Name the service account and grant it a Project Role of Editor.
    1. Download the JSON file.
    1. Copy the JSON file to your code directory and rename it to `client_secret.json`.

1. Connect to a specific sheet.
   1. Create a new sheet in Google Drive.
   1. Find the `client_email` inside `client_secret.json`. Back in your spreadsheet, click the Share button in the top right, and paste the client email into the People field to give it edit rights. Hit Send.
   1. Overwrite the `LOG_SHEET_ID` in `index.mjs` with your sheet ID.
   
1. Run `yarn`.

### Run the logger
Run `yarn start`.
## What this does
Get the 5 last records of the fuel level and export by csv to an email, using attachment file.

## How to use on Tago
Do your own modifications if you want.<br>
Upload to Tago analysis, in the admin website.<br>
Add the environment variable `device_token` with the device token of your choice.
Add the environment variable `email` with the email address to receive the message.

## How to run the analysis from your machine  
Make sure you have npm and node installed in your machine.<br>
Add the environment variable `device_token` with the device token of your choice, to the analysis configuration, in the admin website.<br>
Add the environment variable `email` with the email of your choice, to the analysis configuration, in the admin website.<br>
Open the index.js, change `MY-ANALYSIS-TOKEN-HERE` line for your analysis token.<br>
Opens the terminal and run:

`npm install`<br>
`node .`


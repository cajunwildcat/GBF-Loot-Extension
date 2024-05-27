# GBF Loot Tracker

A chrome extension that automatically records the loot you get from raids and quests in Granblue Fantasy.

## What does what

- `popup.html` and `popup.js` are for handling the extension popup when clicking the extension icon
- `manifest.json` is used for information about the extension when chrome looks at it
- `background.js` runs as its name suggests- in the background. Whenever a URL matching the pattern of `/#result` is detected it injects the code in the rest of the file into the page.
 - Importantly, this code is injected and run in the MAIN script world instead of the ISOLATED script world in order to access the JS objects created at runtime by GBF's code. This is done to get the data from the Game object instead of scraping the DOM
- `contentScript.js` handles messages sent from the code injected by `background.js` to update the extension storage since the injected script can not do it due it being in the MAIN script world instead of ISOLATED.

## Eample Loot

The data in `exampleData.json` is taken from M3 Colossus. To import this data into your own storage to be able to see the data in the popup use the following steps:
1. Open the extension popup by clicking the icon
2. Right click anywhere in the popup window and click inspect
3. In the developer console type `chrome.storage.local.set({"M3 Colossus": <data>});` and replace `<data>` with the JSON object in `exampleData.json`

## Raw Data
The data for each fight collected so far can be seen by opening the developer console of the extension popup and typing `chrome.storage.local.get(null).then(r=>console.log(r));`. Data for a specific fight only can be seen by replace `null` with a string of the fight's name as it appears in the extension popup navbar.
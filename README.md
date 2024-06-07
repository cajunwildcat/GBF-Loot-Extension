# GBF Loot Tracker

A chrome extension that automatically records the loot you get from raids and quests in Granblue Fantasy.

## Installation

After cloning, open Chrome and go to the Extensions page. Click `Load unpacked` and select the containing folder.

## What does what

- `popup.html` and `popup.js` are for handling the extension popup when clicking the extension icon
- `manifest.json` is used for information about the extension when chrome looks at it
- `background.js` runs as its name suggests- in the background. Whenever a URL matching the pattern of `/#result` is detected it injects the code in the rest of the file into the page. It also handles changing the icon of the extension popup when a results screen is loaded and when the loot data is successfully loaded
 - Importantly, this code is injected and run in the MAIN script world instead of the ISOLATED script world in order to access the JS objects created at runtime by GBF's code. This is done to get the data from the Game object instead of scraping the DOM
- `contentScript.js` handles messages sent from the code injected by `background.js` to update the extension storage since the injected script can not do it due it being in the MAIN script world instead of ISOLATED. It also sends messages to `background.js` to change the extension icon when data is being processed on a result screen

## Eample Loot

The data in `exampleData.json` is taken from M3 Colossus. To import this data into your own storage to be able to see the data in the popup use the following steps:
1. Open the extension popup by clicking the icon
2. Right click anywhere in the popup window and click inspect
3. In the developer console type `chrome.storage.local.set({305601: <data>});` and replace `<data>` with the JSON object in `exampleData.json`

## Raw Data

The data for each fight collected so far can be seen by opening the developer console of the extension popup and expanding the object logged as `raid`.

## TODO

- Renaming for standard fights?
- Add locally stored version number
 - Checking locally stored version vs expected allows for handling of updateing data to new formats
- Clean up code
- Customizable pins at top of each fight
- Ability to hide categories
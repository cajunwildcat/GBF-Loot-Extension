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

## Planned Features
- High Priority
 - Highlight "unread" fights in sidebar
 - Ability to hide categories
- Lower Priority
 - Add external event fight IDs that are fetched on browser launch
  - Don't need to update extension for every event, just event ID file in git repo?
  - Refresh interval for people who don't close browser?
 - Clean up code
 - Ability to link to custom CSS file for user controlled styling

Update Version 1.21 (16/03/2025):
 - Fixed a bug with the popup related to artifacts

Update Version 1.2 (16/03/2025):
- Added basic tracking support for Artifacts
 - More detailed info will be available at a later date

Update Version 1.1 (23/09/2024):
- Changed the way item counts and percentages are displayed
 - You no longer need to hover over the item to see total drops
 - Total kills of a fight are shown at the top instead of having to self-calculate based on a chest's drop rate
 - The exact format is not finalzied and subject to change in future updates
- You can now pin items per fight
 - Right click an item to get options to pin to 1 of 2 rows at the top of the fight info
 - Items can be unpinned from the pin rows, or from the item entires in the chests
 - Pinned item count shows the total number of items across all chest types
- All fights can be renamed, not just Solo Fights
- Certain Solo Fights are pre-filled out in categories (Arcarum, Special Quests, Co-op Quests, and Free Quests for now)
 - Fights in these categories will not show up until you finish them once, similar to old Solo Fight behavior
 - Certain event quests are planned to be added in similar categories in the future
- Impossible 8★ and above raids are not longer in Solo Fights; they have their own High Level category now
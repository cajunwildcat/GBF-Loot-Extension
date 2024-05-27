# GBF Loot Tracker

A chrome extension that automatically records the loot you get from raids and quests in Granblue Fantasy.

## Eample Loot

The data in `exampleData.json` is taken from M3 Colossus. To import this data into your own storage to be able to see the data in the popup use the following steps:
1. Open the extension popup by clicking the icon
2. Right click anywhere in the popup window and click inspect
3. In the developer console type `chrome.storage.local.set({"M3 Colossus": <data>});` and replace `<data>` with the JSON object in `exampleData.json`

## Raw Data
The data for each fight collected so far can be seen by opening the developer console of the extension popup and typing `chrome.storage.local.get(null).then(r=>console.log(r));`. Data for a specific fight only can be seen by replace `null` with a string of the fight's name as it appears in the extension popup navbar.
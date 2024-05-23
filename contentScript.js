const m3Loot = {
    "type": "m3",
    "kills": 0,
    "goldChests": [],
    "redChests": [],
    "blueChests": [],
    "greenChests": []
};
const standardLoot = {
    "type": "revan",
    "kills": 0,
    "goldChests": [],
    "redChests": [],
    "blueChests": []
}
const soloLoot = {
    "type": "solo",
    "kill": "0",
    "woodChests": [],
    "silverChests": [],
    "goldChests": []
}

// contentScript.js
window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    
    if (event.data.command) {
        switch (event.data.command) {
            case "MESSAGE":
                console.log(event.data.message);
            break;
            case "UPDATE_STORAGE":
                console.log(event.data);
                let defaultValue;
                switch (event.data.type) {
                    case "M3": defaultValue = m3Loot; break;
                    case "SOLO": defaultValue = soloLoot; break;
                    case "DRAGON":
                    case "REVAN": defaultValue = standardLoot; break;
                    case "UNKNOWN": console.log("Unknown raid data received."); return;
                }
                chrome.storage.local.get({ [event.data.raid]: defaultValue }, (result) => {
                    result = result[event.data.raid];
                    //3 - wood chests (solo quests only)
                    //3 - silver chests (solo quests only)
                    //3 - gold chests
                    //4 - mvp/host chests
                    //11 - blue chest
                    //16 - green chest (M3 only)
                    result.kills++;
                    if (event.data.loot[1].length === undefined) result.goldChests.push(Object.values(event.data.loot[1]));
                    if (event.data.loot[2].length === undefined) result.goldChests.push(Object.values(event.data.loot[2]));
                    if (event.data.loot[3].length === undefined) result.goldChests.push(Object.values(event.data.loot[3]));
                    if (event.data.loot[4].length === undefined) result.redChests.push(Object.values(event.data.loot[4]));
                    if (event.data.loot[11].length === undefined) result.blueChests.push(Object.values(event.data.loot[11]));
                    if (event.data.loot[16].length === undefined) result.greenChests.push(Object.values(event.data.loot[16]));
        
                    chrome.storage.local.set({[event.data.raid]: result});
                    //console.log(result);
                });
            break;
        }
    }
});
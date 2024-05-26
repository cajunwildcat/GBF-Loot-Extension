const itemMap = item => {
    return {
        count: item.count,
        id: item.id,
        name: item.name,
        type: item.type
    };
};
const defaultLoot = {
    "type": data.type,
    "kills": 0,
    "woodChests": [],
    "silverChests": [],
    "goldChests": [],
    "redChests": [],
    "blueChests": [],
    "purpleChests": [],
    "greenChests": []
};

// contentScript.js
window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    const data = event.data;
    
    
    if (data.command) {
        switch (data.command) {
            case "MESSAGE":
                console.log(data.message);
            break;
            case "UPDATE_STORAGE":
                console.log(data);
                chrome.storage.local.get({ [data.type === "SOLO"? "SOLO" : data.raid]: defaultLoot }, (result) => {
                    if (data.type === "SOLO") {
                        result = result["SOLO"];
                        if (result[data.raid]) result = result[data.raid];
                        else result = defaultLoot;
                    }
                    else result = result[data.raid];

                    //1 - wood chests (solo quests only)
                    //2 - silver chests (solo quests only)
                    //3 - gold chests
                    //4 - mvp/host chests
                    //11 - blue chest
                    //13 - purple chest
                    //16 - green chest (M3 only)
                    const addLoot = (chestIndex) => {
                        let chest;
                        switch (chestIndex) {
                            case 1: chest = result.woodChests; break;
                            case 2: chest = result.silverChests; break;
                            case 3: chest = result.goldChests; break;
                            case 4: chest = result.redChests; break;
                            case 11: chest = result.blueChests; break;
                            case 13: chest = result.purpleCChests; break;
                            case 16: chest = result.greenChests; break;
                        }
                        if (data.loot[chestIndex].length === undefined) chest.push(Object.values(data.loot[chestIndex]).map(itemMap));
                    }
                    
                    result.kills++;
                    [1,2,3,4,11,13,16].forEach(i=>addLoot(i));
        
                    if (data.type == "SOLO") {
                        chrome.storage.local.get({"SOLO": {}}).then(r=>{
                            r = r["SOLO"];
                            r[data.raid] = result;
                            chrome.storage.local.set({"SOLO": r});
                        })
                    }
                    else chrome.storage.local.set({[data.raid]: result});
                    //console.log(result);
                });
            break;
        }
    }
});
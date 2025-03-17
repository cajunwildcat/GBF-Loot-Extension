const itemMap = item => {
    return {
        count: item.count,
        id: item.id,
        name: item.name,
        type: item.type
    };
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
            case "ADD_PENDING":
                chrome.storage.session.set({ [data.raid_id]: data.quest_id });
                break;
            case "RESOLVE_PENDING":
                console.log(data);
                chrome.storage.session.get(data.raid_id).then(r => {
                    console.log(r);
                    if (Object.keys(r).length === 0) {
                        console.log("Raid ID could not be found! Either it was already processed or the results page URL format changed.")
                        return;
                    }
                    r = r[data.raid_id];
                    chrome.storage.session.remove(data.raid_id);
                    chrome.storage.local.get({ [r]: {} }).then(t => {
                        t = t[r];
                        const loot = {};
                        for (key in data.loot) {
                            if (Object.keys(data.loot[key]).length > 0) {
                                loot[key] = Object.values(data.loot[key]).map(itemMap);
                            }
                        }
                        data.artifacts.forEach((a, i) => {
                            if (!loot[90]) loot[90] = [];
                            loot[90].push({
                                name: a.name,
                                details: a.artifact_param
                            });
                        });
                        t[data.raid_id] = loot;
                        chrome.storage.local.set({ [r]: t });
                    });
                });
                break;
            case "UPDATE_ICON":
                (async () => {
                    chrome.runtime.sendMessage(data)
                })()
                break;
        }
    }
});
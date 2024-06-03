const blueChestIcon = "https://gbf.wiki/images/thumb/b/b1/Icon_Blue_Chest.png/25px-Icon_Blue_Chest.png";
const redChestIcon = "https://gbf.wiki/images/thumb/f/f0/Icon_Red_Chest.png/25px-Icon_Red_Chest.png";
const goldChestIcon = "https://gbf.wiki/images/thumb/3/32/Icon_Gold_Chest.png/25px-Icon_Gold_Chest.png";
const greenChestIcon = "https://gbf.wiki/images/thumb/4/4c/Icon_Green_Chest.png/25px-Icon_Green_Chest.png";
const swordIcon = "https://gbf.wiki/images/thumb/9/93/Item_kind_icon_001.png/25px-Item_kind_icon_001.png";

const gbfItem = (type, id) => `https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img_mid/sp/assets/${type}/s/${id}.jpg`;

const raidIDs = {
    //BARS
    "PBHL": 301061,
    "GOHL": 305161,
    "Akasha": 303251,
    "The World": 305571,
    //REVANS
    "Mugen": 305381,
    "Diaspora": 305391,
    "Siegfried": 305401,
    "Seofon": 305411,
    "Cosmos": 305421,
    "Agastia": 305431,
    //OMEGA III
    "Tiamat Aura": 305601,
    "Colossus Ira": 305611,
    "Yggdrasil Arbos": 305641,
    "Leviathan Mare": 305631,
    "Luminiera Credo": 305591,
    "Celeste Ater": 305621,
    //6-DRAGONS
    "Wilnas": 305191,
    "Wamdus": 305201,
    "Galleon": 305211,
    "Ewiyar": 305221,
    "Lu Woh": 305231,
    "Fediel": 305241,
    //ENEADS
    "Atum": 305321,
    "Tefnut": 305331,
    "Bennu": 305341,
    "Ra": 305351,
    "Horus": 305361,
    "Osiris": 305371
};
const knownIDs = Object.values(raidIDs);

let currentRaid = {};
const getCurrentRaid = () => currentRaid;
window.onload = async (e) => {
    const raidTitle = document.querySelector("#raid-title");
    const raidInfo = document.querySelector("#raid-info");
    const topSpan1 = document.querySelector("#top-span1");
    const topSpan2 = document.querySelector("#top-span2");
    chrome.storage.local.get(null, r=>console.log("local:", r));
    chrome.storage.session.get(null, r=>console.log("session:", r));

    //category drop down onclick
    document.querySelectorAll(".raid-category-button").forEach(i => {
        i.onclick = (e) => {
            const div = e.target.parentNode.nextElementSibling;
            if (div.className.indexOf("w3-show") == -1) {
                div.className += " w3-show";
                e.target.className = e.target.className.replace("caret-right", "caret-down");
            }
            else {
                div.className = div.className.replace(" w3-show", "");
                e.target.className = e.target.className.replace("caret-down", "caret-right");
            }
        }
    });

    let lastRaid = raidIDs["PBHL"];
    await chrome.storage.sync.get("lastTab").then(r=>lastRaid=r.lastTab);
    document.querySelectorAll(".raid-button").forEach((i) => {
        const raidID = raidIDs[i.innerHTML];
        i.onclick = (e) => {
            chrome.storage.sync.set({"lastTab": raidID});
            raidTitle.innerHTML = i.innerHTML;
            const raidData = {[raidID] : {}};
            if (e.target.className.includes("solo-quest")) {
                raidTitle.innerHTML += `<button id="rename-button" class="w3-button fa fa-pencil-square-o fa-5" aria-hidden="true" style="float:right;padding:10px;" title="rename fight"></button>`;
                document.querySelector("#rename-button").onclick = () => {
                    const name = prompt("Enter a new name for this fight", i.innerHTML);
                    raidTitle.innerHTML = raidTitle.innerHTML.replace(i.innerHTML, name);
                    i.innerHTML = name;
                    chrome.storage.local.get("SOLO", (result) => {
                        result["SOLO"][raidID].name = name;
                        chrome.storage.local.set(result);
                    });
                };
                chrome.storage.local.get("SOLO", (result) => buildRaidInfo(result["SOLO"][raidID]));
            }
            else chrome.storage.local.get(raidData, (result) => buildRaidInfo(result[raidID]));
        };
        if (raidID === lastRaid) lastRaid = i;
    });
    lastRaid.dispatchEvent(new Event("click"));

    const download = (e) => {
        const raid = getCurrentRaid();
        let csv = "data:text/csv;charset=utf-8,";
        if (raid.woodChests && raid.woodChests.length > 0) {csv += "Wood Chests\n"; raid.woodChests.forEach(i => csv += i.map(c=>`${c.name} x${c.count}`).join(',') + "\n"); csv += "\n";}
        if (raid.silverChests && raid.silverChests.length > 0) {csv += "Silver Chests\n"; raid.silverChests.forEach(i => csv += i.map(c=>`${c.name} x${c.count}`).join(',') + "\n"); csv += "\n";}
        if (raid.goldChests && raid.goldChests.length > 0) {csv += "Gold Chests\n"; raid.goldChests.forEach(i => csv += i.map(c=>`${c.name} x${c.count}`).join(',') + "\n"); csv += "\n";}
        if (raid.redChests && raid.redChests.length > 0) {csv += "Red Chests\n"; raid.redChests.forEach(i => csv += i.map(c=>`${c.name} x${c.count}`).join(',') + "\n"); csv += "\n";}
        if (raid.blueChests && raid.blueChests.length > 0) {csv += "Blue Chests\n"; raid.blueChests.forEach(i => csv += i.map(c=>`${c.name} x${c.count}`).join(',') + "\n"); csv += "\n";}
        if (raid.purpleChests && raid.purpleChests.length > 0) {csv += "Purple Chests\n"; raid.purpleChests.forEach(i => csv += i.map(c=>`${c.name} x${c.count}`).join(',') + "\n"); csv += "\n";}
        if (raid.greenChests && raid.greenChests.length > 0) {csv += "Green Chests\n"; raid.greenChests.forEach(i => csv += i.map(c=>`${c.name} x${c.count}`).join(',') + "\n"); csv += "\n";}

        var encodedUri = encodeURI(csv);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link);
        link.click();
    }


    const buildRaidInfo = (result) => {
        raidInfo.querySelector("#no-loot-warning")?.remove();
        raidInfo.querySelector("#button-span")?.remove();
        raidInfo.querySelector("#top-span1").innerHTML = "";
        raidInfo.querySelector("#top-span2").innerHTML = "";
        document.querySelectorAll(".loot-column").forEach(i=>i.remove());

        console.log(result);
        if (Object.keys(result).length === 0) {
            document.querySelectorAll(".loot-column").forEach(c=>c.style.display = "none");
            const noLootWarning = document.createElement("h3");
            noLootWarning.id = "no-loot-warning";
            noLootWarning.innerHTML = "There is not recorded data for this raid";
            raidInfo.appendChild(noLootWarning);
        }
        else {
            currentRaid = result;
            const chestData = {
                woodChests: [],
                silverChests: [],
                goldChests: [],
                redChests: [],
                blueChests: [],
                purpleChests: [],
                greenChests: []
            };
            Object.values(result).forEach(session => {
                if (session[1]) chestData.woodChests.push(session[1]);
                if (session[2]) chestData.silverChests.push(session[2]);
                if (session[3]) chestData.goldChests.push(session[3]);
                if (session[4]) chestData.redChests.push(session[4]);
                if (session[11]) chestData.blueChests.push(session[11]);
                if (session[13]) chestData.purpleChests.push(session[13]);
                if (session[16]) chestData.greenChests.push(session[16]);
            });
            console.log(chestData);
            displayLoot(chestData);

            const buttonSpan = document.createElement("span");
            buttonSpan.id = "button-span";
            buttonSpan.innerHTML = `
            <button id="download-button" class="w3-button w3-center">Download</button>
            <button id="clear-button" class="w3-button w3-center">Clear Data</button>
            `;
            raidInfo.appendChild(buttonSpan);
            document.querySelector("#download-button").onclick = download;
            document.querySelector("#clear-button").onclick = () => {
                const raid = getCurrentRaid();
                if (raid.type !== "SOLO") {
                    chrome.storage.local.remove(raidTitle.innerHTML);
                    buildRaidInfo({kills: 0});
                }
                else {
                    chrome.storage.local.get("SOLO").then(async r => {
                        r = r["SOLO"];
                        delete r[raid.id];
                        chrome.storage.local.set({"SOLO": r});
                        await chrome.storage.sync.set({"lastTab": "PBHL"});
                        window.location.reload();
                    });
                }
            };
        }
    }

    function displayLoot(data) {
        if (data.blueChests && data.blueChests.length > 0) {
            populateChests("Blue Chests", processLoot(data.blueChests), data.blueChests.length);
        }
        if (data.greenChests && data.greenChests.length > 0) {
            populateChests("Green Chests", processLoot(data.greenChests), data.greenChests.length);
        }
        if (data.purpleChests && data.purpleChests.length > 0) {
            populateChests("Purple Chests", processLoot(data.purpleChests), data.purpleChests.length);
        }
        if (data.redChests && data.redChests.length > 0) {
            populateChests("Red Chests", processLoot(data.redChests), data.redChests.length);
        }
        if (data.goldChests && data.goldChests.length > 0) {
            populateChests("Gold Chests", processLoot(data.goldChests), data.goldChests.length);
        }
        if (data.silverChests && data.silverChests.length > 0) {
            populateChests("Silver Chests", processLoot(data.silverChests), data.silverChests.length);
        }
        if (data.woodChests && data.woodChests.length > 0) {
            populateChests("Wood Chests", processLoot(data.woodChests), data.woodChests.length);
        }
    }

    function processLoot(chests) {
        const lootMap = new Map();
        chests.forEach(chest => {
            chest.forEach(item => {
                if (!lootMap.has(item.id)) {
                    lootMap.set(item.id, { ...item, count: 0, drops: {} });
                }
                lootMap.get(item.id).count++;
                if (!lootMap.get(item.id).drops[item.count]) lootMap.get(item.id).drops[item.count] = 0;
                lootMap.get(item.id).drops[item.count]++;
                if (getCurrentRaid().type = "m3") {
                    if (item.type == "weapon") {
                        let weapon = topSpan1.querySelector(`#i-${item.id}`);
                        if (!weapon) {
                            weapon = document.createElement("span");
                            weapon.id = `i-${item.id}`;
                            weapon.innerHTML = `<img class="item-image" src=${gbfItem(item.type, item.id)}>:0`;
                            topSpan1.appendChild(weapon);
                        }
                        let count = parseInt(weapon.innerHTML.substring(weapon.innerHTML.lastIndexOf(":")+1));
                        weapon.innerHTML = weapon.innerHTML.replace(`:${count}`, `:${count+1}`);
                    }
                    else if (item.id >= 600 && item.id <= 611) {
                        let anima = topSpan2.querySelector(`#i-${item.id}`);
                        if (!anima) {
                            anima = document.createElement("span");
                            anima.id = `i-${item.id}`;
                            anima.innerHTML = `<img class="item-image" src=${gbfItem(item.type, item.id)}>:0`;
                            topSpan2.appendChild(anima);
                        }
                        let count = parseInt(anima.innerHTML.substring(anima.innerHTML.lastIndexOf(":")+1));
                        anima.innerHTML = anima.innerHTML.replace(`:${count}`, `:${count+1}`);
                    }
                }
            });
        });
        return Array.from(lootMap.values());
    }

    function populateChests(title, loot, drops) {
        const lootColumn = document.createElement("div");
        lootColumn.className = "loot-column";
        lootColumn.innerHTML = `<h3 title="${(drops / getCurrentRaid().kills * 100).toFixed(2)}%">${title}: ${drops}</h3><div class="scrollable"></div>`;
        const container = lootColumn.querySelector(".scrollable");

        loot.forEach(item => item.percentage = ((item.count / drops) * 100).toFixed(2));
        loot.sort((a,b)=>b.percentage-a.percentage).forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');

            itemDiv.innerHTML = `
                <div class="item-name" title=${item.count}><img class="item-image" src=${gbfItem(item.type, item.id)}>${Object.keys(item.drops).length > 1? "" : "x"+Object.keys(item.drops)[0]} ${item.percentage}%</div>
            `;
            if (Object.keys(item.drops).length > 1) {
                itemDiv.innerHTML = itemDiv.innerHTML.replace("</div>", ` <i class="fa fa-caret-left" aria-hidden="true"></i></div>`)
                itemDiv.innerHTML += `<div class="item-details w3-hide">
                    ${Object.keys(item.drops).map(drop => `<div>x${drop} ${(item.drops[drop] / drops * 100).toFixed(2)}%</div>`).join('')}
                    </div>`
                itemDiv.onclick = (e) => {
                    const div = e.target.className.includes("caret")? e.target.parentNode.nextElementSibling : e.target.nextElementSibling;
                    if (div.className.indexOf("w3-show") == -1) {
                        div.className += " w3-show";
                        div.previousElementSibling.lastElementChild.className = div.previousElementSibling.lastElementChild.className.replace("caret-left", "caret-down");
                    }
                    else {
                        div.className = div.className.replace(" w3-show", "");
                        div.previousElementSibling.lastElementChild.className = div.previousElementSibling.lastElementChild.className.replace("caret-down", "caret-left");
                    }
                }
            }
            container.appendChild(itemDiv);
        });
        raidInfo.appendChild(lootColumn);
    }
}
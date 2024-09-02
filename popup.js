const blueChestIcon = "https://gbf.wiki/images/thumb/b/b1/Icon_Blue_Chest.png/25px-Icon_Blue_Chest.png";
const redChestIcon = "https://gbf.wiki/images/thumb/f/f0/Icon_Red_Chest.png/25px-Icon_Red_Chest.png";
const goldChestIcon = "https://gbf.wiki/images/thumb/3/32/Icon_Gold_Chest.png/25px-Icon_Gold_Chest.png";
const greenChestIcon = "https://gbf.wiki/images/thumb/4/4c/Icon_Green_Chest.png/25px-Icon_Green_Chest.png";
const swordIcon = "https://gbf.wiki/images/thumb/9/93/Item_kind_icon_001.png/25px-Item_kind_icon_001.png";

const gbfItem = (type, id) => `https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img_mid/sp/assets/${type}/s/${id}.jpg`;

const raidIDs = {
    //HL
    "SUBHL": 305311,
    "Hexa": 305491,
    "Faa Zero": 305581,
    //BARS
    "PBHL": 301061,
    "Akasha": 303251,
    "GOHL": 305161,
    "UBAHL": 303141,
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
    "Leviathan Mare": 305631,
    "Yggdrasil Arbos": 305641,
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
    "Osiris": 305371,
    //Other Impossibles
    "Tia Impossible": 300441,
    "Colo Impossible": 300491,
    "Levi Impossible": 300511,
    "Yggy Impossible": 300531,
    "Lumi Impossible": 300561,
    "Celeste Impossible": 300581,

    "Shiva": 303151,
    "Europa": 303161,
    "Alexiel": 303171,
    "Grimnir": 303181,
    "Metatron": 303191,
    "Avatar": 303221,
    "Rose Queen": 300471,

    "Tia Malice": 303241,
    "Levi Malice": 305151,
    "Phronesis": 305251,
    "Lumi Malice": 305271,
    "Anima-Animus": 305291,
    "Legion Void": 305481,

    "HLQL": 303231,
    "Faa": 303271,
    "Four Primarchs": 303291,
    "Lindwurm": 305171,

    "FaaHL": 303281,
    "Belial": 305281,
    "Bubz": 305181,

    "Tia": 300041,
    "Colo": 300091,
    "Levi": 300151,
    "Yggy": 300191,
    "Adversa": 300221,
    "Celeste": 300251,

    "Tia Ω": 300051,
    "Colo Ω": 300101,
    "Levi Ω": 300161,
    "Yggy Ω": 300261,
    "Lumi Ω": 300271,
    "Celeste Ω": 300281,

    "Athena": 301071,
    "Grani": 300481,
    "Baal": 301371,
    "Garuda": 301381,
    "Odin": 300461,
    "Lich": 300551,

    "Grand Order": 301051,
    "Proto Baha": 300291,
    "Huanglong": 301671,
    "Qilin": 301681,

    "Michael": 303101,
    "Gabriel": 303091,
    "Uriel": 303111,
    "Raphael": 303081,
    "UBAHA": 303131
};
const knownRaidIDs = Object.values(raidIDs);
const knownRaidNames = Object.keys(raidIDs);
const topPins = {
    //m3
    305601: [215,600,601],
    305611: [215,602,603],
    305631: [215,604,605],
    305641: [215,606,607],
    305591: [215,608,609],
    305621: [215,610,611],
    //bars
    301061: [20004],
    303251: [20004],
    305161: [20004],
    303141: [20004],
    305571: [215],
    //revan
    305381: [215,586],
    305391: [215,585],
    305401: [215,587],
    305411: [215,589],
    305421: [215,590],
    305431: [215,589]
};
const bottomPins = {
    //m3
    305601: [1040516800,1040119200,1040713400],
    305611: [1040423100,1040317400,1040026100],
    305631: [1040119700,1040318100,1040916500],
    305641: [1040026300,1040619000,1040816500],
    305591: [1040516900,1040219100,1040916200],
    305621: [1040618800,1040916300,1040119500],
    //bars
    301061: [59,79],
    303251: [],
    305161: [],
    303141: [],
    305571: [],
    //revan
    305381: [],
    305391: [],
    305401: [],
    305411: [],
    305421: [],
    305431: []
};

let currentRaid = {};
const getCurrentRaid = () => currentRaid;
window.onload = async (e) => {
    const raidTitle = document.querySelector("#raid-title");
    const raidInfo = document.querySelector("#raid-info");
    const topSpan1 = document.querySelector("#top-span1");
    const topSpan2 = document.querySelector("#top-span2");

    let raidData;
    await chrome.storage.local.get(null).then(r => raidData = r);
    console.log("raids", raidData)
    let pendingRaids;
    await chrome.storage.session.get(null).then(r => pendingRaids = r);
    console.log("pending", pendingRaids);

    //build Solo Fight category
    const soloFights = Object.keys(raidData).map(i => parseInt(i)).filter(raid => !knownRaidIDs.includes(raid));
    if (soloFights.length > 0) {
        const sidebar = document.querySelector(".sidebar");
        sidebar.innerHTML += `<h5><button class="w3-bar-item w3-button w3-block w3-left-align raid-category-button fa fa-caret-right"> Solo Fights</button></h5>`;
        const soloFightsDiv = document.createElement("div");
        soloFightsDiv.className = "w3-hide w3-card";
        soloFights.forEach(fight => {
            const navButton = document.createElement("button");
            navButton.className = "w3-bar-item w3-button raid-button solo-quest";
            const name = raidData[fight].name? raidData[fight].name : fight;
            knownRaidIDs.push(fight);
            knownRaidNames.push(name);
            raidIDs[name] = fight;
            navButton.innerHTML = name;

            soloFightsDiv.appendChild(navButton);
        });
        sidebar.appendChild(soloFightsDiv);
    }

    //category drop down onclick
    document.querySelectorAll(".raid-category-button").forEach(i => {
        i.onclick = (e) => {
            const div = e.target.parentNode.nextElementSibling;
            if (div.className.includes("w3-show")) {
                div.className = div.className.replace(" w3-show", "");
                e.target.className = e.target.className.replace("caret-down", "caret-right");
            }
            else {
                div.className += " w3-show";
                e.target.className = e.target.className.replace("caret-right", "caret-down");
            }
        }
    });

    let lastRaid;
    await chrome.storage.sync.get("lastTab").then(r=>lastRaid=r.lastTab);
    if (!knownRaidIDs.includes(lastRaid)) lastRaid = raidIDs["PBHL"];
    document.querySelectorAll(".raid-button").forEach((i) => {
        const raidID = raidIDs[i.innerHTML];
        i.onclick = (e) => {
            chrome.storage.sync.set({"lastTab": raidID});
            currentRaid = raidID;
            raidTitle.innerHTML = i.innerHTML;
            if (!raidData[raidID]) {
                raidTitle.title = 0;
                buildRaidInfo({});
            }
            raidTitle.title = Object.keys(raidData[raidID]).length;
            if (e.target.className.includes("solo-quest")) {
                raidTitle.innerHTML += `<button id="rename-button" class="w3-button fa fa-pencil-square-o fa-5" aria-hidden="true" style="float:right;padding:10px;" title="rename fight"></button>`;
                document.querySelector("#rename-button").onclick = () => {
                    const name = prompt("Enter a new name for this fight", i.innerHTML);
                    if (name == null || name == "" || name == " ") return;
                    raidTitle.innerHTML = raidTitle.innerHTML.replace(i.innerHTML, name);
                    i.innerHTML = name;
                    raidData[raidID].name = name;
                    chrome.storage.local.set({[raidID]: raidData[raidID]});
                };
            }
            buildRaidInfo({...raidData[raidID],name});
        };
        if (raidID == lastRaid) lastRaid = i;
    });
    lastRaid.dispatchEvent(new Event("click"));

    function download(e) {
        console.log("raid", getCurrentRaid())
        console.log("raidData", raidData);
        let json = "data:text/json;charset=utf-8," + encodeURI(JSON.stringify(raidData[getCurrentRaid()]));

        var link = document.createElement("a");
        link.setAttribute("href", json);
        link.setAttribute("download", "my_data.json");
        document.body.appendChild(link);
        link.click();
    }

    function buildRaidInfo (result) {
        raidInfo.querySelector("#no-loot-warning")?.remove();
        raidInfo.querySelector("#button-span")?.remove();
        raidInfo.querySelector("#top-span1").innerHTML = "";
        raidInfo.querySelector("#top-span2").innerHTML = "";
        document.querySelectorAll(".loot-column").forEach(i=>i.remove());

        if (Object.keys(result).length <= 1) {
            document.querySelectorAll(".loot-column").forEach(c=>c.style.display = "none");
            const noLootWarning = document.createElement("h3");
            noLootWarning.id = "no-loot-warning";
            noLootWarning.innerHTML = "There is not recorded data for this raid";
            raidInfo.appendChild(noLootWarning);
        }
        else {
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
                console.log(getCurrentRaid());
                chrome.storage.local.remove(`${getCurrentRaid()}`).then(_ => {
                    window.location.reload();
                });
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

                if (topPins[getCurrentRaid()] && topPins[getCurrentRaid()].includes(parseInt(item.id))) {
                    let trackedItem = topSpan1.querySelector(`#i-${item.id}`);
                    if (!trackedItem) {
                        trackedItem = document.createElement("span");
                        trackedItem.id = `i-${item.id}`;
                        trackedItem.innerHTML = `<img class="item-image" src=${gbfItem(item.type, item.id)}>:0`;
                        topSpan1.appendChild(trackedItem);
                    }
                    let count = parseInt(trackedItem.innerHTML.substring(trackedItem.innerHTML.lastIndexOf(":")+1));
                    trackedItem.innerHTML = trackedItem.innerHTML.replace(`:${count}`, `:${count+Number(item.count)}`);
                }
                if (bottomPins[getCurrentRaid()] && bottomPins[getCurrentRaid()].includes(parseInt(item.id))) {
                    let trackedItem = topSpan2.querySelector(`#i-${item.id}`);
                    if (!trackedItem) {
                        trackedItem = document.createElement("span");
                        trackedItem.id = `i-${item.id}`;
                        trackedItem.innerHTML = `<img class="item-image" src=${gbfItem(item.type, item.id)}>:0`;
                        topSpan2.appendChild(trackedItem);
                    }
                    let count = parseInt(trackedItem.innerHTML.substring(trackedItem.innerHTML.lastIndexOf(":")+1));
                    trackedItem.innerHTML = trackedItem.innerHTML.replace(`:${count}`, `:${count+Number(item.count)}`);
                }
                
            });
        });
        return Array.from(lootMap.values());
    }

    function populateChests(title, loot, drops) {
        const lootColumn = document.createElement("div");
        lootColumn.className = "loot-column";
        lootColumn.innerHTML = `<h3 title="${(drops / (Object.keys(raidData[getCurrentRaid()]).length - (raidData[getCurrentRaid()].name? 1 : 0)) * 100).toFixed(2)}%">${title}: ${drops}</h3><div class="scrollable"></div>`;
        const container = lootColumn.querySelector(".scrollable");

        loot.forEach(item => item.percentage = ((item.count / drops) * 100).toFixed(2));
        loot.sort((a,b)=>b.percentage-a.percentage).forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            const img = item.name == "Badge" && `${item.id}`.slice(-2,-1) == "1"? "https://gbf.wiki/images/3/33/Silver_Badge_square.jpg" :
                        item.name == "Badge" && `${item.id}`.slice(-2,-1) == "0"? "https://gbf.wiki/images/b/b7/Gold_Badge_square.jpg" :
                        gbfItem(item.type, item.id);

            itemDiv.innerHTML = `
                <div class="item-name"><img class="item-image" src=${img}> x${Object.values(item.drops).reduce((sum,d,i)=>sum+d*Object.keys(item.drops)[i])} - ${item.percentage}%</div>
            `;
            if (Object.keys(item.drops).length > 1) {
                itemDiv.innerHTML = itemDiv.innerHTML.replace("</div>", ` <i class="fa fa-caret-left" aria-hidden="true"></i></div>`)
                itemDiv.innerHTML += `<div class="item-details w3-hide">
                    ${Object.keys(item.drops).map(drop => `<div style="white-space-collapse:preserve;">x${drop}   ${item.drops[drop]} @ ${(item.drops[drop] / drops * 100).toFixed(2)}%</div>`).join('')}
                    </div>`
                itemDiv.onclick = (e) => {
                    const div = e.target.className.includes("caret") || e.target.className.includes("item-image")? e.target.parentNode.nextElementSibling : e.target.nextElementSibling;
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
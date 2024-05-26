const blueChestIcon = "https://gbf.wiki/images/thumb/b/b1/Icon_Blue_Chest.png/25px-Icon_Blue_Chest.png";
const redChestIcon = "https://gbf.wiki/images/thumb/f/f0/Icon_Red_Chest.png/25px-Icon_Red_Chest.png";
const goldChestIcon = "https://gbf.wiki/images/thumb/3/32/Icon_Gold_Chest.png/25px-Icon_Gold_Chest.png";
const greenChestIcon = "https://gbf.wiki/images/thumb/4/4c/Icon_Green_Chest.png/25px-Icon_Green_Chest.png";
const swordIcon = "https://gbf.wiki/images/thumb/9/93/Item_kind_icon_001.png/25px-Item_kind_icon_001.png";

const gbfItem = (type, id) => `https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img_mid/sp/assets/${type}/s/${id}.jpg`;

let currentRaid = {};
const getCurrentRaid = () => currentRaid;
window.onload = async (e) => {
    const raidTitle = document.querySelector("#raid-title");
    const headerTable = document.querySelector("#header-table")
    const raidInfo = document.querySelector("#raid-info");

    await chrome.storage.local.get("SOLO").then(r => {
        r = r["SOLO"];
        if (r === undefined) return;
        const sidebar = document.querySelector(".sidebar");
        sidebar.innerHTML += `<h5><button class="w3-bar-item w3-button w3-block w3-left-align raid-category-button fa fa-caret-right"> Solo Fights</button></h5>`
        const soloFights = document.createElement("div");
        soloFights.className = "w3-hide w3-card";
        Object.keys(r).forEach(fight => {
            const navButton = document.createElement("button");
            navButton.className = "w3-bar-item w3-button raid-button solo-quest";
            navButton.innerHTML = r[fight].name? r[fight].name : fight;
            navButton.id = fight;
            soloFights.appendChild(navButton);
        });
        sidebar.appendChild(soloFights);
    })

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
    })

    let lastRaid = "PBHL";
    await chrome.storage.sync.get("lastTab").then(r=>lastRaid=r.lastTab);
    document.querySelectorAll(".raid-button").forEach((i) => {
        if (!i.className.includes("solo-quest")) i.id = i.innerHTML;
        const raid = i.id;
        i.onclick = (e) => {
            raidInfo.querySelector("#no-loot-warning")?.remove();
            document.querySelectorAll(".loot-column").forEach(i=>i.remove());

            chrome.storage.sync.set({"lastTab": raid});
            raidTitle.innerHTML = i.innerHTML;
            const raidData = {};
            raidData[raid] = { kills: 0};   
            if (e.target.className.includes("solo-quest")) {
                raidTitle.innerHTML += `<button id="rename-button" class="w3-button fa fa-pencil-square-o fa-5" aria-hidden="true" style="float:right;padding:10px;" title="rename fight"></button>`;
                document.querySelector("#rename-button").onclick = () => {
                    const name = prompt("Enter a new name for this fight", i.innerHTML);
                    raidTitle.innerHTML = raidTitle.innerHTML.replace(i.innerHTML, name);
                    i.innerHTML = name;
                    chrome.storage.local.get("SOLO", (result) => {
                        result["SOLO"][raid].name = name;
                        chrome.storage.local.set(result);
                    });
                }
                chrome.storage.local.get("SOLO", (result) => buildRaidInfo(result["SOLO"][raid]));
            }
            else chrome.storage.local.get(raidData, (result) => buildRaidInfo(result[raid]));
        };
        if (raid === lastRaid) lastRaid = i;
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
        if (result.kills == 0) {
            document.querySelectorAll(".loot-column").forEach(c=>c.style.display = "none");
            const noLootWarning = document.createElement("h3");
            noLootWarning.id = "no-loot-warning";
            noLootWarning.innerHTML = "There is not recorded data for this raid";
            raidInfo.appendChild(noLootWarning);
        }
        else {
            currentRaid = result;
            displayLoot(result);

            const buttonSpan = document.createElement("span");
            buttonSpan.innerHTML = `
            <button id="download-button" class="w3-button w3-center">Download</button>
            <button id="clear-button" class="w3-button w3-center">Clear Data</button>
            `;
            raidInfo.appendChild(buttonSpan);
            document.querySelector("#download-button").onclick = download;
        }
    }    

    const createCell = (img, value, hover) => {
        const newCell = document.createElement("th");
        newCell.innerHTML = `<img src="${img}"> ${value}`;
        newCell.title = hover;
        return newCell;
    }
    
    const addTableRow = (cells) => {
        const newRow = document.createElement("tr");
        cells.forEach(c=>newRow.appendChild(c));
        headerTable.appendChild(newRow);
    }

    function displayLoot(data) {
        if (data.blueChests && data.blueChests.length > 0) {
            populateChests("Blue Chest", processLoot(data.blueChests), data.blueChests.length);
        }
        if (data.greenChests && data.greenChests.length > 0) {
            populateChests("Green Chest", processLoot(data.greenChests), data.greenChests.length);
        }
        if (data.redChests && data.redChests.length > 0) {
            populateChests("Red Chest", processLoot(data.redChests), data.redChests.length);
        }
        if (data.goldChests && data.goldChests.length > 0) {
            populateChests("Gold Chest", processLoot(data.goldChests), data.goldChests.length);
        }
        if (data.silverChests && data.silverChests.length > 0) {
            populateChests("Silver Chest", processLoot(data.silverChests), data.silverChests.length);
        }
        if (data.woodChests && data.woodChests.length > 0) {
            populateChests("Wood Chest", processLoot(data.woodChests), data.woodChests.length);
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
            });
        });
        return Array.from(lootMap.values());
    }

    function populateChests(title, loot, drops) {
        const lootColumn = document.createElement("div");
        lootColumn.className = "loot-column";
        lootColumn.innerHTML = `<h3>${title}: ${drops}</h3><div class="scrollable"></div>`;
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
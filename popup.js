const blueChest = "https://gbf.wiki/images/thumb/b/b1/Icon_Blue_Chest.png/25px-Icon_Blue_Chest.png";
const redChest = "https://gbf.wiki/images/thumb/f/f0/Icon_Red_Chest.png/25px-Icon_Red_Chest.png";
const goldChest = "https://gbf.wiki/images/thumb/3/32/Icon_Gold_Chest.png/25px-Icon_Gold_Chest.png";
const greenChest = "https://gbf.wiki/images/thumb/4/4c/Icon_Green_Chest.png/25px-Icon_Green_Chest.png";
const sword = "https://gbf.wiki/images/thumb/9/93/Item_kind_icon_001.png/25px-Item_kind_icon_001.png";

const gbfItem = (type, id) => `https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img_mid/sp/assets/${type}/s/${id}.jpg`;

window.onload = async (e) => {
    const raidTitle = document.querySelector("#raid-title");
    const headerTable = document.querySelector("#header-table")
    const raidInfo = document.querySelector("#raid-info");

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
        i.onclick = (e) => {
            raidInfo.querySelector("#no-loot-warning")?.remove();
            document.querySelectorAll(".loot-column").forEach(i=>i.remove());

            const raid = e.target.innerHTML;
            chrome.storage.sync.set({"lastTab": raid});
            raidTitle.innerHTML = raid;
            const raidData = {};
            raidData[raid] = { kills: 0};   
            chrome.storage.local.get(raidData, (result) => {
                result = result[raid];
                if (result.kills == 0) {
                    document.querySelectorAll(".loot-column").forEach(c=>c.style.display = "none");
                    const noLootWarning = document.createElement("h3");
                    noLootWarning.id = "no-loot-warning";
                    noLootWarning.innerHTML = "There is not recorded data for this raid";
                    raidInfo.appendChild(noLootWarning);
                }
                else {
                    displayLoot(result);
                }
            });
        };
        if (i.innerHTML === lastRaid) lastRaid = i;
    });
    lastRaid.dispatchEvent(new Event("click"));
    
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
        if (data.blueChests) {
            populateChests("Blue Chest", processLoot(data.blueChests), data.blueChests.length);
        }
        if (data.greenChests) {
            populateChests("Green Chest", processLoot(data.greenChests), data.greenChests.length);
        }
        if (data.redChests) {
            populateChests("Red Chest", processLoot(data.redChests), data.redChests.length);
        }
        if (data.goldChests) {
            populateChests("Gold Chest", processLoot(data.goldChests), data.goldChests.length);
        }
        if (data.silverChests) {
        }
        if (data.greenChests) {

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
                <div class="item-name"><img class="item-image" src=${gbfItem(item.type, item.id)}> ${item.percentage}%</div>
            `;
            if (Object.keys(item.drops).length > 1) {
                itemDiv.innerHTML = itemDiv.innerHTML.replace("</div>", ` <i class="fa fa-caret-left" aria-hidden="true"></i></div>`)
                itemDiv.innerHTML += `<div class="item-details w3-hide">
                    ${Object.keys(item.drops).map(drop => `<div>x${drop} ${(item.drops[drop] / item.count * 100).toFixed(2)}%</div>`).join('')}
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
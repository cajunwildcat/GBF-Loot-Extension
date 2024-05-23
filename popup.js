const blueChest = "https://gbf.wiki/images/thumb/b/b1/Icon_Blue_Chest.png/25px-Icon_Blue_Chest.png";
const redChest = "https://gbf.wiki/images/thumb/f/f0/Icon_Red_Chest.png/25px-Icon_Red_Chest.png";
const goldChest = "https://gbf.wiki/images/thumb/3/32/Icon_Gold_Chest.png/25px-Icon_Gold_Chest.png";
const greenChest = "https://gbf.wiki/images/thumb/4/4c/Icon_Green_Chest.png/25px-Icon_Green_Chest.png";
const sword = "https://gbf.wiki/images/thumb/9/93/Item_kind_icon_001.png/25px-Item_kind_icon_001.png";

const gbfItem = (id) => `https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img_mid/sp/assets/item/article/s/${id}.jpg`;

window.onload = async (e) => {
    const raidTitle = document.querySelector("#raid-title");
    const headerTable = document.querySelector("#header-table")
    const raidInfo = document.querySelector("#raid-info");

    document.querySelectorAll(".raid-category-button").forEach(i => {
        i.onclick = (e) => {
            const div = e.target.parentNode.nextElementSibling;
            if (div.className.indexOf("w3-show") == -1) {
                div.className += " w3-show";
            }
            else {
                div.className = div.className.replace(" w3-show", "");
            }
        }
    })

    let lastRaid = "PBHL";
    await chrome.storage.sync.get("lastTab").then(r=>lastRaid=r.lastTab);
    document.querySelectorAll(".raid-button").forEach((i) => {
        i.onclick = (e) => {
            raidInfo.querySelector("#no-loot-warning")?.remove();
            headerTable.innerHTML = "";

            const raid = e.target.innerHTML;
            chrome.storage.sync.set({"lastTab": raid});
            raidTitle.innerHTML = raid;
            const raidData = {};
            raidData[raid] = { kills: 0};   
            chrome.storage.local.get(raidData, (result) => {
                result = result[raid];
                if (result.kills == 0) {
                    const noLootWarning = document.createElement("h3");
                    noLootWarning.id = "no-loot-warning";
                    noLootWarning.innerHTML = "There is not recorded data for this raid";
                    raidInfo.appendChild(noLootWarning);
                }
                else {
                    switch (result.type) {
                        case "revan":
                            addTableRow([
                                createCell(sword, result.kills, "Kills"),
                                createCell(blueChest, result.blueChests.length, "Blue Chests")
                            ]);
                        break;
                        case "m3":
                            addTableRow([
                                createCell(sword, result.kills, "Kills"),
                                createCell(blueChest, result.blueChests.length, "Blue Chests"),
                                createCell(greenChest, result.greenChests.length, "Green Chests")
                            ]);                            
                        break;
                    }
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
}
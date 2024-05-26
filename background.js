// background.js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('/#result')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            world: 'MAIN',
            func: injectMainScript
        }).then(() => {
            //console.log('Script injected successfully.');
        }).catch((error) => {
            //console.error('Script injection failed:', error);
        });
    }
});

const injectMainScript = () => {
    const determineRaid = async () => {
        let loot = window.Game.view.resultJsonData.rewards.reward_list;
        let goldChest = Object.keys(loot[3]);
        let blueChest = Object.keys(loot[11]);
        let redChest = Object.keys(loot[4]);

        const message = { command: 'UPDATE_STORAGE', type: "UNKNOWN", raid: "UNKNOWN", loot: loot };
        //#region m3 - always drops immortal fragment
        if (goldChest.includes("10_612")) {
            message.type = "M3";
            //determine which raid by 2nd chest contents - element respective m3 anima, centrum, urn, true anima, or quartz
                //tia aura
            if (checkChest(goldChest, ["10_600", "10_104", "10_114", "10_44", "10_5041"])) {
                message.raid = "M3 Tiamat";
            }
                //colo ira
            else if (checkChest(goldChest, ["10_602", "10_101", "10_111", "10_41", "10_5011"])) {
                message.raid = "M3 Colossus";
            }
                //yggy
            else if (checkChest(goldChest, ["10_604", "10_103", "10_113", "10_43", "10_5031"])) {
                message.raid = "M3 Yggdrasil";
            }
                //levi
            else if (checkChest(goldChest, ["10_606", "10_102", "10_112", "10_42", "10_5021"])) {
                message.raid = "M3 Leviathan";
            }
                //lumi credo
            else if (checkChest(goldChest, ["10_608", "10_105", "10_115", "10_45", "10_5051"])) {
                message.raid = "M3 Luminiera";
            }
                //celeste ater
            else if (checkChest(goldChest, ["10_610", "10_106", "10_116", "10_46", "10_5061"])) {
                message.raid = "M3 Celeste";
            }
        }
        //#endregion
        //#region bar raids
            //pbhl - always drops horns of bahamut or primeval horn
        else if (checkChest([goldChest, redChest], ["10_79", "10_59"])) {
            message.type = "BAR";
            message.raid = "PBHL";
        }
            //gohl - always drops verdant azurite
        else if (checkChest([goldChest, redChest], ["10_546"])) {
            message.type = "BAR";
            message.raid = "GOHL";
        }
            //akasha - always drops hollow key
        else if (checkChest([goldChest, redChest], ["10_534"])) {
            message.type = "BAR";
            message.raid = "Akasha";
        }
            //ubahl - *almost* always drops an ultima unit
        else if (checkChest([goldChest, redChest], ["10_138"])) {
            message.type = "BAR";
            message.raid = "UBAHL";
        }
        //#endregion
        //#region revans - *should* always drop their specific material
            //mugen
        else if (checkChest([goldChest, blueChest], ["10_586"])) {
            message.type = "REVAN";
            message.raid = "Mugen";
        }
            //diaspora
        else if (checkChest([goldChest, blueChest], ["10_585"])) {
            message.type = "REVAN";
            message.raid = "Diaspora";
        }
            //siegried
            //seofon
        else if (checkChest([goldChest, blueChest], ["10_589"])) {
            message.type = "REVAN";
            message.raid = "Seofon";
        }
            //cosmos
            //agastia
        else if (checkChest([goldChest, blueChest], ["10_588"])) {
            message.type = "REVAN";
            message.raid = "Agastia";
        }
        //#endregion
        //#region 6-dragons - always drops their respective jewel
            //wilnas
        else if (checkChest([goldChest, blueChest], ["10_557"])) {
            message.type = "DRAGON";
            message.raid = "Wilnas";
        }
            //wamdus
        else if (checkChest([goldChest, blueChest], ["10_558"])) {
            message.type = "DRAGON";
            message.raid = "Wamdus";
        }
            //galleon
        else if (checkChest([goldChest, blueChest], ["10_559"])) {
            message.type = "DRAGON";
            message.raid = "Galleon";
        }
            //ewiyar
        else if (checkChest([goldChest, blueChest], ["10_560"])) {
            message.type = "DRAGON";
            message.raid = "Ewiyar";
        }
            //lu woh
        else if (checkChest([goldChest, blueChest], ["10_561"])) {
            message.type = "DRAGON";
            message.raid = "Lu Woh";
        }
            //fediel
        else if (checkChest([goldChest, blueChest], ["10_562"])) {
            message.type = "DRAGON";
            message.raid = "Fediel";
        }
        //#endregion
        //enead - cannot be determined
        //the world- *presumably* always drops a world idean?
        else if (checkChest([goldChest, redChest], ["10_25017"])) {
            message.type = "WORLD";
            message.raid = "The World";
        }

        if (window.Game.view.resultJsonData.retry_quest_info !== null) {
            message.type = "SOLO";
            message.raid = window.Game.view.resultJsonData.retry_quest_info.quest_id;
        }
        window.postMessage(message, '*');
    };
    
    const checkChest = (chests, ids) => {
        if (chests[0].length === undefined) chests = [chests]
        for (let j = 0; j < chests.length; j++) {
            for (let i = 0; i < ids.length; i++) {
                if (chests[j].includes(ids[i])) return true;
            }
        }
        return false;
    }

    const checkGameLoaded = () => {
        if (window.Game.view.resultJsonData !== undefined) {

            // Perform your actions here
            determineRaid();

            return true;
        }
        return false;
    }

    // Check immediately
    const maxChecks = 200;
    let currentChecks = 0;
    if (!checkGameLoaded()) {
        // If not loaded, set an interval to check periodically
        const intervalId = setInterval(() => {
            currentChecks++;
            if (currentChecks >= maxChecks) {
                window.postMessage({ command: "MESSAGE", message: "Timeout from too many checks"});
                clearInterval(intervalId);
            }
            if (checkGameLoaded()) {
                clearInterval(intervalId);
            }
        }, 100);
    }
};
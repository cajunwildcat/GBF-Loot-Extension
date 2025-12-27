const blueChestIcon = "https://gbf.wiki/images/thumb/b/b1/Icon_Blue_Chest.png/25px-Icon_Blue_Chest.png";
const redChestIcon = "https://gbf.wiki/images/thumb/f/f0/Icon_Red_Chest.png/25px-Icon_Red_Chest.png";
const goldChestIcon = "https://gbf.wiki/images/thumb/3/32/Icon_Gold_Chest.png/25px-Icon_Gold_Chest.png";
const greenChestIcon = "https://gbf.wiki/images/thumb/4/4c/Icon_Green_Chest.png/25px-Icon_Green_Chest.png";
const swordIcon = "https://gbf.wiki/images/thumb/9/93/Item_kind_icon_001.png/25px-Item_kind_icon_001.png";

const gbfItem = (type, id) => `https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img_mid/sp/assets/${type}/s/${id}.jpg`;
const gbfElement = (element) => {
    switch (element) {
        case '1': return "https://gbf.wiki/thumb.php?f=Label_Element_Fire.png&w=60";
        case '2': return "https://gbf.wiki/thumb.php?f=Label_Element_Water.png&w=60";
        case '3': return "https://gbf.wiki/thumb.php?f=Label_Element_Earth.png&w=60";
        case '4': return "https://gbf.wiki/thumb.php?f=Label_Element_Wind.png&w=60";
        case '5': return "https://gbf.wiki/thumb.php?f=Label_Element_Light.png&w=60";
        case '6': return "https://gbf.wiki/thumb.php?f=Label_Element_Dark.png&w=60";
    }
}

const raidIDs = {
    /*HL*/305311: "SUBHL", 305491: "Hexa", 305581: "Faa Zero", 305701: "Versusia",
    /*BARS*/301061: "PBHL", 303251: "Akasha", 305161: "GOHL", 303141: "UBAHL", 305571: "The World",
    /*REVANS*/305381: "Mugen", 305391: "Diaspora", 305401: "Siegfried", 305411: "Seofon", 305421: "Cosmos", 305431: "Agastia",
    /*OMEGA III*/305601: "Tiamat Aura", 305611: "Colossus Ira", 305631: "Leviathan Mare", 305641: "Yggdrasil Arbos", 305591: "Luminiera Credo", 305621: "Celeste Ater",
    /*6-DRAGONS*/305191: "Wilnas", 305201: "Wamdus", 305211: "Galleon", 305221: "Ewiyar", 305231: "Lu Woh", 305241: "Fediel",
    /*ENEADS*/305321: "Atum", 305331: "Tefnut", 305341: "Bennu", 305351: "Ra", 305361: "Horus", 305371: "Osiris",
    /*Other Impossibles*/300441: "Tia Impossible", 300491: "Colo Impossible", 300511: "Levi Impossible", 300531: "Yggy Impossible", 300561: "Lumi Impossible", 300581: "Celeste Impossible", 303151: "Shiva", 303161: "Europa", 303171: "Alexiel", 303181: "Grimnir", 303191: "Metatron", 303221: "Avatar", 300471: "Rose Queen", 303241: "Tia Malice", 305151: "Levi Malice", 305251: "Phronesis", 305271: "Lumi Malice", 305291: "Anima-Animus", 305481: "Legion Void", 303231: "HLQL", 303271: "Faa", 303291: "Four Primarchs", 305171: "Lindwurm", 303281: "FaaHL", 305281: "Belial", 305181: "Bubz",
    300041: "Tia", 300091: "Colo", 300151: "Levi", 300191: "Yggy", 300221: "Adversa", 300251: "Celeste",
    300051: "Tia Ω", 300101: "Colo Ω", 300161: "Levi Ω", 300261: "Yggy Ω", 300271: "Lumi Ω", 300281: "Celeste Ω",
    301071: "Athena", 300481: "Grani", 301371: "Baal", 301381: "Garuda", 300461: "Odin", 300551: "Lich", 301051: "Grand Order", 300291: "Proto Baha",
    301671: "Huanglong", 301681: "Qilin", 303101: "Michael", 303091: "Gabriel", 303111: "Uriel", 303081: "Raphael", 303131: "UBAHA",
    /*Verboten*/ 305721: "Nihuyvintae", 305711: "Belmerkvolk",
    /*Mastery Trials*/ 305661: "Martial", 305671: "Esoteric", 305681: "Virtuosic"
};
const arcarumFights = { "Zone Elitio": { 811011: "Slithering Seductress", 811021: "Living Lightning Rod", 811031: "Eletion Drake", 811041: "Paradoxical Gate", 811051: "Death Seer", 811061: "Blazing Everwing", 811071: "Terror Trifecta", 811081: "Hundred-Armed Hulk", 811091: "Rageborn One", 811101: "Cleansing Wyrmgod", 811111: "Usurper of the Throne", 811121: "Violetflash Sovereign", 811131: "Eletion Glider", 811161: "Herald of the Devil", 811171: "Herald of the Sun", 811181: "Herald of the Star" }, "Zone Faim": { 812011: "Trident Grandmaster", 812021: "Hoarfrost Icequeen", 812031: "Oceanic Archon", 812041: "Farsea Predator", 812051: "Faymian Fortress", 812061: "Draconic Simulacrum", 812071: "Eyes of Sorrow", 812081: "Azureflame Dragon", 812091: "Mad Shearwielder", 812101: "Creeping Seashadow", 812111: "Lilywhite Paragon", 812121: "Iceberg Champion", 812131: "Faymian Gun", 812161: "Herald of Justice", 812171: "Herald of the Moon", 812181: "Herald of Death" }, "Zone Goliath": { 813011: "Vestige of Truth", 813021: "Frenzied Howler", 813031: "Bloodstained Barbarian", 813041: "Temptation's Guide", 813051: "Avatar of Avarice", 813061: "World's Veil", 813071: "Goliath Keeper", 813081: "Goliath Vanguard", 813091: "Writhing Despair", 813101: "Enshrined Behemoth", 813111: "Farseeing Darmistress", 813121: "Earthshaking Panther", 813131: "Goliath Triune", 813161: "Herald of the Hanged Man", 813171: "Herald of the Tower", 813181: "Herald of Death" }, "Zone Harbinger": { 814011: "Harbinger Hardwood", 814021: "Harbinger Simurgh", 814031: "Wildwind Conjurer/Fullthunder Conjurer", 814041: "Dirgesinger", 814051: "Vengeful Demigod", 814061: "Demanding Stormgod", 814071: "Phantasmagoric Aberration", 814081: "Dimensional Riftwalker", 814091: "Harbinger Tyrant", 814101: "Jadegleam Dragonkin", 814111: "Tempestuoud Beauty", 814121: "Majestic Goldenwing", 814131: "Harbinger Stormer", 814161: "Herald of Temperance", 814171: "Herald of Judgement", 814181: "Herald of the Star" }, "Zone Invidia": { 815011: "Infernal Hellbeast", 815021: "Spikeball", 815031: "Blushing Groom", 815041: "Unworldly Guardian", 815051: "Sword Aberration", 815061: "Deva of Wisdom", 815071: "Raging Ironsmith", 815081: "Absolute Defender", 815091: "Athena Militis", 815111: "Herald of Flame", 815121: "Herald of Light", 815131: "Xeno Ifrit Militis" }, "Zone Joculator": { 816011: "Glacial Hellbeast", 816021: "Giant Sea Plant", 816031: "Maiden of the Depths", 816041: "Bloody Soothsayer", 816051: "Nebulous One", 816061: "Dreadful Scourge", 816071: "Lady of Redemption", 816081: "Jurassic Dino", 816091: "Grani Militis", 816111: "Herald of Water", 816121: "Herald of Dark", 816131: "Xeno Cocytus Militis" }, "Zone Kalendae": { 817011: "Tainted Hellmaiden", 817021: "Watcher from Above", 817031: "Bedeviled Plague", 817041: "Hellbeast of Doom", 817051: "Ebony Executioner", 817061: "Scintillant Matter", 817071: "Mudwing of Mad Malice", 817081: "Jurassic Dino", 817091: "Baal Militis", 817111: "Herald of Earth", 817121: "Herald of Dark", 817131: "Xeno Vohu Manah Militis" }, "Zone Liber": { 818011: "Mounted Toxophilite", 818021: "Ageless Guardian Beast", 818031: "Beetle of Damnation", 818041: "Solar Princess", 818051: "Drifting Blade Demon", 818061: "Simpering Beast", 818071: "Debonair Blade", 818081: "Absolute Defender", 818091: "Garuda Militis", 818111: "Herald of Wind", 818121: "Herald of Light", 818131: "Xeno Sagittarius Militis" }, "Zone Mundus": { 819011: "Hotheaded Pincers", 819021: "Earth-Shattering Fire Demon", 819031: "High-Voltage Rock", 819041: "Princess of the Horde", 819051: "Elephant Stomping Ground", 819061: "Love Meeee", 819071: "Parasite Steve", 819081: "Tide Caller", 819091: "Proud War Princess of Dragons", 819101: "Winged Demon Cat", 819111: "Dragon in Glittering Green", 819121: "Goddess of the Wild Hunt", 819131: "The World", 819141: "Prometheus Militis", 819151: "Ca Ong Militis", 819161: "Gilgamesh Militis", 819171: "Morrigna Militis", 819181: "Herald of Fire", 819191: "Herald of Water", 819201: "Herald of Earth", 819211: "Herald of Wind", 819221: "Herald of Light", 819231: "Herald of Dark" } }
const freeQuestFights = { "Tier 1 Showdowns": { 103791: "Twin Elements", 103801: "Marcula Marius", 103811: "Medusa", 103821: "Nezha", 103831: "Apollo", 103841: "Dark Angel Olivia", 100831: "Mithra" }, "Tier 2 Showdowns": { 103851: "Prometheus", 103861: "Ca Ong", 103871: "Gilgamesh", 103881: "Morrigna", 103891: "Hector", 103901: "Anubis" }, "6 Dragon Advents": { 103441: "Wilnas", 103451: "Wamdus", 103461: "Galleon", 103471: "Ewiyar", 103481: "Lu Woh", 103491: "Fediel" }, "World Treasure Quests": { 100221: "Special Op's Request", 101121: "Scattered Cargo", 101131: "Thread tothe Fisheries", 101261: "Whiff of Danger", 101251: "Lucky Charm Hunt", 101141: "Golonzo's Battles of Old", 101271: "I Challenge You!", 102351: "Peddler in a Pinch", 101531: "Imperial Wanderer's Soul", 101651: "Next Up: A Mechanical Beast?!", 102441: "Strength and Chivalry", 102361: "Baker and the Merrymaker", 103001: "Trust-Busting Dustup", 102611: "The Mysterious Room", 102621: "The Right of Might", 102991: "A Snowy Shelter", 102291: "Here Today, Gone Golonzo", 101521: "Antiquarian Troubles", 102401: "Tycoon Trouble", 103781: "Dark Side of Indulgence", 102961: "Miscongeniality", 102491: "Playing Cat and Mouse", 103531: "Once Lost, Once Found", 103391: "House of Happiness", 104031: "A Taste of Our Journey", }, "Proud/Proud+": { 103401: "Nalhe", 103411: "Nalhe+", 103591: "Violet Knight", 103601: "Violet Knight+", 103671: "Golden Knight", 103681: "Golden Knight+", 103631: "Echidna", 103631: "Echidna+", 103701: "White Knight", 103711: "White Knight+", 103571: "Gilbert", 103581: "Gilbert+", 103751: "Cherub", 103751: "Cherub+", 104011: "Zwei", 104011: "Zwei+" } };
const specialQuestFights = { "Campaign-Exclusive Quest": { 800011: "800011", 800021: "800021", 800031: "Halloween" }, "Uncap Treasure Quests": { 400331: "Normal Fire Trial", 400341: "Hard Fire Trial", 400351: "Very Hard Fire Trial", 400361: "Normal Water Trial", 400371: "Hard Water Trial", 400381: "Very Hard Water Trial", 400391: "Normal Earth Trial", 400401: "Hard Earth Trial", 400411: "Very Hard Earth Trial", 400421: "Normal Wind Trial", 400431: "Hard Wind Trial", 400441: "Very Hard Wind Trial", 400451: "Normal Light Trial", 400461: "Hard Light Trial", 400471: "Very Hard Light Trial", 400481: "Normal Dark Trial", 400491: "Hard Dark Trial", 400501: "Very Hard Dark Trial" }, "Shiny Slime Search": { 400131: "Normal Slimes", 400141: "Hard Slimes", 400151: "Very Hard Slimes" }, "Xeno Showdown": { 500131: "Normal Ifrit", 500141: "Hard Ifrit", 500151: "Very Hard Ifrit", 500611: "Maniac Ifrit", 500051: "Normal Cocytus", 500061: "Hard Cocytus", 500071: "Very Hard Cocytus", 500621: "Maniac Cocytus", 500081: "Normal Vohu Manah", 500091: "Hard Vohu Manah", 500631: "Very Hard Vohu Manah", 500191: "Maniac Vohu Manah", 500201: "Normal Sagittarius", 500211: "Hard Sagittarius", 500221: "Very Hard Sagittarius", 500641: "Maniac Sagittarius", 500341: "Normal Ifrit", 500351: "Hard Ifrit", 500361: "Very Hard Ifrit", 500651: "Maniac Ifrit", 500501: "Normal Diablo", 500511: "Hard Diablo", 500521: "Very Hard Diablo", 500661: "Maniac Diablo" }, "Xeno Clashes": { 500811: "Extreme Xeno Ifrit Clash", 500821: "Maniac Xeno Ifrit Clash", 501201: "Extreme Xeno Cocytus Clash", 501211: "Maniac Xeno Cocytus Clash", 501031: "Extreme Xeno Vohu Manah Clash", 501041: "Maniac Xeno Vohu Manah Clash", 501141: "Extreme Xeno Sagittarius Clash", 501151: "Maniac Xeno Sagittarius Clash", 501321: "Extreme Xeno Corow Clash", 501331: "Maniac Xeno Corow Clash", 501261: "Extreme Xeno Diablo Clash", 501271: "Maniac Xeno Diablo Clash" }, "Angel Halo": { 510011: "Normal Angel Halo", 510021: "Hard Angel Halo", 510031: "Very Hard Angel Halo", 510051: "Nightmare Angel Halo" }, "Primarch Trials": { 500871: "Normal Michael", 500881: "Hard Michael", 500891: "Very Hard Michael", 500901: "Extreme Michael", 501621: "Extreme+ Michael", 500951: "Normal Gabriel", 500961: "Hard Gabriel", 500971: "Very Hard Gabriel", 500981: "Extreme Gabriel", 501641: "Extreme+ Gabriel", 500911: "Normal Uriel", 500921: "Hard Uriel", 500931: "Very Hard Uriel", 500941: "Extreme Uriel", 501631: "Extreme+ Uriel", 500991: "Normal Raphael", 501001: "Hard Raphael", 501011: "Very Hard Raphael", 501021: "Extreme Raphael", 501651: "Extreme+ Raphael" } };
const coopFights = { "Normal": { 600111: "Rabbit Be Nimble", 600141: "Buzz Step", 600241: "Windswept Locks", 600261: "The Howling Wind", 600311: "Hot Blooded", 600331: "Dog Eat Dog", 600451: "Great Balls of Fire", 600461: "Cruel World", 600611: "True Connoisseur", 600621: "What Lurks Below", 600641: "Toxicity", 600661: "Somber Serpent", 600821: "With One Look", 600741: "Point and Shoot!", 600751: "Dinner Time", 600861: "Forest of Giants" }, "Hard": { 601051: "Gale of Wings", 600951: "Talon Strike", 600961: "Acid-Burn Dragon", 601061: "The Wailing Wind", 601151: "White-Hot Temper", 601431: "Unsmothered Flame", 601161: "A Puppet's Dream", 601261: "The Sky's Ablaze", 601011: "In a Dusk Dream", 601521: "Wave of Anger", 601361: "Venomous Her", 601461: "Riptide", 601611: "Never Give Up!", 601451: "Behind the Curtain", 601561: "Lingering Scent", 601661: "Heart of Stone" }, "Very Hard": { 601711: "Corridor of Puzzles", 601721: "Sword-Slashed Stone", 601731: "Lost in the Dark", 601741: "Claw-Carved Path", 601751: "Tyrant's Bed", 601811: "Tunnels of Gloom", 601821: "Time of Judgement", 601831: "Time of Revelation", 601841: "Time of Eminence", 601911: "Guardians Plinth", 601921: "Rule of the Tundra", 601931: "Rule of the Plains", 601941: "Rule of the Twilight", 602011: "Breaking the Mold", 602021: "Amidst the Waves", 602031: "Amidst the Petals", 602041: "Amidst Severe Cliffs", 602051: "Amidst the Flames", 602111: "Throes of Sorcery", 602121: "Throes of Spears", 602131: "Throes of Wings", 602141: "Throes of Calamity", 602211: "Throes of Dark Steel", 602221: "Throes of Death" } };

const knownRaidIDs = Object.keys(raidIDs).map(i => parseInt(i));
const knownRaidNames = Object.values(raidIDs);
let topPins = {
    /*m3*/305601: [215, 600, 601], 305611: [215, 602, 603], 305631: [215, 604, 605], 305641: [215, 606, 607], 305591: [215, 608, 609], 305621: [215, 610, 611],/*bars*/301061: [20004], 303251: [20004], 305161: [20004], 303141: [20004], 305571: [215],/*revan*/305381: [215, 586], 305391: [215, 585], 305401: [215, 587], 305411: [215, 589], 305421: [215, 590], 305431: [215, 588]
};
let bottomPins = {
    /*m3*/305601: [1040516800, 1040119200, 1040713400], 305611: [1040423100, 1040317400, 1040026100], 305631: [1040119700, 1040318100, 1040916500], 305641: [1040026300, 1040619000, 1040816500], 305591: [1040516900, 1040219100, 1040916200], 305621: [1040618800, 1040916300, 1040119500],/*bars*/301061: [59, 79], 303251: [], 305161: [], 303141: [], 305571: [],/*revan*/305381: [], 305391: [], 305401: [], 305411: [], 305421: [], 305431: []
};

let currentRaid = {};
let raidData;
const getCurrentRaid = () => currentRaid;
window.onload = async (e) => {
    const raidTitle = document.querySelector("#raid-title");
    const raidInfo = document.querySelector("#raid-info");
    const pinRow1 = document.querySelector("#top-span1");
    const pinRow2 = document.querySelector("#top-span2");

    const pinContextMenu = document.querySelector("#pin-item-menu");
    document.onclick = (e) => {
        pinContextMenu.style.display = "none";
    }

    let currentRaidItemTotals = {};
    await chrome.storage.local.get(null).then(r => raidData = r);
    console.log("raids", raidData)
    let pendingRaids;
    await chrome.storage.session.get(null).then(r => pendingRaids = r);
    console.log("pending", pendingRaids);
    let pinnedItems = { top: topPins, bot: bottomPins }
    await chrome.storage.sync.get({ "pinnedItems": pinnedItems }).then(r => pinnedItems = r.pinnedItems);
    topPins = pinnedItems.top;
    bottomPins = pinnedItems.bot;
    let customNames;
    await chrome.storage.sync.get({ "customNames": {} }).then(r => customNames = r.customNames);

    //build Solo Fight category
    let soloFights = Object.keys(raidData).map(i => parseInt(i)).filter(raid => !knownRaidIDs.includes(raid));
    if (soloFights.length > 0) {
        const sidebar = document.querySelector(".sidebar");
        sidebar.innerHTML += `<h5><button class="w3-bar-item w3-button w3-block w3-left-align raid-category-button fa fa-caret-right"> Solo Fights</button></h5>`;
        const soloFightsDiv = document.createElement("div");
        soloFightsDiv.className = "w3-hide w3-card";

        function buildSoloCategory(catName, fightDictionary,) {
            const catIDs = Object.values(fightDictionary).map(o => Object.keys(o)).flat().map(a => parseInt(a));
            const catDropDown = document.createElement("h5");
            catDropDown.innerHTML = `<button class="w3-bar-item w3-button w3-block w3-left-align raid-category-button fa fa-caret-right"> ${catName}</button>`;
            const catDiv = document.createElement("div");
            catDiv.className = "w3-hide w3-card";
            const filteredSoloFights = soloFights.filter(a => catIDs.includes(parseInt(a)));
            Object.keys(fightDictionary).forEach(z => {
                catDiv.innerHTML += `<h5><button class="w3-bar-item w3-button w3-block w3-left-align raid-category-button fa fa-caret-right"> ${z}</button></h5>`;
                const subCatDiv = document.createElement("div");
                subCatDiv.className = "w3-hide w3-card";
                catDiv.appendChild(subCatDiv);
                Object.keys(fightDictionary[z]).forEach(f => {
                    if (filteredSoloFights.includes(parseInt(f))) {
                        soloFights.splice(soloFights.indexOf(parseInt(f)), 1);
                        const navButton = document.createElement("button");
                        navButton.className = "w3-bar-item w3-button raid-button solo-quest";
                        navButton.dataset["fightId"] = f;
                        const name = customNames[f] ? customNames[f] : fightDictionary[z][f];
                        knownRaidIDs.push(parseInt(f));
                        knownRaidNames.push(name);
                        raidIDs[f] = name;
                        navButton.innerHTML = name;
                        subCatDiv.appendChild(navButton);
                    }
                });
            });
            return [catDropDown, catDiv];
        }
        buildSoloCategory("Arcarum", arcarumFights).forEach(e => soloFightsDiv.appendChild(e));
        buildSoloCategory("Free Quests", freeQuestFights).forEach(e => soloFightsDiv.appendChild(e));
        buildSoloCategory("Special Quests", specialQuestFights).forEach(e => soloFightsDiv.appendChild(e));
        buildSoloCategory("Co-op Quests", coopFights).forEach(e => soloFightsDiv.appendChild(e));

        //Co-op
        //Events
        //ROTB
        //Other?

        soloFights.forEach(fight => {
            if (Object.values(raidData[fight]).length <= 1) return;
            const navButton = document.createElement("button");
            navButton.className = "w3-bar-item w3-button raid-button solo-quest";
            const name = raidData[fight].name ? raidData[fight].name : fight;
            knownRaidIDs.push(parseInt(fight));
            knownRaidNames.push(name);
            raidIDs[fight] = customNames[fight] ? customNames[fight] : name;
            navButton.innerHTML = name;
            navButton.dataset["fightId"] = fight;
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
    await chrome.storage.sync.get("lastTab").then(r => lastRaid = parseInt(r.lastTab));
    if (!knownRaidIDs.includes(lastRaid)) lastRaid = raidIDs[301061];
    document.querySelectorAll(".raid-button").forEach((i) => {
        const raidID = i.dataset["fightId"];
        i.innerHTML = customNames[raidID] ? customNames[raidID] : raidIDs[raidID];
        i.onclick = (e) => {
            chrome.storage.sync.set({ "lastTab": raidID });
            currentRaid = raidID;
            raidTitle.innerHTML = `${i.innerHTML}<button id="rename-button" class="w3-button fa fa-pencil-square-o fa-5" style="float:right;padding:10px;" title="rename fight"></button>`;
            document.querySelector("#rename-button").onclick = () => {
                const name = prompt("Enter a new name for this fight", i.innerHTML);
                if (name == null || name == "" || name == " ") {
                    delete customNames[raidID];
                    chrome.storage.sync.set({ "customNames": customNames });
                    window.location.reload();
                }
                else {
                    raidTitle.innerHTML = raidTitle.innerHTML.replace(i.innerHTML, name);
                    i.innerHTML = name;
                    customNames[raidID] = name;
                    chrome.storage.sync.set({ "customNames": customNames });
                }
            };
            if (!raidData[raidID]) {
                buildRaidInfo({});
            }
            buildRaidInfo({ ...raidData[raidID], name });
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

    function buildRaidInfo(result) {
        delete result.name;
        raidInfo.querySelector("#no-loot-warning")?.remove();
        raidInfo.querySelector("#button-span")?.remove();
        raidInfo.querySelector("#raid-kill-count")?.remove();
        raidInfo.querySelector("#top-span1").innerHTML = "";
        raidInfo.querySelector("#top-span2").innerHTML = "";
        document.querySelectorAll(".loot-column").forEach(i => i.remove());

        if (Object.keys(result).length < 1) {
            document.querySelectorAll(".loot-column").forEach(c => c.style.display = "none");
            const noLootWarning = document.createElement("h3");
            noLootWarning.id = "no-loot-warning";
            noLootWarning.innerHTML = "There is not recorded data for this raid";
            raidInfo.appendChild(noLootWarning);
        }
        else {
            const killCount = document.createElement("h3");
            killCount.innerHTML = `Kills: ${Object.keys(result).length}`;
            killCount.id = "raid-kill-count";
            raidInfo.appendChild(killCount);
            const chestData = {
                woodChests: [],
                silverChests: [],
                goldChests: [],
                redChests: [],
                blueChests: [],
                purpleChests: [],
                greenChests: [],

                artifacts: []
            };
            Object.values(result).forEach(session => {
                if (session[1]) chestData.woodChests.push(session[1]);
                if (session[2]) chestData.silverChests.push(session[2]);
                if (session[3]) chestData.goldChests.push(session[3]);
                if (session[4]) chestData.redChests.push(session[4]);
                if (session[11]) chestData.blueChests.push(session[11]);
                if (session[13]) chestData.purpleChests.push(session[13]);
                if (session[16]) chestData.greenChests.push(session[16]);

                if (session[90]) chestData.artifacts.push(session[90]);
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
                chrome.storage.local.remove(`${getCurrentRaid()}`).then(_ => {
                    window.location.reload();
                });
            };
        }
    }

    function displayLoot(data) {
        currentRaidItemTotals = {};
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
        if (data.artifacts && data.artifacts.length > 0) {
            processArtifacts(data.artifacts);
        }
        Object.keys(currentRaidItemTotals).forEach(item => {
            const itemId = parseInt(item);
            if (topPins[getCurrentRaid()] && topPins[getCurrentRaid()].includes(itemId)) {
                pinRow1.appendChild(createPinnedItemSpan({ type: currentRaidItemTotals[itemId].type, id: item }, currentRaidItemTotals[itemId].count));
            }
            if (bottomPins[getCurrentRaid()] && bottomPins[getCurrentRaid()].includes(itemId)) {
                pinRow2.appendChild(createPinnedItemSpan({ type: currentRaidItemTotals[itemId].type, id: item }, currentRaidItemTotals[itemId].count));
            }
        });
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

                if (!currentRaidItemTotals[parseInt(item.id)]) currentRaidItemTotals[parseInt(item.id)] = { count: 0, type: item.type };
                currentRaidItemTotals[parseInt(item.id)].count += parseInt(item.count);
            });
        });
        return Array.from(lootMap.values());
    }

    function processArtifacts(artifacts) {
        const artis = {};
        let count = 0;
        artifacts.forEach(artifact => {
            if (Array.isArray(artifact)) artifact = artifact[0]
            let element, type;
            [type, element] = artifact.details.split(":");
            if (!artis[element]) artis[element] = {};
            if (!artis[element][type]) artis[element][type] = 0;
            artis[element][type]++;
            count++;
        });

        const lootColumn = document.createElement("div");
        lootColumn.className = "loot-column";
        lootColumn.innerHTML = `<h3>Artifacts: ${artifacts.length}</h3><div class="scrollable"></div>`;
        const container = lootColumn.querySelector(".scrollable");

        for (element in artis) {
            const elementDiv = document.createElement("h4");
            elementDiv.classList.add('item');
            console.log(element)
            let img = gbfElement(element);
            let eleCount = Object.keys(artis[element]).map(i => artis[element][i]).reduce((acc, n) => acc + n);
            elementDiv.innerHTML =
                `<div class="item-name" title="${element}"><img class="item-image" src=${img} style="width:60px;"> x${eleCount} - ${(eleCount / count).toFixed(2)}%</div>`

            container.appendChild(elementDiv);
        }

        raidInfo.appendChild(lootColumn);
    }

    function populateChests(title, loot, drops) {
        const lootColumn = document.createElement("div");
        lootColumn.className = "loot-column";
        lootColumn.innerHTML = `<h3 title="${(drops / (Object.keys(raidData[getCurrentRaid()]).length - (raidData[getCurrentRaid()].name ? 1 : 0)) * 100).toFixed(2)}%">${title}: ${drops}</h3><div class="scrollable"></div>`;
        const container = lootColumn.querySelector(".scrollable");

        loot.forEach(item => item.percentage = ((item.count / drops) * 100).toFixed(2));
        loot.sort((a, b) => b.percentage - a.percentage).forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            const img = item.name == "Badge" && `${item.id}`.slice(-2, -1) == "1" ? "https://gbf.wiki/images/3/33/Silver_Badge_square.jpg" :
                item.name == "Badge" && `${item.id}`.slice(-2, -1) == "0" ? "https://gbf.wiki/images/b/b7/Gold_Badge_square.jpg" :
                    item.name == "Crystal" ? "https://gbf.wiki/images/e/ed/Crystal.jpg" :
                        gbfItem(item.type, item.id);
            const itemCount = Object.keys(item.drops).map(i => i * item.drops[i]).reduce((acc, n) => acc + n);
            itemDiv.innerHTML = `
                <div class="item-name" title="${item.name}"><img class="item-image" src=${img}> x${itemCount} - ${item.percentage}%</div>
            `;
            if (Object.keys(item.drops).length > 1) {
                itemDiv.innerHTML = itemDiv.innerHTML.replace("</div>", ` <i class="fa fa-caret-left" aria-hidden="true"></i></div>`)
                itemDiv.innerHTML += `<div class="item-details w3-hide">
                    ${Object.keys(item.drops).map(drop => `<div style="white-space-collapse:preserve;">x${drop}   ${item.drops[drop]} @ ${(item.drops[drop] / drops * 100).toFixed(2)}%</div>`).join('')}
                    </div>`
                itemDiv.onclick = (e) => {
                    const div = e.target.className.includes("caret") || e.target.className.includes("item-image") ? e.target.parentNode.nextElementSibling : e.target.nextElementSibling;
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
            itemDiv.oncontextmenu = (e) => pinItemContextMenu(e, item);
            container.appendChild(itemDiv);
        });
        raidInfo.appendChild(lootColumn);
    }

    function pinItemContextMenu(e, item) {
        e.preventDefault();
        const itemId = parseInt(item.id);

        pinContextMenu.style.display = "block";
        pinContextMenu.style.left = `${e.pageX}px`;
        pinContextMenu.style.top = `${e.pageY}px`;

        topPinButton = pinContextMenu.querySelector("button");
        botPinButton = pinContextMenu.querySelector("button:nth-of-type(2)");

        if (topPins[getCurrentRaid()] && topPins[getCurrentRaid()].includes(itemId)) {
            topPinButton.innerHTML = "Unpin from top row";
            topPinButton.onclick = (e) => {
                topPins[getCurrentRaid()] = topPins[getCurrentRaid()].filter(i => i != item.id);
                pinRow1.querySelector(`#i-${itemId}`).remove();
                chrome.storage.sync.set({ "pinnedItems": { top: topPins, bot: bottomPins } });
            }
        }
        else {
            topPinButton.innerHTML = "Pin to top row";
            topPinButton.onclick = (e) => {
                if (!topPins[getCurrentRaid()]) topPins[getCurrentRaid()] = [];
                topPins[getCurrentRaid()].push(itemId);

                pinRow1.appendChild(createPinnedItemSpan(item, currentRaidItemTotals[itemId].count));
                chrome.storage.sync.set({ "pinnedItems": { top: topPins, bot: bottomPins } });
            }
        }

        if (bottomPins[getCurrentRaid()] && bottomPins[getCurrentRaid()].includes(itemId)) {
            botPinButton.innerHTML = "Unpin from bottom row";
            botPinButton.onclick = (e) => {
                bottomPins[getCurrentRaid()] = bottomPins[getCurrentRaid()].filter(i => i != item.id);
                pinRow2.querySelector(`#i-${itemId}`).remove();
                chrome.storage.sync.set({ "pinnedItems": { top: topPins, bot: bottomPins } });
            }

        }
        else {
            botPinButton.innerHTML = "Pin to bottom row";
            botPinButton.onclick = (e) => {
                if (!bottomPins[getCurrentRaid()]) bottomPins[getCurrentRaid()] = [];
                bottomPins[getCurrentRaid()].push(itemId);

                pinRow2.appendChild(createPinnedItemSpan(item, currentRaidItemTotals[itemId].count));
                chrome.storage.sync.set({ "pinnedItems": { top: topPins, bot: bottomPins } });
            }
        }
    }

    function createPinnedItemSpan(item, totalCount) {
        const trackedItem = document.createElement("span");
        trackedItem.id = `i-${item.id}`;
        trackedItem.innerHTML = `<img class="item-image" src=${gbfItem(item.type, item.id)}>:${totalCount}`;
        trackedItem.oncontextmenu = (e) => pinItemContextMenu(e, item);
        return trackedItem;
    }

    chrome.runtime.onMessage.addListener(
        async function (request, sender, sendResponse) {
            switch (request.command) {
                case "UPDATE_ICON":
                    await chrome.storage.local.get(`${getCurrentRaid()}`).then(r => raidData[getCurrentRaid()] = r[getCurrentRaid()]);
                    buildRaidInfo({ ...raidData[getCurrentRaid()], name });
                    break;
            }
        }
    )
}
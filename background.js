// background.js
chrome.storage.session.setAccessLevel({accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.includes("granbluefantasy.jp")) {
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            world: "MAIN",
            func: requestIntercept
        }).then(() => {
            //console.log('Script injected successfully.');
        }).catch((error) => {
            //console.error('Script injection failed:', error);
        });
    }
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
    else if (changeInfo.status === 'complete') {
        chrome.action.setIcon({path: "/icons/icon-48-blue.png"});
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        switch (request.command) {
            case "UPDATE_ICON":
                chrome.action.setIcon({path: `icons/icon-48-${request.icon}.png`});
            break;
        }
    }
)

const requestIntercept = () => {
    if (window.XMLHttpRequest.mutated) return;
    window.XMLHttpRequest.mutated = true;
    const oldXHRSend = window.XMLHttpRequest.prototype.send;
    window.XMLHttpRequest.prototype.send = function() {  
        this.addEventListener("load", function() {
            if (this.responseURL.includes("start.json")) {
                const responseBody = JSON.parse(this.response);
                window.postMessage({command: "ADD_PENDING", quest_id: responseBody.quest_id, raid_id: responseBody.raid_id}, '*');
            }
        });
        return oldXHRSend.apply(this, arguments);
    };
};

const injectMainScript = () => {
    const checkGameLoaded = () => {
        if (window.Game.view.resultJsonData !== undefined) {
            const message = {
                command: "RESOLVE_PENDING",
                raid_id: window.location.hash.replace("#result_multi/","").replace("#result/",""),
                loot: window.Game.view.resultJsonData.rewards.reward_list
            }
            if (message.raid_id.includes("detail")) {
                message.raid_id = message.raid_id.replace("detail/", "").replace("/1","");
            }
            window.postMessage(message);
            window.postMessage({command: "UPDATE_ICON", icon: "green"});
            return true;
        }
        return false;
    };

    // Check immediately
    window.postMessage({command: "UPDATE_ICON", icon: "red"});
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
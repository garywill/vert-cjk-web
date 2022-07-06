/*
Licensed under AGPL
By Garywill (
    https://garywill.github.io
    https://space.bilibili.com/2123686105
    https://twitter.com/garyw_gh
)
*/

const URL_READ_HTML = chrome.runtime.getURL("read.html");
chrome.browserAction.onClicked.addListener(async (tab, OnClickData) => {
    console.log("click browser action btn", tab.id, tab.url);
    
    const oURL = new URL(tab.url);
    if (oURL.origin + oURL.pathname === URL_READ_HTML ) {
        
        console.log("addon read.html");
        
        inject_to_tab_iframe(tab.id);
    }
    else 
    {
        console.log("打開新頁縱讀");
        
//         await addResponseModifyer(tab.id);
        
        await chrome.tabs.update(tab.id, {url: URL_READ_HTML + "?url=" + encodeURIComponent(tab.url)});
    }
});
async function addResponseModifyer(tabId) {
    console.log("添加response listener", tabId);
    try { await chrome.webRequest.onHeadersReceived.removeListener(modifyHttpHeader); } catch(err) {}
    await chrome.webRequest.onHeadersReceived.addListener(modifyHttpHeader, {tabId: tabId, types: ["sub_frame"] , urls: ["<all_urls>"] }, ["blocking", "responseHeaders"] );
}
function modifyHttpHeader(details) {
    console.log("http头修改器", details);
    
    const dURL = new URL(details.documentUrl || details.initiator);
    if ( ! (dURL.origin + dURL.pathname) . startsWith ( chrome.runtime.getURL('') ) ) 
        return;

    if (details.parentFrameId !== 0)
        return;
    
    for (var i=0; i<details.responseHeaders.length; i++)
    {
        const cur_header = details.responseHeaders[i];
        if (cur_header.name.toLowerCase() === "x-frame-options"  )
        {
            console.log("删除一个X-Frame-Options");
            details.responseHeaders.splice(i,1);
            i--;
        }
    }
    
    return {responseHeaders: details.responseHeaders};
}

chrome.runtime.onMessage.addListener(async function(message, sender) {
    console.log("background receive message", message, sender);
    
    const tabId = sender.tab.id;
            
    if (message["message"] !== undefined ) {
        if (message["message"] == "inject-to-my-tab-iframe" ) {
            await inject_to_tab_iframe(tabId);
        }
        else if (message["message"] == "add-reponse-modifyer-to-my-tab" ) {
            await addResponseModifyer(tabId);
        }
    }

});

async function inject_to_tab_iframe(tabId) {
    var code_inject = "";
    await fetch('inject_iframe.js').then(response => response.text()).then(textString => {
        code_inject = textString;
    });
    code_inject = code_inject.replaceAll("__TBRL_FONT_URL__", chrome.runtime.getURL("wqy-microhei-rotate90cjk.ttf"));
    
    await chrome.webNavigation.getAllFrames(
        {tabId: tabId},
        async function(r) {
            console.log(tabId, "subframes:", r);
            for (var i=0; i<r.length; i++) {
                
                const frameId = r[i].frameId;
                if (frameId === 0)
                    continue;
                await chrome.tabs.executeScript(
                    tabId,  
                    {
                        frameId: frameId,
                        code: code_inject
                        
                    }
                )
            }
            
        }
    );
}

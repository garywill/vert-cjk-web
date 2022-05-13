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
    console.log("click browser action btn");
    console.log(tab.id, tab.url);
    
    const oURL = new URL(tab.url);
    if (oURL.origin + oURL.pathname === URL_READ_HTML ) {
        
        console.log("addon read.html");
        
        inject_to_tab_iframe(tab.id);
    }
    else 
    {
        console.log("打開新頁縱讀");
        await chrome.webRequest.onHeadersReceived.addListener(modifyHttpHeader, {tabId: tab.id, types: ["sub_frame"] , urls: ["<all_urls>"] }, ["blocking", "responseHeaders"] );
        await chrome.tabs.update(tab.id, {url: URL_READ_HTML + "?url=" + encodeURIComponent(tab.url)});
    }
});
function modifyHttpHeader(details) {
    console.log("http头修改器");
    console.log(details);
    
    const dURL = new URL(details.documentUrl);
    if (dURL.origin + dURL.pathname !== URL_READ_HTML ) 
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
    console.log("background receive message");
    console.log("message:", message);
    console.log("sender:", sender);
    
    if (message["message"] !== undefined && message["message"] == "inject-to-my-tab-iframe" ) {
        const tabId = sender.tab.id;
        await inject_to_tab_iframe(tabId);
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
            console.log(r);
            for (var i=1; i<r.length; i++) {
                const frameId = r[i].frameId;
                
                
                chrome.tabs.executeScript(
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

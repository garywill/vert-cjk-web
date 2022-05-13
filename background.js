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
        await chrome.tabs.create({url: URL_READ_HTML + "?url=" + encodeURIComponent(tab.url)});
    }
    
//     var code_inject = "";
//     await fetch('inject_actionbtn.js').then(response => response.text()).then(textString => {
//         code_inject = textString;
//     });
// //     code_inject = code_inject.replaceAll("__TBRL_FONT_URL__", chrome.runtime.getURL("wqy-microhei-rotate90cjk.ttf"));

//     var result = await chrome.tabs.executeScript({
//         matchAboutBlank: false,
//         code: code_inject,
//         runAt: "document_start"
//     });
});

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
    await chrome.webNavigation.getAllFrames(
        {tabId: tabId},
        async function(r) {
            console.log(r);
            const frameId = r[1].frameId;
            
            var code_inject = "";
            await fetch('inject_iframe.js').then(response => response.text()).then(textString => {
                code_inject = textString;
            });
            code_inject = code_inject.replaceAll("__TBRL_FONT_URL__", chrome.runtime.getURL("wqy-microhei-rotate90cjk.ttf"));
            
            chrome.tabs.executeScript(
                tabId,  
                {
                    frameId: frameId,
                    code: code_inject
                    
                }
            )
            
        }
    );
}

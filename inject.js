/*
Licensed under AGPL
By Garywill (
    https://garywill.github.io
    https://space.bilibili.com/2123686105
    https://twitter.com/garyw_gh
)
*/

console.log("要变竖排阅读！");

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dorotate() {
    //============================
    var title = document.title; // 记录title
    var winH = window.innerHeight; // 记录窗口高度
    console.log("窗口高度", winH);
    //================================
    var IFRAME = document.createElement("iframe");
    IFRAME.id = "vert_iframe";
    IFRAME.sandbox="allow-downloads-without-user-activation  allow-forms  allow-modals  allow-orientation-lock  allow-pointer-lock  allow-popups  allow-popups-to-escape-sandbox  allow-presentation  allow-scripts  allow-storage-access-by-user-activation    allow-top-navigation-by-user-activation  allow-same-origin";

    document.documentElement.innerHTML = "";
    document.title = title;
    document.body.appendChild(IFRAME);
    document.body.style.overflow = "hidden";
    IFRAME.style = `
        width: calc( 100vh - 10px );
        height: calc( 100vw - 10px );
        transform: rotate(90deg);
        transform-origin: top left;
        left: calc( 100vw - 5px );
        position: absolute;
        top: 5px;
    `;
    IFRAME.src = document.location.href;
   
    await sleep(2000);
    
    var subframeScript = document.createElement("script");
    subframeScript.setAttribute("type", "text/javascript");
    
    var true_inject_iframe_js_url = chrome.runtime.getURL("inject_iframe.js");
    
    var SUBFRAME_SCRIPT = "";
    await fetch(true_inject_iframe_js_url).then(response => response.text()).then(textString => {
        SUBFRAME_SCRIPT = textString;
    });
    
    var true_ttf_url = chrome.runtime.getURL("wqy-microhei-rotate90cjk.ttf");
    
    SUBFRAME_SCRIPT = SUBFRAME_SCRIPT.replace("__TBRL_FONT_URL__", true_ttf_url);
    
    subframeScript.textContent = SUBFRAME_SCRIPT;
    
    IFRAME.contentWindow.document.head.appendChild(subframeScript);
    
//     chrome.runtime.sendMessage({
//         "message": "inject-to-my-tab-iframe"
//     });
}
dorotate();

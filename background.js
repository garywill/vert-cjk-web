/*
Licensed under AGPL
By Garywill (
    https://garywill.github.io
    https://space.bilibili.com/2123686105
    https://twitter.com/garyw_gh
)
*/

chrome.browserAction.onClicked.addListener(async () => {
    console.log("click browser action btn");
    
    var code_inject = "";
    await fetch('inject.js').then(response => response.text()).then(textString => {
        code_inject = textString;
    });
    code_inject = code_inject.replaceAll("__TBRL_FONT_URL__", chrome.runtime.getURL("wqy-microhei-rotate90cjk.ttf"));

    var result = await chrome.tabs.executeScript({
        matchAboutBlank: false,
        code: code_inject
//         file: "/paste_to_web_console.js"
//         code: `console.log('location:', window.location.href);`
    });
    console.log(result);
});

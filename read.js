/*
Licensed under AGPL
By Garywill (
    https://garywill.github.io
    https://space.bilibili.com/2123686105
    https://twitter.com/garyw_gh
)
*/


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function init() {
    
    var oURL = new URL(document.location.href);
    var url_to_read = decodeURIComponent( oURL.searchParams.get("url") );
    
    if ( url_to_read ) {
        
        var IFRAME = document.getElementById("TBRL_VERT_IFRAME");
        
        IFRAME.src = url_to_read;
    
        await sleep(1000);
        chrome.runtime.sendMessage({
            "message": "inject-to-my-tab-iframe"
        });
        
        await sleep(1000);
        chrome.runtime.sendMessage({
            "message": "inject-to-my-tab-iframe"
        });
    }
    
    

}

document.addEventListener('DOMContentLoaded', async (event) => {

    init();
});

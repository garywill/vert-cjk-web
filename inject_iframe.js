/*
Licensed under AGPL
By Garywill (
    https://garywill.github.io
    https://space.bilibili.com/2123686105
    https://twitter.com/garyw_gh
)
*/

console.log("竖排阅读iframe！");


var styleTag = document.getElementById("TBRL_STYLE_TAG") || document.createElement("style");
styleTag.id = "TBRL_STYLE_TAG";

styleTag.textContent = `
        @font-face{
            font-family: 'TBRL_CJK_rotate_font'; 
            src: url('__TBRL_FONT_URL__');
        }
        * {
            font-family:  TBRL_CJK_rotate_font !important;
        }
`;
document.head.appendChild(styleTag);

// ================= 图片旋转=============
var imgs = document.getElementsByTagName("img");
imgs = Array.from(imgs);

// var alinks = document.getElementsByTagName("a");
// for (var i=0; i<alinks.length; i++) {
//     alink = alinks[i];
//     if ( getComputedStyle(alink).backgroundImage != "none" )
//         imgs.push(alink);
// }

var vids = document.getElementsByTagName("video");
for (var i=0; i<vids.length; i++) {
    imgs.push( vids[i] );
}
for (var i=0; i<imgs.length; i++) {
    const img = imgs[i];
    
    if (img.getAttribute("TBRL_VERTed") === null) {
        const w = parseInt(getComputedStyle(img).width);
        const h = parseInt(getComputedStyle(img).height);
        var scale = Math.min(w,h) / Math.max(w,h);
        
        var transform = "";
        transform = "rotate(-90deg) ";
        if (scale > 0)
            transform += ` scale(${scale}) `;
        img.style.transform = transform;
        
        img.setAttribute("TBRL_VERTed", "1");
    }
}

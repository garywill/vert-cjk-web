/*
Licensed under AGPL
By Garywill (
    https://garywill.github.io
    https://space.bilibili.com/2123686105
    https://twitter.com/garyw_gh
)
*/

console.log("竖排阅读iframe！");


var styleTag = document.createElement("style");
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

var alinks = document.getElementsByTagName("a");
for (var i=0; i<alinks.length; i++) {
    alink = alinks[i];
    if ( getComputedStyle(alink).backgroundImage != "none" )
        imgs.push(alink);
}


for (var i=0; i<imgs.length; i++) {
    const img = imgs[i];
    const w = parseInt(getComputedStyle(img).width);
    const h = parseInt(getComputedStyle(img).height);
    var scale = Math.min(w,h) / Math.max(w,h);
    
    var transform = "";
    transform = "rotate(-90deg) ";
    if (scale > 0)
        transform += ` scale(${scale}) `;
    img.style.transform = transform;
}
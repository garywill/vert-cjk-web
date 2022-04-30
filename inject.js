/*
Licensed under AGPL
By Garywill (
    https://garywill.github.io
    https://space.bilibili.com/2123686105
    https://twitter.com/garyw_gh
)
*/

console.log("要变竖排阅读！");
// TODO 
// 从上到下滚一遍（让所有ajax内容和图片加载）
// 滚回顶 （让导航栏位置正确）

// ========= 删掉能删掉的脚本 ====
var scriptTags = document.querySelectorAll("script");

for (var i=scriptTags.length-1 ; i>=0 ; i--)
    scriptTags[i].parentNode.removeChild(scriptTags[i]);

var allHtml = document.documentElement.innerHTML;
document.documentElement.innerHTML = "";
document.documentElement.innerHTML = allHtml;


//================== 让body宽度为窗口高度 ===============

const winH = window.innerHeight;
document.body.style.width = winH + "px"; 

// ============= 使用旋转过cjk的字体 ======================

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
    img.style.transform = ` rotate(-90deg) scale(${scale}) `;
}
// ============ 旋转整个网页 =======================
var TBRL_POSITIONER = document.createElement("div"); // 用于作为body下定形的
TBRL_POSITIONER.id = "TBRL_POSITIONER";

var Ws = [ // 原高
    getComputedStyle(document.body).height,
    document.body.clientHeight,
    document.body.scrollHeight,
    document.body.offsetHeight
];
var Hs = [ // 原宽
    getComputedStyle(document.body).Width,
    document.body.clientWidth,
    document.body.scrollWidth,
    document.body.offsetWidth
];

var Ws2 = [];
var Hs2 = [];
for (var i=0; i<Ws.length; i++) {
    Ws[i] = parseInt(Ws[i]);
    if (Ws[i] > 0)
        Ws2.push(Ws[i]);
}

for (var i=0; i<Hs.length; i++) {
    Hs[i] = parseInt(Hs[i]);
    if (Hs[i] > 0)
        Hs2.push(Hs[i]);
}

var W = Math.max(...Ws2) + "px"; // 原高 转后的宽
var H = Math.max(...Hs2) + "px"; // 原宽 转后的高
TBRL_POSITIONER.style.width = W;
TBRL_POSITIONER.style.height = H;


var bodyChildNodes = document.body.childNodes

var TBRL_OUTER=document.createElement("div"); // 原本body的子元素都放进这里再旋转。这是个浮动（absolute）的
TBRL_OUTER.id = "TBRL_OUTER";

for (var i=0; bodyChildNodes.length>0 ;) 
  TBRL_OUTER.appendChild( bodyChildNodes[i] );

TBRL_OUTER.style =`
    transform: rotate(90deg);
    transform-origin: top left;
    position: absolute;
    top: 0;
    left: ${W};
    height: ${W};
    width: ${H}
`;

document.body.appendChild(TBRL_POSITIONER);

document.body.appendChild(TBRL_OUTER);

//================== 取消刚刚设置的body宽度 ===============

document.body.style.width = ''; 
// ==========================================
styleTag.textContent += `
    html, body {
        overflow: auto !important;
        overflow-y: auto !important;
        overflow-x: auto !important;
    }
`
  
// =============== 滚到最右边=========
window.scrollTo( 99999990, 0 );


// TODO 鼠标滚轮互换

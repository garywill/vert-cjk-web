
var scriptTags = document.querySelectorAll("script");

for (var i=scriptTags.length-1 ; i>=0 ; i--)
    scriptTags[i].parentNode.removeChild(scriptTags[i]);

var allHtml = document.documentElement.innerHTML;
document.documentElement.innerHTML = "";
document.documentElement.innerHTML = allHtml;

// document.body.innerHTML = document.body.innerHTML;

var TBRL_POSITIONER = document.createElement("div"); // 用于作为body下定形的
TBRL_POSITIONER.id = "TBRL_POSITIONER";

var W = getComputedStyle(document.body).height; // 原高 转后的宽
var H = getComputedStyle(document.body).width; // 原宽 转后的高
TBRL_POSITIONER.style.width = W;
TBRL_POSITIONER.style.height = H;


var bodyChildNodes = document.body.childNodes

var TBRL_OUTER=document.createElement("div"); // 原本body的子元素都放进这里再旋转。这是个浮动（absolute）的
TBRL_OUTER.id = "TBRL_OUTER";

for (var i=bodyChildNodes.length-1 ; i>=0 ; i--) 
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




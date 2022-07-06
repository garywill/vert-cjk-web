将网页显示成 如 亚洲中华文化圈 传统书写方式 那样的 竖排排版。

Make webs render in vertical lined layout, like traditional CJK writing method in east asian culture circle.

另外，推荐 [汉字关联关系可视化工具 暨 汉字字符合法性检测](https://github.com/garywill/cc-visualize)

## 使用

1. 安装
   - [AMO Firefox Addon](https://addons.mozilla.org/firefox/addon/vertical-ize-cjk-lines/)
   - 或，在Firefox/Chrome的addon dev模式中load进去
2. 打开一个网页
3. 点工具栏上的按钮，开始竖排阅读
4. 使用`鼠标滚轮`右左滚动，使用`shift+鼠标滚轮`上下滚动
5. 有新内容通过ajax加载，或导航至新页面后，可再点工具栏按钮

> Use on your own risk!

## 效果及兼容性

网页兼容性约85%。文字选择可用。可缩放

原网页的js建立的交互性、链接点击、表单提交有极少量的损失（因`<iframe>` 及其 sandbox）

这个项目目前位于poc阶段

![](screenshots/李東垣-维基百科.webp)

更多截图见`screenshots/`

## Sample links

安装好后，可以点开以下sample links，点击工具栏按钮开始享受竖排阅读

- **纯中文**
  
  试试用纵书读经是什么感觉：[《金剛經》](https://zh.wikisource.org/wiki/%E9%87%91%E5%89%9B%E8%88%AC%E8%8B%A5%E6%B3%A2%E7%BE%85%E8%9C%9C%E7%B6%93_(%E9%B3%A9%E6%91%A9%E7%BE%85%E4%BB%80)#%E6%AD%A3%E6%96%87)|[《道德經》](https://zh.wikisource.org/wiki/%E8%80%81%E5%AD%90_(%E6%A0%A1%E8%A9%81%E7%89%88)#%E9%81%93%E7%B6%93)
  
  读诗呢：[《夢遊天姥吟留別》](https://zh.wikisource.org/wiki/%E5%A4%A2%E9%81%8A%E5%A4%A9%E5%A7%A5%E5%90%9F%E7%95%99%E5%88%A5)|[《琵琶行》](https://zh.wikisource.org/wiki/%E7%90%B5%E7%90%B6%E8%A1%8C)
  
  直接来维基大典看文言文：[　漢　](https://zh-classical.wikipedia.org/wiki/%E6%BC%A2)

- **中西混合**：[Mozilla基金会](https://zh.wikipedia.org/wiki/Mozilla%E5%9F%BA%E9%87%91%E6%9C%83)

- **日文**：[　唐　](https://ja.wikipedia.org/wiki/%E5%94%90)

- **韩文**
  
  朝鲜文字与汉字混合：[《易經》](https://ko.wikisource.org/wiki/%EC%97%AD%EA%B2%BD#%E7%AC%AC%E4%B8%80%E5%8D%A6_%E4%B9%BE)
  
  纯朝鲜文字：[하계 올림픽](https://ko.wikipedia.org/wiki/%ED%95%98%EA%B3%84_%EC%98%AC%EB%A6%BC%ED%94%BD)

  
## 形也

西式橫行，東式漸微。今物便捷，故從古者寡。

古法千萬種，不需盡取。然，古時有妙意、道、哲、法、技，而爲今人所遺失者，非不痛哉。當力存之，並正解之，莫令不復。（莫非今之誰人貢高，臆斷古人皆笨耶？）

如何之爲存？**以神爲主，以形作從**。

何爲其「神」者？民知曉且正解其道、理、義、用、辨也。

何謂「形」者？書、文、字者，媒也。**今獻此右起縱書豎排排版，形也**，仿古玩物，略顯古形於今人眼前一二然。

神形俱存者，存。神存形易者，雖次亦存。若神失而形存者，非存也。亦當曉之。

> 人话：本品不能代替择道本身所需的判断取舍能力，及之后的阅读理解文籍的能力

## 原理

> 也欢迎开issue探讨

### 当前方案

简要描述：

1. 使用`<iframe>`装载原网页

2. 使用CSS`transform`的`rotate`把整个`<iframe>`旋转

3. 使用已旋转过CJK的自定义字体
   
   > 目前是FontForge中乱炖一通出来的。不懂字体，欢迎指正

4. 旋转图片

### 其他方案

尝试过和想过其他方案。有些失败。欢迎探讨

#### 正经方案

- 让浏览器原生支持。等个大神出现改Firefox/Chromium源代码。若能说动浏览器商我们就完成任务了

- 使用CSS现有的[`writing-mode: vertical-rl`](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode)（支持不全）。但这需要整个网页开始设计时就考虑。现有网页只能重新设计

#### 不正经方案

- 使用旋转CJK的字体和旋转图片后，用canvas或Headless browser等方案对原网页进行实时截图，然后旋转展示截到的图给用户。
  
  这样可以避免影响原网页，但鼠标如何与内容交互需要一个方案

- 避免使用自己的ttf：
  
  遍历每个文本节点，把每个CJK加`<span>`后单独旋转

- 在Firefox的Browser Toolbox（非web toolbox）中将
  
  ```
  html#main-window body hbox#browser vbox#appcontent tabbox#tabbrowser-tabbox tabpanels#tabbrowser-tabpanels.plain hbox#panel-1-92.browserSidebarContainer vbox.browserContainer stack.browserStack browser
  ```
  
  旋转。失败，Firefox崩溃

- 旋转屏幕，系统有这种设置。有些Linux WM据说可以旋转一个窗口

## 其他竖排阅读软件

- Vivaldi的阅读模式支持竖排

移动端支持字定义字体，且支持竖排阅读的APP：

- [静读天下](https://www.moondownload.com/chinese.html)

- [讀書尚友](https://play.google.com/store/apps/details?id=info.ebstudio.bookviewer.free) by 青空文庫ビューア （[官网](http://ebstudio.info)）。支持[iOS](https://apps.apple.com/jp/app/id1579254502)

> 欢迎补充

## 其他传统中华文字相关项目

- [一些篆书字体收集](https://gitlab.com/garywill/cc-resources/-/releases)

- [全文繁简字对应关系可视化工具](https://github.com/garywill/cc-visualize)

- [**大术专搜**](https://github.com/garywill/BigSearch/blob/master/src/README_zh.md)（一个搜索、查询工具）中收集的汉语工具部分

## 玩而后赏

子曰，玩而予赏，善莫大焉？<br>
又曰，玩而不赏，良心安焉？<br>
老夫谢过！<br>
<a target="_blank" href="https://github.com/garywill/receiving/blob/master/receiving_methods.md"><img src="https://gitlab.com/garywill/receiving/raw/master/receivingcode.png" alt="打赏链接" width="450"></a><br>
虽然，小小玩意，不足挂齿；<br>
亦是，卅年老刀，献丑于此。<br>
其实，多赏非求，少许亦可。<br>
进者，[参观主页](https://garywill.github.io)，玩物更多。

学习笔记
### HTML

DTD 是 SGML 规定的定义它的子集的一种文档的格式。HTML一开始的设计是SGML的子集，所以它有相应的DTD url。
DTD 中会有实体定义，如下的实体字符：   
一些特殊字符：   
'&nbsp;':
 实体空格，表示不会换行的空格，如果在两个词之间用了'&nbsp;'会导致这两个词被认成一个词。所以不推荐使用'&nbsp'来处理多个空格，可以使用css white-space属性来处理多空格的显示。    
'&quot': '"' (在属性里直接'"'会报错)   
 '&amp': '&'   
 '&lt': '''   
 '&gt': '''
 '&#161': 


 ### 语义化标签
'aside': 侧边栏
'main': 页面的主体内容，一个页面只有一个
'artical': 文章
'nav': 导航栏
'footer': 底部栏
'hgroup': 标题组
'h1': 主标题
'h2': 副标题
'figure':
'figcaption': 图片说明
'ol': 有序列表
'ul': 无序列表
注：(列表的有序和无序只是在于语义上，要想在样式上做区别，最好通过css样式来做)   
'abbr': 缩写
'dfn': 表示对某个词的定义
'pre': 表示预先调整好格式的文本   
'code': 表示里面的文本是代码
'strong': 表示这个词很重要，没有重音，即不改变语义
'em': 辅助的语气表示，重音

### 浏览器 API
#### DOM 

1. 节点
所有挂在 DOM 树上的都是Node，但node不一定都是element，不过node中80%-90%都是element   
* Element:元素型节点，跟标签相对应
  * HTMLElement
  * SVGElement
* Document: 文本根节点
* CharacterData: 字符数据
  * Text: 文本节点
  * Comment: 注释
  * processingInstruction: 处理信息
* DocumentFragment: 文档片段
* DocumentType: 文档类型

2. 导航类操作(允许我们在DOM树上自由的移动)
  * 节点导航(Node，找到的都是节点，有可能会是空白节点)
    * parentNode
    * childNodes
    * firstChild
    * nextSibling
    * previousSibling
  * 元素导航(Element,找到的都是元素)
    * parentElement
    * children
    * firstElementChild
    * lastElementChild
    * nextElementSibling
    * previousElementSibling

3. 修改操作
  * 添加：
    * appendChild
    * insertBefore
    知识点：appendChild和insertBefore结合可以实现insertAfter，所以没有insterAfter API   
  * 移除：
    * removeChild
    * replaceChild
    知识点，要移除一个节点，需要在他的父元素上操作，所以移除的 API 为removeChild，replaceChild可以替换节点。   
  
4. 高级操作
  * compareDocumentPosition: 是一个用于比较两个节点中关系的函数   
  * contains: 检查一个节点是否包含另一个节点的函数   
  * isEqualNode: 检查两个节点是否完全相同    
  * isSameNode:检查两个节点是否是同一个节点，实际上在js中可以用'==='   
  * cloneNode 复制一个节点，如果传入参数为 true，则会连同子元素做深拷贝   
#### 事件
addEventListener   
冒泡和捕获其实在浏览器处理事件的过程都会触发，先进入捕获阶段，之后进入冒泡阶段。
与监听了什么阶段无关。   
另外，如果一个元素上绑定了多个事件，则后绑定的后触发。   

### Range API
**操作半个节点，或批量节点**就需要 Range API。是对 DOM 的更精确的操作。
题：把一个元素的所有子元素逆序：比如子元素为1,2,3,4,5，需要调整为5,4,3,2,1。
用节点API需要操作四次。有两个知识点：
1. DOM cllection 是一个 living collection，操作时，剩下的DOM的几何会跟着操作变化。   
2. insert时，不需要将其从原来的位置挪掉。
* 创建 range
range: 可以理解为HTML文档里面有起始点和终止点的一个范围。   
起点只需要先于终点即可。不需要管节点的层级关系。   
起止点都是由一个element和一个偏移值决定的。**对于element来说，偏移值是children**，**对于text来说偏移值是文字的个数**。
故range不一定包含了完整的节点，它可以包含半个节点。   
创建range:      
```
let range=new Range();
range.setStart(element,9);
range.setEnd(element,11); // 通过指定start、end的方式创建
let range2=document.getSelection().getRangeAt(0); // 通过selection的方式创建
```
更快捷的方式：   
```
range.setStartBefore(); // 将起点设置在某个节点之前   
range.setEndBefore();  // 将终点设在某个节点之前   
range.setStartAfter();  // 将起点设置某个节点之后   
range.setEndAfter();  // 将重点设置在某个节点之后   
range.selectNode();  // 设置为某个节点
range.selectNodeContents();  // 将range设置为某个节点的内容
```
* 操作 range
  *  range.extractContents(); // 将这个 range 选取的内容从 dom 树上摘下来
  * range.insertNode();  // 向 range 中添加节点

注：range.extractContents()还可以移除半个标签，当移除了结束标签时，dom会自动补一个结束标签。

Rang API：能更精确的操作 DOM 树，性能也更好。但应用场景没有节点 API 多。
知识点：BOM: 浏览器对象模型

### CSSOM css 对象模型
1. document.styleSheets
link 标签和 style 标签都会创建 styleSheet
API:
```
document.styleSheets[0].cssRules // 只读
document.styleSheets[0].insertRule("p { color:pink;}", 0) // insertRult
document.styleSheets[0].removeRule(0) // removeRule
```
Rule:   
  * CSSStyleRule
  * CSSCharsetRule
  * CSSImportRule
  * CSSMediaRule
  * CSSFontFaceRule
  * CSSPageRule
  * CSSNameSpaceRule
  * CSSKeyframesRule
  * CSSKeyframeRule
  * CSSSuportsRule

CSSStyleRule: 包含多个属性，其中有：   
   * style
   * selectorText
通过CSSOM修改样式可以修改到伪元素的样式。而通过DOM节点来修改css是不能选到伪元素的。

2. window.getComputedStyle(elt,pseudoElt)
elt: 想要获取的元素
pseudoElt: 伪元素
该API能取到页面上的元素最终真实渲染时所需的css属性。而且可以取到伪元素的css属性。
```
window.getComputedStyle(document.getElementById('a'),'::bfore') // id为'a'的元素的伪元素::before
```

### CSSOM View
* window
  * window.innerWidth window.innerHeight  浏览器实际上渲染区域的宽高
  * window.outerWidth window.outerHeight  包含了浏览器自带的工具栏等空间，指浏览器总共占的尺寸
  * window.devicePixelRatio 屏幕的物理像素与代码中的px像素的比值   
  * window.screen 屏幕相关
    * window.screen.width // 屏幕宽
    * window.screen.height // 屏幕高
    * window.screen.availWidth  // 可以使用的宽
    * window.screen.availHeight // 可以使用的高
  * window 操作相关：  
    * window.open("about:blank", "blank", "width=100,height=100,left=100, right=100") 分别指新窗口的宽高、在屏幕上的位置。（此时screen属性是有用的）
    * moveTo(x,y)
    * moveBy(x,y)
    * resizeTo(x,y)
    * resizeBy(x,y)
    若一个窗口是自己创建出来的，则可以调用上面的方法移动位置或改变尺寸   

* scoll

scroll 元素：   
当前滚动到的位置：
  * scrollTop
  * scrollLeft
可滚动的最大的宽高：
  * scrollWidth
  * scrollHeight
滚动操作：
  * scroll(x,y)
  * scrollBy(x,y) // 在当前基础上滚动一个差值
  * scrollIntoView() // 每个元素都有的API，可以将该元素滚到屏幕的可见区域

window:   
  * scrollX
  * scrollY
  * scroll(x,y)
  * scrollBy(x,y)

以上API只有在有滚动条时才有效   

* layout
* getClientReacts 有些元素可以生成多个盒(伪元素也会参与到获取生成盒的ApI)
* getBoundingClientReact 一定只会去到一个盒

### 其他浏览器 API

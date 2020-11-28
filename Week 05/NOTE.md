学习笔记

### 1. proxy 基本使用   
要想让一个对象既可以被设置，又可以被监听，可以使用 proxy    
proxy 中的钩子除了 set get 之外，还有很多原生的操作或者内置函数对对象的操作，proxy 都提供了拦截它并且改变它行为的东西   
proxy set 与 setter的区别：它可以监听对象中本来不存在的属性的设置   
可以理解为，po 对象的上所有行为都是可以被重新去指定的，所以使用 proxy 之后，对象行为的可预测性会降低   

### 2. proxy 实现 reactive   
双向绑定：   
DOM 依赖的的值改变时会改变 DOM 元素的 value。（需要找出来其所依赖对象的哪些属性，在设置该属性的值时去改变 DOM 的 value）
DOM触发事件时可以改变 其依赖的值。（直接在事件监听里设置对象的值就可以）

第二点好实现。第一点的难度有两个：   
* 找出来 DOM 依赖哪些属性
* 在属性值改变时，需要同时设置 DOM 的 value (可以利用上节课中的 proxy 来拦截 set来实现)

主要的关键点是effect函数: 可以在 effect 函数中传入一个回调函数，该回调函数中可以去写 DOM 依赖 data 属性的逻辑。在set时，当相关的属性变化时，去调用这些回调函数    
那么effect需要检测传入的回调函数都依赖了哪些对象及其属性，可以先调用一下 callback，其所依赖的属性就可以在会在 proxy对象 po 中的 get 中被拦截 (这一条很关键，很有意思),然后在 get 里去将其所依赖的对象及属性保存至 usedreactivties (Map 对象) 里     
为了在 set 中准确对应上每个属性所相关的回调函数，需要一个数据结构：将每个被依赖过的属性的回调函数都保存起来即 callbacks: 对象-->属性-->该属性的回调函数   
所以 effet 做了两件事：
通过点用一次 callback 获取到回调函数所依赖的属性，保存到 usedreactivties 中   
根据 usedreactivties，将其所依赖的属性以及回调函数对应起来，保存在 callbacks 中。供 set 中查找属性的回调函数，以调用。   
一个注意点：当对象的属性也是对象时，直接设置内层对象的属性是不能被拦截的，所以在 get中，如果发现该属性对应的值是对象时，需要将该对象也包裹成一个 proxy 对象

### 3. Range 和 CSSOM 实现拖拽   
Range 接口表示一个节点或文本节点一部分的文档片段。可以使用 document.creatRange去创建一个 Range 对象。   
一个 Range1 一旦建立，在使用它的大多数方法之前，需要去设置它的临界点。   
Range.setStart(startNode,startOffset) 方法用于设置一个 Range 的起始位置。   
如果起始节点类型是 **Text 、Comment 或 CDATASection**之一，startOffset 指的是从起始节点开始**字符**的偏移量。对于其他 **Node** 类型节点，startOffset 指从起始节点开始**子节点**的偏移量。   
range.setEnd(endNode, endOffset) 方法用于设置一个 Range 的终止位置。偏移量同上。   
range.getBoundingClientRect() 返回一个对象，该对象是一个将范围内所有元素的边界矩形包围起来的矩形，使用该 API 可以获取距当前鼠标最近的一个 Range。以获取能拖拽的空位。   
在计算最小距离的逻辑中涉及到一个 Infinity 的数字类型：表示超出js数字范围的数 Infinity 为大于最大范围的数，-Infinity 为小于最小范围的数。   
Range.insertNode： 向 range 中插入一个节点，默认会将该 range 中之前的内容移除。该 API 可以将拖拽元素插入文档流中。   
知识点：selectstart 事件：在用户开始一个新的选择时候触发，阻止该事件可以防止在拖动 dragbale 时触发文字的选中事件。
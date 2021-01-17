学习笔记
### 盒模型
盒：排版时所用的基本单位  
对排版有影响的属性：    
1. content   
2. padding：内边距
3. border
4. margin：外边距
5. box-sizing:   
  content-box: width 属性只占用 content 的宽度   
  border-box: width 属性占用 content+padding+border 的宽度    

### 正常流
需要排版的元素：   
a. 盒   
b. 文字   

如何写字？   
1. 从左向右书写
2. 同一行文字应该对齐
3. 一行写满，换到下一行

正常流与平时的书写习惯类似。   
1. 收集盒和文字进行
2. 计算盒和文字在行内的排布
3. 计算行的排布

当盒和文字在一个行中时，盒和文字是有对齐规则的。
inline-level-box: 行内级别的盒
block-level-box：块级盒
line-box: 文字和inline-level-box排出的行
正常流是由：line-box(从左向右排布) 和 block-level-box(从上往下排布)组成。
BFC: 块级格式化上下文 
IFC: 行内格式化上下文

### 正常流的行级排布
文字在字体里的定义   
base-line：以英文为主，用来对齐   
text-top,text-bottom：文字的上下缘   
字体大小不变，则text-top和text-bottom是不会变的；如果文字字体是混排的，则这两个属性以最大的文字为主   

行高大于文字的高度时：还会有 line-top line-bottom 两个属性影响到行的布局   

当盒的高度比较大时，会把行撑开，所以盒的顺序和尺寸会影响到 line-top 和 line-bottom，但它不会影响 text-top 和 text-bottom.  

### 正常流的块级排布
1. float和clear机制:   
float 会影响其所在的行盒的尺寸   
多个 float 元素会相互影响，产生堆叠。    
clear 可以找出一块干净的空间，去排列 float 元素 (可以实现换行)   

2. margin 堆叠   
只有正常流里的 BFC 才会有 margin 折叠。flex-box 以及 grid、IFC 都没有这种现象。
因为 margin 实际上指的是盒周围的留白，只要实现了留白就够了，所以 margin 折叠也是符合正常排版的要求的。    

### BFC 合并
1. 三个概念：   
  * Block Container: 里面有 BFC 的。（能容纳正常流的盒，里面就有 BFC）
  * Block-level Box 外面有 BFC 的。（能放到 BFC 中去的盒）
  * Block Box=Block Container + Block-level Box (里外都有BFC)

Block Container:(能容纳正常流的盒)   
  * block   
  * inline-block   
  * table-cell   
  * flex-item   
  * grid-cell   
  * table-caption 

Block-level Box:
  * block 
  * flex
  * grid
  * table

BFC:   
  * float (脱离文档流)  
  * position:absolute (脱离文档流)     
  * block container (block inline-block table-cell flex-item grid-cell...)   
  * blocks with 'overflow' other than 'visible'    

BFC 合并：   
发生条件：Block box && overflow:visible  (里外都是 BFC 且 overflow 是 visible)   
产生的影响：   
  * BFC 合并与 float   
  * BFC 合并与 margin 折叠   

### Flex
* 收集盒进行
* 计算盒在主轴方向的排布
*   * 根据主轴尺寸将盒分进行
*   * 根据有无 no-wrpa 属性，判断是否要将 flex-item 强行放进一行
* 计算盒在交叉轴方向的排布

### 动画
css 控制表现：   
位置与尺寸信息   
绘制与渲染信息   
交互与动画  

animation属性：   
  * animation-name:动画名字
  * animation-duration: 动画的时长   
  * animation-timing-function: 动画的时间曲线   
  * animation-delay: 动画开始前的延迟   
  * animation-iteration-count: 动画的播放次数   
  * animation-direction: 动画的方向   

transition:    
  * transition-property:要变换的属性
  * transition-duration:变换的时长
  * transition-timing-function: 时间曲线
  * transition-delay: 延迟

三次贝塞尔曲线：     
  * 横轴：时间
  * 纵轴：效果的变化
  ease:最自然的变化曲线   
  liner:直线   
  ease-in:缓动进入   
  ease-out:缓动退出    
  ease-in-out:缓动进入缓动退出

### 渲染与颜色
CMYK RGB
  * CMYK：青色、红色、黄色、黑色，印刷色，是依靠反光的色彩模式   
  * RGB：根据颜色发光的原理来设计   

HSL HSV   
  * H:色相
  * S:纯度
  * L:亮度 L最大时是白色，最小时是黑色
  * V:明度 V到最大值时是最亮的纯色

使用 HSL和HSV的话，可以结合css变量，去改变H，能实现颜色的变换。    

### 绘制
绘制：   
几何图形：   
border
box-shadow
border-radius
文字：   
font
text-decoration
位图：   
background-image
绘制实际上依赖了图形库：
手机上可能是：Skia
windows上是：GDI
更底层的都是：Shader     
GDI是Graphics Device Interface的缩写，含义是图形设备接口，它的主要任务是负责系统与绘图程序之间的信息交换，处理所有Windows程序的图形输出。
在Windows操作系统下，绝大多数具备图形界面的应用程序都离不开GDI，我们利用GDI所提供的众多函数就可以方便的在屏幕、打印机及其它输出设备上输出图形，文本等操作。   
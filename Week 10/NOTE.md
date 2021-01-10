学习笔记
得到一个带位置的 DOM 树
### 根据浏览器属性进行排版
排版技术：   
* 正常流
* flex 布局
* grid 布局

**排版方向：**   
主轴：排版时主要的延伸方向   
交叉轴：与主轴垂直的方向   

根据 flex-direction 来确定主轴和交叉轴     
主轴为 x:   
```
flex-direction:row;
Main:width,x,left,right;
Cross:height,y,top,bottom

```
主轴为 y:
```
flex-direction:row;
Main:height,y,top,bottom
Cross:width,x,left,right;
```
样式预处理知识点：   
* order 属性决定 flex-item 的排列先后顺序，故在预处理阶段要先根据 order 属性对子元素进行排序。   
* 根据 flex-direction 和 flex-wrap 计算出主轴和交叉轴相关的属性(即 Main 和 Cross)   

### 收集元素进行
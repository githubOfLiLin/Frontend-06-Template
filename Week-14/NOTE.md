学习笔记
### 组件化
组件：与 UI强相关的，既是组件又是模块。
特点：可以以树形结构进行组合，且具有模版的配置化的能力。
1. 组件与对象：
* 对象：
  * property
  * method
  * inherit
* 组件
  * property 属性
  * method 方法
  * inherit 继承
  * attribut 特性
  * config & state 配置和状态 (配置是指通过构造函数传进去的)
  * event 事件
  * lifecycle 生命周期
  * children 子节点

2. Attribute 和 Property
英文解释上：
Attribute: 强调描述性
Property: 强掉从属关系
使用上：
Attribute：HTML 里定义的
Property：与对象的属性相似
``` html
<!-- 设置类名时可以使用 Attribut class -->
  <div class="div1"></div>
  <script>
    const div1 = document.getElementsByClassName('div1')[0];
    console.log(div1.className);
// 但通过 property读取时，因为 class 是关键字，所以用的是 className
```

``` html
<!-- style: 通过 Attribut 设置的时候可以是字符串 -->
  <div class="div1" style="background-color: khaki;"></div>
  <script>
    const div1 = document.getElementsByClassName('div1')[0];
    console.log(div1.style); // 通过 property 得到的是语义化后的对象 
  </script>
```
```  html
 <!-- href: 通过 Attribut 设置 -->
  <a href="//m.taobao.com"></a>
  <script>
    const a = document.getElementsByTagName('a')[0];
    console.log(a.href);  // 通过 property 读取: file://m.taobao.com/ 经过resolve的url(会在'//'前加上http或https)
    console.log(a.getAttribute('href')); // m.taobao.com 与  html 上设置的一样
  </script>
```
``` html
<!-- input value: Attribute 相当于只是一个默认值-->
  <input value="cute">
  <script>
    const input = document.getElementsByTagName('input')[0];
    console.log(input.value); // cute
    console.log(input.getAttribute('value')); // cute
    input.value = 'new cute';
    console.log(input.value); // new cute
    console.log(input.getAttribute('value')); // cute 设置过 input 的 value，Property 会变，但是 Attribute 不会变
  </script>
```
综：Attribute 和 Property 在程序里都可以访问到，但值可能不一样     

3. 生命周期
created
mount 组件创建后有没有被显示出来 挂载
unmount 卸载 在一个生命周期中可以多次被 unmount和mount
update 更新
destroyed 销毁

4. Children
content 型 Children 有什么就是什么
Template 型 Children 充当一个模版
``` html
<!-- content -->
<my-button><img/> </my-button>
<!-- Template -->
<my-list data="[1,2,3]">
  <my-li-item><my-li-item/>
</my-list>
```
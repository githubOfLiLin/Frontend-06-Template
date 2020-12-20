学习笔记
### 表达式
表达式是由操作符构成，并产生结果的语法结构。   
--语法树和运算符的关系   
--运算符左值和右值的区别   
1. 运算符的优先级会影响语法树的构成。
运算符优先级(依次为优先级从高到低)：
* Member
  * a.b
  * a[b]
  * foo`str`
  * super.a
  * super['a']
  * new.target
  * new Foo() (注：带括号的 new 的优先级与 Member 是一级)

知识点：   
new.target 指当前作用在哪个构造函数上。若没有通过 new 调用函数，则返回 undefined，否则返回当前构造函数。    
子类继承父类时，new.target 返回子类的构造函数。如下：
```
class Parent {
constructor(){
console.log(new.target.name);
}
}

class Child extends Parent{
constructor(){
super();
}
}

new Child();

//  Child
```

* New
  * new Foo   (注：不带括号的 new 是单独的一个优先级)

知识点：带括号的 new 的优先级比不带括号的优先级高。

```
new  a()();  // a 后面的括号是函数调用还是 new 运算的函数呢 答案：先计算 new a()    
new new a(); //  括号是与第一个 new  结合还是与第二个 new 结合  答案：与第二个 new 结合
```

知识点：运行时设施：引用类型（该引用类型并非基本类型中的引用类型，而是存在于运行时的类型，故称作做标准中的类型而非语言中的类型）     
Reference    
  * Object
  * key
包括一个对象和一个 key，是在运行时，a.b 取出来的并非一个值而是一个引用类型 Reference，进行正常操作的时候会进行解引用。     
delete 和 assign(对一个对象的属性赋值的操作 如：a.b=x) 两个操作就需要用到引用类型，即他们需要知道删除、需赋值的是哪一个对象的哪一个 key   

* Call
  * foo()
  * super()
  * foo()['b']
  * foo().b
  * foo()`abc`

  对于后面三个，如果前面是函数调用，则函数哦调用的优先级高。所以优先级又取决于语法结构。
  example:    
  ```
  new a()['b'] // 先执行 new a() 之后取属性 b
  ``` 

知识点：左手运算和右手运算   
example：
```
a.b='s'; 
a+b=c; // error a+b 是右手运算，不能放在左边
```
根据能不能放到等号左边定义是否是左手运算。

* 单目运算符
  * delete
  * void
  * typeof
  * +
  * -
  * ~
  * !
  * await
* '**' 乘方 （右结合）
```
2**(3**2) 
```  
* 
/*+-
移位运算:  << >> >>>(无符号移位) 
关系运算符：< > <= >=   
instanceof 
in
* 等号与位运算
== != === !==
位运算 & | 
* 逻辑运算与三目运算
逻辑运算：&& ||
三目运算：?:
###  类型转换

相加：
两个都是数字
两个都是字符串
一个是boolean

== 类型转换
类型相同直接比较
类型不同，则先转换为 number 再比较

object.key 中的key也会进行类型转换

number和boolean之间的转换：
0=>false
其他值转为true

对象装箱和开箱操作
装箱：
new Number()、new String() (注：只有前面加 new 才会返回一个对象，如果直接调用 Number()则返回一个数字)
1.toString()  会隐式的进行装箱转换，把1转换为Number对象,调用其Number对象的toString方法    
class 体内部的代码总是在严格模式下执行，所以当调用 class 静态或原型方法时没有指定 this 的值，那么方法内的 this 值将被置为 undefined。

```
class Animal {
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}

let obj = new Animal();
obj.speak(); // Animal {}
let speak = obj.speak;
speak(); // undefined

Animal.eat() // class Animal
let eat = Animal.eat;
eat(); // undefined
```

如果上述代码通过传统的基于函数的语法来实现，那么依据初始的 this 值，在非严格模式下方法调用会发生自动装箱。若初始值是 undefined，this 值会被设为全局对象。


### 运行时

需要一种数据结构来存储语句完成的结果：Completion Record (运行时数据结构)    
  * [[type]]: 语句的类型  nomarl, break, continue, return, throw...  (自语句的穿透力比较强时，可以改变父语句的类型，比如在 if 语句中 return)
  * [[value]]: 返回值 (基本类型)
  * [[target]]: label 在语句的前面加一个标识符和冒号（比如  break 和 continue 会用到  label）

###  简单语句和复合语句
简单语句:    
* 表达式语句: 表达式加分号；
* 空语句: 单独一个分号；
* debugger语句: debugger关键字加分号，用于调试。
ThrowStatement: 抛出异常
ContinueStatement: 只结束本次循环后面的过程，还会继续执行下一次的循环
BreakStatement: 结束整个循环
ReturnStatement

复合语句：   
* BlockStatement: 一对花括号加一系列语句列表
* IfStatement: 分支语句
* SwitchStatement: 多分支语句 (每一个 case 后面需要加 break )
* 循环语句
  * while(){}
  * do {} while()
  * for( ; ; ){}
  * for( in ){}
  * for( of ){}

* WithStatement: with 打开一个对象，可以将该对象的所有属性放到作用域中.在写法上可以节约一些空间，但不可控制性也很高，不建议使用。
* LabelStatement: 在一个语句前加一个label，可以给任何语句用，但真正有效的是在循环语句中使用。带 label 的 break可以跳出多层循环。   
* TryStatement: try catch (注：即使在 try 中 return，finally 仍然会执行)

### 声明
FunctionDeclaration      
GereratorDeclaration     
AsyncFunnctionDeclaration     
AsyncGereratorDeclaration    
VariableDeclaration:普通变量声明     
ClassDeclaration      
LexicalDeclaration: let、const     

class、const、let: 在声明之前使用会报错，函数声明和类声明之间的一个重要区别在于, 函数声明会提升，类声明不会。   
function、function*、 async function、async function*、var: 可在声明之前使用，且没有块级作用域，只有全局作用域函数作用域。   

在块级作用域内，let 声明的变量，创建被提升，但初始化没有被提升，在初始化之前被使用，就会形成暂时性死区，报错。    
var 声明的变量只有函数作用域和全局作用域的区别，没有块级作用域。且 var声明的变量会提升变量的创建和初始化(初始化为undefined)，所以可以声明之前使用。   
function的创建、初始化和赋值均会被提升。若function的声明的函数名与var声明的变量名重复，function会覆盖变量声明。   
先看作用域：全局作用域、函数作用域、块级作用域     
后看声明方式：var、let、function      

### JS 函数调用

闭包，模块、私有变量




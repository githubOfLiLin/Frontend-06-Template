学习笔记

浏览器渲染：从一个URL得到一张图片，最后显示在屏幕上。   
1. http请求，解析响应
2. 解析 html，变成DOM树
3. css computing
4. DOM width css
5. layout -> DOM width position 得到DOM的节点的盒的位置
6. render
7. BitMap  位图

### 有限状态机处理字符串 
* 每一个状态都是一个机器
  * 在每一个机器里，我们可以做计算、存储、输出...
  * 所有这些机器接受的输入都是一致的
  * 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，他应该是**纯函数**
* 每一个机器知道下一个状态，有以下两种类型的状态机
  * 每个机器都有确定的下一个状态  (Moore)
  * 每个机器根据输入决定下一个状态  (Mealy，更加实用)

函数是一个状态机，函数的参数是输入，返回值是下一个状态。
```
function state(input){
  // 在函数中可以自由编写处理每个状态的逻辑
  // 返回值作为下一个状态
  // 所以返回值需要是一个状态函数
  return next;  
}
// 调用
while(input){
  state=state(input);
}
```

### http 解析
* TCP
  * 流：以流作为数据传输的方式
  * 端口：以端口区分计算机上的每个应用
  * require('net'):node 中 TCP 对应的包
  * 包：
  * IP 地址：包传输的地址
  * libnet/libpcap: c++库，libnet 构建IP包并发送，libpcap 从网卡抓流经网卡的 ip 包
* HTTP
  * Request
  * Response

相对于 TCP 的全双工模式（TCP 是可以互相发的），HTTP只能由客户端先发一个请求，服务端才会给一个响应。一个请求对应一个响应。    

HTTP 协议是文本型协议，相对于二进制协议，HTTP 传输的是字符（unicode或ASIII编码）。    
HTTP请求三部分：    
* Request Line: Method path 协议及版本 eg:POST /HTTP/1.1
* Header
* Body

知识点：所有http中的换行都是 \r\n   
HTTP 响应三部分：
* status line: HTTP/1.1 200 ok (协议及版本 状态码 状态文本)
* headers
* body body与header之间有1个空行
chuck body:   
16进制字符    
内容    
0(0表示结尾)    
```
26
<html><body>Hello Word</body></html>
0
```

知识点：nodejs net 模块 net.createConnection()
一个用于创建 net.Socket 的工厂函数，立即使用 socket.connect() 初始化链接，然后返回启动连接的 net.Socket。   
当连接建立之后，在返回的 socket 上将触发一个 'connect' 事件。若制定了最后一个参数 connectListener，则它将会被添加到 'connect' 事件作为一个监听器   



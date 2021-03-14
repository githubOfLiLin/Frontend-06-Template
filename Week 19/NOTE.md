学习笔记
### Nodejs
流 Stream    
1. 可读流：
event.data    
event.close    
2. 可写流：
writable    
writable.write     
write不是同步的操作，是有回调函数的。    
write方法会返回一个 true或者false，true 表示可以写，返回 false 表示这次的 write 是有效的，但是被缓存起来了      
drain:表示已经把调用 write 的内容全写完了。      
writable.end
3. pipe
可以将一个可读流导入到一个可写的流里.   
4. 多文件
需要把文件夹中的多个文件进行压缩   
archiver 在客户端将多个文件压缩   
unzipper 在服务端将客户端传过来的压缩文件解压   
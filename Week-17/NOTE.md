学习笔记
yeoman-generator 自定义脚手架工具
知识点：   
1. npm link
这对于安装您自己的包非常方便，这样您就可以在不需要不断重新构建的情况下迭代地处理和测试它。   
使用 npm link 分为两步过程:   
1) 在被使用的本地包路径下执行 npm link    
npm link 将在全局文件夹 `{prefix}/lib/node_modules/<package>` 中创建一个链接，该链接指向执行 npm link 的包，也会 link 包中所有的 bins 到 `{prefix}/bin/{name}` 中。注意 npm link 使用全局 prefix。      
2) 在要使用本地包的项目下，执行 npm link package-name    
这将创建一个从全局安装的 package-name 到当前项目文件夹的 node _ modules/ 的链接。

这样就可以在另一个项目中测试本地的包了，不需要不断重新构建。   
[使用介绍](https://www.jianshu.com/p/aaa7db89a5b2)

2. webpack
最初设计是为 node 设计的打包工具，将 node 代码处理成可以被浏览器处理的代码。     
多文件合并：通过 loader和plugin进行处理合并规则或转换规则   
需要安装两个包：webpack-cli webpack       
npx       
loader: babel-loader、css-loader    
loader 只是把 test字段规定的文件转换之后 export 出来   

3. babel
是一个独立的工具，Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法    
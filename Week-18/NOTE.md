学习笔记
### 单元测试
1. mocha 用法
知识点：    
describe 主要用于分组，使测试信息更好看     
package.json script 里定义的命令调用的都是本地安装的包      
mocha --require @babel/register 可以允许在测试时使用 export 语法     

2. code coverage
工具：nyc    
nyc 可以用来计算测试的覆盖率，用法：终端运行 nyc +'测试命令'    
单元测试：写覆盖率较全的测试用例可以帮助我们找到代码里的小 bug   
3. 工具链
build webpack   
test mocha   
coverage nyc   
publish 发布   
dev 开发环境运行    
知识点：   
"sourceMaps": true, 调试时可以正确的找到代码行位置



// 全局属性 global
// 还有一些属性  
// exports module require __dirname __filename

// node 实现模块化 (命名冲突 代码方便维护 方便协作 依赖关系)
// 浏览器中实现模块化 var obj  = {a}  不能完全解决命名冲突的  调用过长 单例
// 自执行函数来实现 seajs cmd  requirejs amd (异步)
// commonjs 规范 通过文件读取 (utf8) 实现了模块化
    // 1)文件即模块
    // 2)定义了导出方式 module.exports  exports
    // 3)定义了导入方式 require


// 让字符串执行？ eval / new Function 在浏览器中
let hello = 'zf';
eval('console.log(hello)'); // eval执行 有依赖关系
 
// new Function  PASS
var b = 3;
let str = 'let a = 1; return a+b';
let newFn = new Function('b',str);
console.log(newFn.toString());

// 内置模块 模块 内置／核心    文件模块／自定义模块    第三方模块
let vm = require('vm'); // node中执行字符串 可以采用vm模块
// 他可以提供一个沙箱环境 运行代码  干净的环境
let hello = 'zf';
vm.runInThisContext("console.log('hello')");

// 处理文件路径的 basename extname dirname join  resolve
let path = require('path');
let r = path.basename('1.js','s'); // 给一个不是基础路径的
console.log(r);
// -----
let path = require('path');
let r = path.extname('1.js.txt');
console.log(r);
// -----
let path = require('path');
let r = path.dirname('a/b/c');
console.log(r);
// -----
let path = require('path');
let r = path.join(__dirname,'a/b/c','../','d/e/f');
let r1 = path.resolve('a/b/c','../','d/e/f'); 
// 多了一个当前文件夹的所在路径，resolve方法不能有/
console.log(r,r1);
// __dirname 当前文件所在文件夹的路径 
// __filename 当前文件的绝对路径



// fs模块  file system 各种文件 文件夹 权限
let fs = require('fs');
// 同步读取文件
let buffer = fs.readFileSync('./name.txt','utf8');
console.log(buffer);
try{
    fs.accessSync('./name1.txt')
}catch(e){
    console.log(e);
}
// vm runInthisContext
// path basename extname dirname __dirname __filename
// fs.readFileSync fs.accessSync
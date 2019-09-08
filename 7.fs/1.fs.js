//fs file system 文件操作相关
// http服务 读取文件可以使用绝对路径
let fs = require('fs');
let path = require('path'); // join resolve
// 文件的拷贝
fs.readFile(path.resolve(__dirname,'./name.txt'),(err,data)=>{
    fs.writeFile(path.resolve(__dirname,'./name1.txt'),data,(err)=>{
        console.log('写入成功')
    });
}); // __dirname

// 流 边读边写 （可以控制读取的速率）  流基于事件的
// events on / emit ()



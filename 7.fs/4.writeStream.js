let fs = require('fs'); 
let path = require('path');
// 可写流 有两个方法 write() end();

let ws = fs.createWriteStream(path.resolve(__dirname,'name1.txt'),{
    flags:'w', // 文件不存在会创建一个文件 如果有内容会清空内容
    encoding:'utf8',
    highWaterMark: 5,// 每次我预计写入多少个  16k
    autoClose:true,
    start:0
});
// 我们写入的内容必须 是buffer ／ 字符串
let flag = ws.write(123+'',function(err){
    console.log('写入成功')
}); // 可读流 ＋ 可写流   每次读十个 －》去写入文件 －》先别去读取了
console.log(flag);

// 当我写入完后 在继续写入其他的 on('drain');
// 处理异步 内部创建了空间  [123,'结束']
ws.end('结束');
ws.write(123+''); // write after end 已经结束了 不能在写入了
// 流 几种流 可读流 resquest 可写流 response  双工流  转化流（压缩）
// 可以分段读取 可以控制速率

let fs = require('fs'); // 文件中为了能实现文件的操作 也提供了流相关的api
let path = require('path');
// new ReadStream 返回的是可读流的实例
let rs = fs.createReadStream(path.resolve(__dirname,'name2.txt'),{
    flags:'r', // r w 
    highWaterMark:4, // 64k
    encoding:null,
    autoClose:true, // 读取完毕后 关闭文件吗
    start:0,
    end:5 // slice(start,end) 包含end的
});
// 流 默认流是暂停模式 非流动模式 内部会监控你有没有监听data事件  rs.emit('data',123)
let arr = []; // 异步触发的
rs.on('error',function(err){
    console.log(err);
})
rs.on('data',function(chunk){
    arr.push(chunk);
    console.log(chunk);
    rs.pause(); // 暂停data事件的触发
});
rs.on('end',function(){
    console.log(Buffer.concat(arr).toString()); // 读取完毕
}); 
setTimeout(()=>{
    rs.resume(); // 恢复data事件触发
},1000);


// concat on('data') on('end') Buffer.concat()
// on('error')  resume() pause() 
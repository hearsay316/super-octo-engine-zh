let fs = require('fs');
let path = require('path');
// node 的流 是最复杂的
let r = fs.createReadStream(path.resolve(__dirname,'name.txt'),{
    highWaterMark:3
});
let w = fs.createWriteStream(path.resolve(__dirname,'write.txt'),{
    highWaterMark:1,
});
r.pipe(w); // 把可读流 倒入到 可写流中
function pipe(r,w){
    r.on('data',function(data){
        let flag = w.write(data);
        if(!flag) r.pause();
    });
    // 等待写入完成后 恢复读取
    r.on('end',function(){
        console.log('文件读取完毕');
        w.end();
    });  // readFile 可以读取 64k以下的文件 
}; //  fileReader

//  可读流 on(data) on('end') 可写流 write end     pipe
// express + 视频koa
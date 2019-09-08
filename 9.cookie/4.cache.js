// http缓存 分为两种 强制缓存 （首页没法强制缓存） 对比缓存


let http = require('http');
let mime = require('mime');
let url = require('url');
let path = require('path');
let fs = require('fs');
// 你第一次访问我的时候 我给你设置一个头 last-modified 最后的修改时间 8:00
// 你在请求我的时候 你带上这个时间 8:00   10:00  返回新的文件
http.createServer(function(req,res){
    let {pathname} = url.parse(req.url,true);
    // js文件 css 每次更改了 就重新请求 对比缓存

    // 这个东西 有的文件设置上了 可能回导致内容是老的内容
    // res.setHeader('Cache-Control','max-age=10');
    // res.setHeader('Expires',new Date(Date.now()+10000).toGMTString())

    let abs = path.join(__dirname,pathname);
    fs.stat(path.join(__dirname,pathname),(err,stat)=>{
        if(err){
            res.statusCode = 404;
            res.end('Not Found');
            return;
        }
        if(stat.isFile()){
            let ctime = stat.ctime.toUTCString();
            // if-modiefied-since是浏览器自己携带的，如果服务器设置过last-modified那么下次请求就会带上这个头
            // 缺陷： 如果文件没改呢 时间变了    时间精确到秒  可能会有问题

            if(req.headers['if-modified-since'] ==ctime){
                res.statusCode = 304;
                res.end();
                return
            }
            res.setHeader('Last-Modified',ctime);
            fs.createReadStream(abs).pipe(res);
        }   
    });

}).listen(3000);
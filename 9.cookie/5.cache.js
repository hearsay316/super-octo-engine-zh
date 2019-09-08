let http = require('http');
let mime = require('mime');
let url = require('url');
let path = require('path');
let fs = require('fs');
let crypto = require('crypto');
http.createServer(function(req,res){
    let {pathname} = url.parse(req.url,true);

    let abs = path.join(__dirname,pathname);
    fs.stat(path.join(__dirname,pathname),(err,stat)=>{
        if(err){
            res.statusCode = 404;
            res.end('Not Found');
            return;
        }
        if(stat.isFile()){
            let md5 = crypto.createHash('md5');
            let rs = fs.createReadStream(abs);
            let arr = []; // 你要先 写入相应头在写入响应体
            rs.on('data',function(data){
                md5.update(data);
                arr.push(data);
            });
            // etag的方式比较靠谱 不能对大文件进行etag  文件的大小＋文件的最后修改时间 来组成这个etag
            rs.on('end',function(){
                let etag = md5.digest('base64');  
                // pwa 缓存  离线 网络不通他也可以缓存起来 caches api
                if(req.headers['if-none-match'] === etag){
                    res.statusCode = 304
                    res.end();
                    return 
                }
                res.setHeader('Etag',etag);  
                //If-None-Match浏览器  Etag是一对 服务端 
                res.end(Buffer.concat(arr));
            })
        }   
        // 全部都使用 如果浏览器 访问服务端 会先加一个强制缓存 强制缓存5s
        // 过了5s后 会在发送请求 对比缓存 先判断 last-modified 在判断他etag 如果都成立 返回304  强制缓存5s
        // 如果有变化会在返回新的文件  304  = last-modified+ etag
    });

}).listen(3000);


// vue 打包  vendor.js?asdadasd  取消缓存的 ajax get请求 随机字符串



req.fresh
let http = require('http');
let querystring = require('querystring');
let url = require('url');
let fs = require('mz/fs');
let path = require('path');
let mime = require('mime'); // 第三方模块
// 一般服务端 会处理两种类型 静态的 html css 
// 动态数据 ajax 获取
// 路由 就是根据 不同path 返回不同的内容

// 跨域 协议 主机名字  端口号 有一个不一样 就是跨域

// localStorage sessionStorage cookie session 区别?
// localStorage 本地存储 5m  一直存 不能跨域 存储的地方 是浏览器
// sessionStorage 不关浏览器就存活 
// cookie 浏览 每次请求时 都会带上cookie 做注册登录 (cookie 存放不敏感信息 （密码）) 不安全 不能跨域设置cookie
// 可以 一级域名 和 二级通用  默认最大4k
// session 比较安全 他的内容是存放在服务端上的  （session是基于cookie）
// 目前 注册登录 大致的流程 默认登录后  给你卡号 标示
// 每次请求时 会自动带上cookie 我可以去 通过session找到当前帐号的对应的内容 （内存存在服务器了）
// redis / mongo 存取到数据库中 

// cookie 可以加密 不应该存敏感信息 （加盐）
// cookie 可以前端设置 也可以后端设置 (后端设置 可以设置前端是否能更改)
// 后段设置后 会放到浏览器

// 周六开公开 vuex原理  state / mutation /action / modules 
// 周日上课 cookie + session + express 


class Server{
    async handleRequest(req,res){
        let {pathname} = url.parse(req.url,true); 
        let absPath = path.join(__dirname,pathname); 
        // 先判断是否是用调用的接口  ／user get / post /delete / put
        let method = req.method.toLowerCase();
        // http 无状态的  cookie  xss攻击
        res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500,http://127.0.0.1:4999');
        // 允许的请求方法
        res.setHeader('Access-Control-Allow-Methods','GET,PUT,DELETE,OPTIONS,POST');
        // 允许的跨域头
        res.setHeader('Access-Control-Allow-Headers','Content-Type,token');
        // options的发送间隔
        res.setHeader('Access-Control-Max-age',10);
        // 允许前端访问 携带cookie
        res.setHeader('Access-Control-Allow-Credentials',true);
        if(method === 'options'){ // options不进行处理
            res.end(); // 可以访问我
        }
        console.log(req.headers);
        switch(pathname){
            case '/userList':   
                if(method === 'get'){
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({name:'zf'}));
                }
                if(method === 'put'){
                    res.setHeader('Content-Type','application/json')
                    res.end(JSON.stringify({name:'zf'}));
                }
            return;
        }

        try{
            let statObj = await fs.stat(absPath);
            if(statObj.isDirectory()){
                // localhost:3000/a  /a/index.html
                let realPath = path.join(absPath,'index.html');
                await fs.access(realPath);
                this.sendFile(realPath,res);
            }else{
                // localhost:3000/1.html  1.html
                this.sendFile(absPath,res);
            }
        }catch(e){ // 捕获异常
            console.log(e);
            this.sendError(res,e);
        }
       
    }
    sendFile(absPath,res){ // 发送文件
        res.setHeader('Content-Type',mime.getType(absPath));
        fs.createReadStream(absPath).pipe(res);
    }
    sendError(res,err){ // 发送错误
        res.statusCode = 404;
        res.end(`Not found`);
    }
    start(port){
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(port);
    }
}
let server = new Server();
server.start(3000);



// let server = http.createServer((req,res)=>{
//     let {pathname} = url.parse(req.url,true); // query a=1&b=2 {a:1,b:2}
//     let absPath = path.join(__dirname,pathname); // /
//     fs.stat(absPath,(err,statObj)=>{
//         if(err){
//             res.statusCode = 404;
//             res.end('Not found');
//             return
//         }
//         if(statObj.isFile()){
//             // /1.css => text/css  1.png  img/png
//             res.setHeader('Content-Type',mime.getType(absPath)+';charset=utf-8')
//             fs.createReadStream(absPath).pipe(res);
//             // readfile  readstream.pipe
//         }else{
//             // 如果是文件夹 就去文件夹下找 index.html
//             let realPath = path.join(absPath,'index.html');
//             fs.access(realPath,(err)=>{
//                 if(err){
//                     res.statusCode = 404;
//                     res.end('Not found');
//                     return
//                 }
//                 res.setHeader('Content-Type','text/html;charset=utf-8');
//                 fs.createReadStream(realPath).pipe(res);
//             })
//         }
//     })
//     // fs.access   fs.stat
// });
// server.listen(3000);
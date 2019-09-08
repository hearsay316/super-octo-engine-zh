// 客户端 浏览器
// 服务端 监听发的请求 监听特定的ip 和 端口 65535

let http = require('http');
let querystring = require('querystring');

// 创建服务端 需要提供一个监听函数 ，这个函数只有当请求到来时触发
// 用的时候不要用3000
// 请求分为三部分 1） 请求行 方法 路径 协议
//              2) 请求头 浏览器信息 ＋ 自定义
//              3) 请求提
// request 可读流 response可写流
// 请求体需要on('data')来接收数据

// 响应也分为三部分   1） 相应行 常见的状态码  200 204 206 范围请求 
//                   301 永久重定向 302 临时重定向 304 缓存 
//                   401 没权限 403 无法访问 404 
//                   500 服务端挂了
//                 2)  响应头  --headers
//                 3) 响应体
// createClinet 爬虫
let server = http.createServer(function(request,response){
    // request中存放的内容 
    console.log(request.method); // method 方法名是大写的
    console.log(request.url); // /  端口号 后面的部分 但是没有 hash
    //console.log(request.httpVersion); x
    //console.log(request.headers); // {} 所有的属性名 都是小写的

    // 请求的post方法
    let arr = [];
    request.on('data',function(data){
        arr.push(data);
    });
    request.on('end',function(){ // 不管有没有请求体 都会触发end事件
        // a=b&c=d  => {a:b,c:d}   a=1; b=2
        let str = Buffer.concat(arr).toString();
        // let obj = {};
        // str.replace(/([^=&]*)=([^=&]*)/g,function(){
        //     obj[arguments[1]] = arguments[2]
        // })
        // querystring 用法和 json.parse  json.stringify
        let obj = querystring.parse(str,'&','=');
        response.statusCode = 404; // 写有意义的
        response.setHeader('a','1'); // 设置相应头 设置给客户端的
        response.end(JSON.stringify(obj)); // 立刻把结果响应回去
    });
    // response响应的内容
});
// 双工流
// node写 客户端  －》 node 服务端  ajax
// cookie session
// elementui  iview  文件上传

function uploadFile(){
    axios.post()
}
// server.on('request',function(request,response){
// })
server.listen(3000,'localhost',()=>{
    console.log('3000 starts');
});
// nodemon 只要文件发生变化 就会重新启动服务
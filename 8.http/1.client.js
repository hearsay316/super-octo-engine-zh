let http = require('http');

// http.get  http.request 响应体
// 通过服务端发请求 没有跨域的问题
let client = http.request({
    hostname:'localhost',
    port:3000,
    path:'/xxx?a=3&b=4',
    method:'post',
    headers:{
        a:1,
        //  'Content-Type':'application/json',
        'Content-Type':'application/x-www-form-urlencoded' // aa=bb&cc=dd
    }
},(response)=>{
    response.on('data',(data)=>{
        console.log(JSON.parse(data));
    })
});
client.end('name=zf&a=1');
// 1） 爬虫
// 2) 中间层  8080  node  =>  3000
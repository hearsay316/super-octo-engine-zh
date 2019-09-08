// koa  express 
let express = require('./express'); // express是一个函数

// 监听函数 http.createserver(function())

let app = express();

// express 内置了路由系统 （不同的路径 返回不同的内容）

// get post put delete options
app.get('/',function(req,res){ // req和res 就是原声的req和res
    res.end('home');
});
// curl  postman
app.post('/',function(req,res){
    res.end('post home');
})
app.get('/',function(req,res){ // req和res 就是原声的req和res
    res.end('hello');
});
app.get('/hello',function(req,res){ // req和res 就是原声的req和res
    res.end('world');
});
// 匹配所有的请求方法   所有路径 *
app.all('*',function(req,res){
    res.end('403');
})

app.listen(3000,()=>{
    console.log(`start 3000`);
});
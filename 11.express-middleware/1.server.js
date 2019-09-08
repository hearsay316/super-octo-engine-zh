let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let app = express();

// 请求体
// body-parser
// 实现 bodyParser上的.json 和 .urlencoded 
// cookieParser 中间件的实现  signed:true 签名
// express-session 会提供一个session  放在 req.session上  要提供一个秘钥

app.use(bodyParser.json()); // req.body = {} application/json
app.use(cookieParser('jiang'));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfpx'
}));
// querystring
app.use(bodyParser.urlencoded({extended:true})); //  x-www-form-urlencoded
app.post('/login',(req,res)=>{
    res.send(req.body);
});


app.get('/read',function(req,res){
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.end('读取')
})
app.get('/write',function(req,res){
    res.cookie('name','zf',{maxAge:100000000,signed:true});
    res.end('设置')
})
app.get('/',function(req,res){
    req.session.a = '1';
    res.end('session')
})
app.get('/geta',function(req,res){
    res.end(req.session.a)
})
app.listen(3000);


// multer 上传
// 路由的多级使用


// express 路由 中间件 封装一些req （query,path） res上的方法  (send sendFile)
// express.static
// 中间件  body-parser express-session cookie-parser multer



// 周一 vue的学习 第一天 vue核心 data 数据监控 vue实例上的方法 set nextTick
// computed watch 常用指令 声明周期


// 周三 vue的组件 组件交互  函数式组件  slot emit  v-model .sync 

// 周日 vue-cli3.0 (webpack ，环境变量  跨域) vue-router 路由守卫 权限  jwt
// vuex 用法


// 周一 pwa manifest  serviceworker  vue的预渲染 vue骨架屏

// 周三 写几个场见组件 菜单组件 递归组件  iview 树 组件 表格组件 iview布局

// 周日 nuxtjs  服务端渲染 封装常见组件

// react 全家


// koa小巧 promise  epxress 大而全
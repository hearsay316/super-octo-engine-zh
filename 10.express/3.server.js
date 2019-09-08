let express = require('./express');

let app = express();

// 在请求到路径处理之前 在中间执行的内容 就是中间件
// 1) 我们可以做一些权限校验
// 2) 配置一些公共方法和公共属性
// 3) 如果不调用next方法 则不会继续向下执行，是否可以继续执行后续逻辑
// 4) 一般中间件都在路由之前
// 5） 中间件中如果next方法中传递参数了 我就认为这个参数是错误 (捕获next方法出错的情况)
app.use('/api',function(req,res,next){ // 中间件有一个next函数
    console.log('1')
    next();  
});
app.use('/api',function(req,res,next){ // 中间件有一个next函数
    console.log('2');  // resolve(123)
    next('错误了');
});
app.get('/api/user',function(req,res){
     res.end('hello')
})
app.get('/api/admin',function(req,res){
    res.end(JSON.stringify({name:'zf'}))
})
app.use(function(err,req,res,next){
    console.log(err);
    next(err);
});
app.use(function(err,req,res,next){
    console.log(err);
    res.end('wrong')
})
app.listen(3000);


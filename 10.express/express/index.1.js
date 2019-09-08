let http = require('http');
let url = require('url');
let methods = require('methods');
function application(){
    // 请求到来时 会执行此函数
    let app = (req,res) =>{
        let {pathname} = url.parse(req.url);
        let requestMethod = req.method.toLowerCase();
        for(let i = 0; i<app.routes.length;i++){
            let layer = app.routes[i];
            let {path,handler,method} = layer;
            // 如果路由中 路径时* 也能匹配到 方法是all也能匹配到
            if(
                (pathname === path || path ==='*') && 
                (requestMethod === method) || (method ==='all')
            ){
                return handler(req,res);
            }
        }
        // 找不到任何的路由
        res.end(`Cannot ${requestMethod} ${pathname}`);
    }
    app.routes = []; // 存放 get方法调用时的layer  ［layer,layer］


    // 第三方模块 methods 这里存放了  所有方法 express 使用了这个模块

    [...methods,'all'].forEach(method=>{
        app[method] = function(path,handler){
            let layer = {
                path,
                method,
                handler
            };
            app.routes.push(layer);
        }
    })
   

    app.listen = function(){
        let server = http.createServer(app);
        server.listen(...arguments);
    }

    return app;
}


module.exports = application;
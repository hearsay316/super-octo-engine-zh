let http = require('http');
let url = require('url');
let methods = require('methods');
function application(){
    // 请求到来时 会执行此函数
    let app = (req,res) =>{
        let {pathname} = url.parse(req.url);
        let requestMethod = req.method.toLowerCase();
        // [use,use,route]   [route,route]
        let index = 0;
        function next(err){ // co库 next方法
            if(index === app.routes.length) {
                res.statusCode = 404;
                return res.end(`Cannot ${requestMethod} ${pathname}`);;
            };
            let {method,path,handler} = app.routes[index++]; // use
            
            if(err){
                if(method === 'middleware' && handler.length ===4 ){
                    return handler(err,req,res,next);
                }else{
                    next(err);
                }
            }else{
                if(method === 'middleware'){
                    // 路径相同可以匹配  路径是/ 可以匹配 路径开头也可以匹配
                    // /useradd/  /useradd/a
    
                    // /user/api   /user/api
                    // /user/api   /
                    // /user/api   /user
                    // /user/api   /use／  错误的
                    if(pathname === path || path=='/' || pathname.startsWith(path+'/')){
                        return handler(req,res,next);// 将next的执行方法交给用户 用户决定是否向下执行
                    }else{
                        next();
                    }
                }else{
                    if(path.params){ // 是一个带路径参数的路由 path=>/user/()/() params=> [id,name]
                        let matches = pathname.match(path);
                        if(matches && (method === requestMethod)){
                            let [,...lists] = matches; // [6,zf];
                            req.params = path.params.reduce(
                                (memo,current,index)=>(memo[current]=lists[index],memo),{});
                            return handler(req,res);
                        }
                    }
                    if(
                        (pathname === path || path ==='*') && 
                        (requestMethod === method) || (method ==='all')
                    ){
                        return handler(req,res);
                    }
                    next();
                }
            }
            
        }
        next();
        // for(let i = 0; i<app.routes.length;i++){
        //     let layer = app.routes[i];
        //     let {path,handler,method} = layer;
        //     // 如果路由中 路径时* 也能匹配到 方法是all也能匹配到

        //     if(path.params){ // 是一个带路径参数的路由 path=>/user/()/() params=> [id,name]
        //         let matches = pathname.match(path);
        //         if(matches && (method === requestMethod)){
        //             let [,...lists] = matches; // [6,zf];
        //             req.params = path.params.reduce(
        //                 (memo,current,index)=>(memo[current]=lists[index],memo),{});
        //             return handler(req,res);;
        //         }
        //     }

        //     if(
        //         (pathname === path || path ==='*') && 
        //         (requestMethod === method) || (method ==='all')
        //     ){
        //         return handler(req,res);
        //     }
        // }
        // // 找不到任何的路由
        // res.end(`Cannot ${requestMethod} ${pathname}`);
    }
    app.routes = []; // 存放 get方法调用时的layer  ［layer,layer］


    // 第三方模块 methods 这里存放了  所有方法 express 使用了这个模块

    [...methods,'all'].forEach(method=>{
        app[method] = function(path,handler){
            // path = /user/:id/:name
            let params = [];
            if(path.includes(':')){ // 动态路由
                path = path.replace(/:([^\/]*)/g,function(){
                    params.push(arguments[1]);
                    return '([^\/]*)'
                });
                path = new RegExp(path);
                path.params = params; // 将刚才匹配到的属性放到自己的身上
            }
            let layer = {
                path,
                method,
                handler
            };
            app.routes.push(layer);
        }
    })
    app.use = function(path,handler){
        if(typeof handler != 'function'){
            handler = path;
            path = '/'; //  处理中间件参数 如果没传path 默认是/
        }
        let layer = {
            method:'middleware',
            path,
            handler
        }
        app.routes.push(layer);
    }
   

    app.listen = function(){
        let server = http.createServer(app);
        server.listen(...arguments);
    }

    return app;
}


module.exports = application;
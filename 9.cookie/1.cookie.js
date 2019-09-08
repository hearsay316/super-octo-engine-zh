let http = require('http');
let querystring = require('querystring'); // qs
let url = require('url'); // url.parse() pathname = path
// /read      /
// /read/a    /a /b
let sign = (value)=>{
    return require('crypto').createHmac('sha256','zf').update(value.toString()).digest('base64').replace(/[+/]/g,'');
}
console.log(sign('hello'));
http.createServer(function(req,res){
    // 设置cookie  读取cookie
    let arr = [];
    res.setCookie = function(key,value,options={}){ // setCookie
        let optionsArr = [];
        if(options.maxAge){
            optionsArr.push(`Max-Age=${options.maxAge}`);
        }
        if(options.httpOnly){
            optionsArr.push(`httpOnly=${options.httpOnly}`);
        }
        if(options.path){
            optionsArr.push(`path=${options.path}`);
        } // [maxAge=6,path:'/']
        if(options.signed){ // 要给内容签名
            value = value+'.'+sign(value);
        }
        arr.push(`${key}=${value}; `+optionsArr.join('; '));
        res.setHeader('Set-Cookie',arr);
    }
    res.getSignCookie = function(key){
        let cookies = querystring.parse(req.headers.cookie,'; ') || {}// a=1; b=2
        if(cookies[key]){ // 如果有cookie  在拆分
            let [value,signValue] = cookies[key].split('.');
            if(sign(value) === signValue){
                return value
            }
        }
        return '';
    }
    res.getCookie = function(key){
        let cookies = querystring.parse(req.headers.cookie,'; ') || {}// a=1; b=2
        return cookies[key];
    }
    if(req.url === '/write/read'){
        res.end(res.getSignCookie('name'));
    }
    if(req.url === '/write/read2'){
        res.end(res.getCookie('age')||'不存在');
    }
    if(req.url === '/write'){
        // domain 默认只针对某个域名  .zhufe.cn 表示a.zhufe  b.zhufe c.zhufe 都可以共用cookie
        // path 一般都不会设置 可以起到 路径限制cookie
        // res.setHeader('Set-Cookie',['name=zf','age=10']);
        // expires  绝对时间／ max-age 想对时间  过期时间 5秒后 重新登录
        // httpOnly( 一般情况下服务端设置都是true)
        // expires='+new Date(Date.now()+100000).toUTCString()+';
        //res.setHeader('Set-Cookie',['name=zf; domain=a.zhufeng.cn; path=/write;  httpOnly=true']);
        res.setCookie('name','zf',{httpOnly:true,signed:true,domain:'b.zhufeng.cn'});
        res.setCookie('age','10',{httpOnly:true});
        res.end('write ok');
    }
}).listen(3000);

// 签名  就是给cookie 标个记号  下次你带上记号 和内容 就可以确认这个东西有没更改


// crypto 核心模块 md5 

// let secret = 'zf1'
// let crypto = require('crypto');  // 加盐算法
// let str = crypto.createHmac('sha256',secret).update('123456').digest('base64');
// console.log(str);
// md5 是摘要算饭 并不是加密
// 1) 相同的内容 摘要后相同
// 2) 不同的内容 摘要出的结果完全不同
// 3) 长度相同
// 4） 摘要后不能反过来

// 存密码

// gdyb21LQTcIANtvYMT7QVQ  12345  撞库
// let str = crypto.createHash('md5').update('12345').digest('base64');
// str = crypto.createHash('md5').update(str).digest('base64');
// str = crypto.createHash('md5').update(str).digest('base64');
// console.log(str);



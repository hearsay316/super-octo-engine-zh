let http = require('http');
let querystring = require('querystring');
let url = require('url');

// console.log(url.parse('http://xx:mm@localhost:3000/abc?a=1&b=2'));
// resful风格 
// ／user get /user post /user  put /user delete
let server = http.createServer((req,res)=>{
    // req.url / headers / method req.on('data')
    // res.write end setHeader statusCode
    let {pathname,query} = url.parse(req.url,true); // /xxx?a=1

    let method = req.method.toLowerCase();

    let headers = req.headers;
    let arr = []; 
    req.on('data',(chunk)=>{
        arr.push(chunk);
    });
    req.on('end',()=>{
        // a=1&b=2
       let str = Buffer.concat(arr).toString();
       if(req.headers['content-type'] === 'application/x-www-form-urlencoded'){
           let obj = querystring.parse(str);
           res.setHeader('Content-Type','application/json;charset=utf8')
           res.end(JSON.stringify(obj));
       }
    })
});
server.listen(3000);
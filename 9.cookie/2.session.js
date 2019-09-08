let http = require('http');
let querystring = require('querystring');
let uuid = require('uuid');
console.log(uuid.v4());
// 起个店的名字 
let sessionId = 'zhufengwash';
//  存放用户 和 信息的映射表
let session = {}// 存到数据 redis 里 ／ mongo
// 用唯一表示 去服务端找到对应的关系
// 用户登录 session  && jwt  (购物车 cookie／ localstorage)
http.createServer(function(req,res){
    if(req.url === '/towash'){
       let cookies =  querystring.parse(req.headers.cookie,'; ') || {};
       let username = cookies[sessionId];
        if(username && session[username]){ // 101
            session[username].mny -=10;
            res.setHeader('Content-Type','text/html;charset=utf8');
            res.end(`当前您的额度是${session[username].mny}`);
        }else{
            // 你是第一次来到店里的
            let cardId = uuid.v4();
            res.setHeader('Set-Cookie',`${sessionId}=${cardId}; httpOnly=true`);
            session[cardId] = {
                mny:100
            }
            res.setHeader('Content-Type','text/html;charset=utf8');
            res.end(`当前您的额度是${session[cardId].mny}`);
        }
    }
}).listen(3000);
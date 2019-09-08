let express = require('./express');

let app = express();
let path = require('path');





app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname,'../')));
// app.get('/index.html',function(req,res){
//     res.sendFile(path.resolve(__dirname,'index.html')); // 发送文件
// })

app.get('/api/user',function(req,res){
    // 在express中提供了 大量的内置属性 和方法
    console.log(req.path);
    console.log(req.query);
    res.send('错误了')
})
app.get('/api/admin',function(req,res){
    res.end(JSON.stringify({name:'zf'}))
})

app.listen(3000);


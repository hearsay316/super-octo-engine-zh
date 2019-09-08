let express = require('./express');
// [id,name]  [4,jw]
// 路径参数  /user/:id／:name   /user/4/jw  this.$route.params {id:4,name:jw}

let app = express();
// 随机 但是必须要传递
app.get('/:a/user/:id/:n/a',function(req,res){
    res.end(JSON.stringify(req.params))
})

app.listen(3000);


// let real = '/user/4/jw'; // /user/([^\/]*)/([^\/]*)
// let str = '/user/:id/:name';


// let args = []; // [id,name]
// str = str.replace(/:([^\/]*)/g,function(){
//     args.push(arguments[1])
//     return '([^\/]*)'
// });
// let reg = new RegExp(str);
// // [4,jw]
// let [,...lists] = real.match(reg); // match 匹配到的内容  第一个分组 第二个分组
// // memo ={id:4,name:jw} memo[name] = jw
// let result = args.reduce((memo,arg,index)=>(memo[arg] = lists[index],memo),{})
// console.log(result);
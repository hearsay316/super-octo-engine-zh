// ssr 就是用模版加数据 渲染好一个 html字符串 返还给客户端
// vue-ssr


let ejs = require('ejs');
let fs = require('fs');
let path = require('path');
let data = {name:'zf',age:10,arr:[1,2,3]}; // with（data） 模板
let tempStr = fs.readFileSync(path.resolve(__dirname,'index.html'),'utf8');
function render(str,data){
    str = str.replace(/<%=([\s\S]*?)%>/g,function(){
        console.log(arguments[1])
        return '${'+arguments[1]+'}'
    });
    let head = 'let str;\r\nwith(obj){\r\n'
    head += 'str=`'
    let content = str.replace(/<%([\s\S]*?)%>/g,function(){
        return '`\r\n'+arguments[1] + '\r\nstr+=`'
    });
    let tail = '`\r\n}\r\nreturn str;'
    let fn = new Function('obj',head + content + tail);
    return fn(data);
}

// 取值表达式的替换
// function render(str,data){
//     return str.replace(/<%=([\s\S]*?)%>/g,function(){
//         return data[arguments[1]]
//     })
// }
let str = render(tempStr,data);
console.log(str);
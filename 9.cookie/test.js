function a(obj){
let str;
with(data){
str=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    `
arr.forEach(a=>{
    str+=`<li>1</li>`
})
str+=`
    </body>
    </html>

    <!-- 先把html中要的部分提取出来 -->`
}
return str;
}
let str = a({arr:[1,2,3]});
console.log(str);

// http缓存
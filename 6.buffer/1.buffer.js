let buffer = Buffer.from('珠峰'); // 把字符串可以转化成16进制
// 可以和字符串进行转化
// node 只支持utf8格式 iconv-lite 把二进制gbk 转化成utf8;
console.log(buffer.toString('base64'));
// 1b = 8bit
// 编码的问题
// 二进制 11111111  255 八进制 377  十六进制 ff

let r = parseInt('11111111',2);
console.log(r);
let r = (255).toString(16);
console.log(r);


// base64 (一切能放置路径的地方 都可以使用base64) img.src  background:
// 我有个非常大的图片
// 一个汉子是3个字节  3*8 ＝ 4*6 
let r = Buffer.from('珠');
console.log(r); // 54+g  // e7 8f a0

console.log((0xe7).toString(2))
console.log((0x8f).toString(2))
console.log((0xa0).toString(2))
//11100111
//10001111
//10100000
// 00111001  00111000  00111110 00100000

console.log(parseInt('00111001',2))
console.log(parseInt('00111000',2))
console.log(parseInt('00111110',2))
console.log(parseInt('00100000',2))

let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
str+= str.toLowerCase();
str += '0123456789+/';
// 加密的过程 md5  base64只是编码
console.log(str[57]+str[56]+str[62]+str[32]); // 理论上大1/3


// buffer的声明方式 
let buffer =  Buffer.from('珠峰');
let buffer1 = Buffer.alloc(3);
let buffer2 = Buffer.from([255,255,255]);
console.log(buffer2);

// buffer中常见的 方法 数组的方法 forEach  length(子节的个数)
console.log(buffer.length);

// buffer一旦声明 就不能增加长度 copy + concat + split
let b1 = Buffer.from('珠');
let b2 = Buffer.from('峰');
// let big = Buffer.alloc(6);
// source.copy(target,targetStart,sourceStart,sourceEnd)
// b1.copy(big,0,0,3);
// b2.copy(big,3,0,3);
// console.log(big);
Buffer.concat = function(){ // copy

}
let buf = Buffer.concat([b1,b2]);
console.log(buf);

// 周日之前交
// Promise.finally 方法 
// 自己实现concat方法 
// commonjs规范 总结 （module.exports exports）
// https://ks.wjx.top/jq/33799145.aspx 
// 3028213607@qq.com

// http 用法 
// http + cookie + session 
// 周日讲express

// vue + express 3周


jw18310349227


168748079
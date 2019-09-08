let b1 = Buffer.from('珠');
let b2 = Buffer.from('峰');
// let big = Buffer.alloc(6);
// source.copy(target,targetStart,sourceStart,sourceEnd)
// b1.copy(big,0,0,3);
// b2.copy(big,3,0,3);
// console.log(big);
let buf = Buffer.concat([b1,b2]);
console.log(buf);
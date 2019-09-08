async function async1(){
    console.log('async1 start');
    await async2();  
    // console.log('xxxx');
    // await 后面的代码 是在async2中的then后面执行
}
async function async2(){
    console.log('async2');
}
console.log('script start');
setTimeout(function(){
    console.log('settimeout')
},0)
async1();
new Promise(function(resolve){
     console.log('promise1');
    resolve();
}).then(function(){
    console.log('promise2');
})
console.log('script end');
// await xxx() xxx方法会立即执行
// script start 
// async1 start
// async2 
// promise1
// script end
// TIMEOUT;



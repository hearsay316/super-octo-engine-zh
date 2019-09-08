// global 可以直接访问global 并且没有window的概念 =>this(文件中打印) =>{}
// window 代理了global  this=>window

// process 进程  (当前运行的环境)
// Buffer 读取的内容 都是二进制 buffer主要是内存 缓存 16进制 可以和字符串相互转化
// clearImmediate setImmediate 宏任务
// clearInterval setTimeout 定时器 宏任务
// clearTimeout
// console.dir(global,{showHidden:true});

// eval decode  encode
console.log(this); // node的文件 默认在外面套了一层函数，在函数运行时把this指向改变了
// repl   Read-eval-print-loop


// 1)
// process.cwd();  current working directory
// process.env;    enviromnent
// process.argv;   arguments
// process.nextTick; 下一队列  微任务

console.log(process.cwd()); // 在哪执行文件 就可以打印出位置 *
// webpack 开发环境(process.env.NODE_ENV) 生产环境
// window set a=1  export a=1
if(process.env.NODE_ENV === 'production'){
    console.log('生产环境');
}else{
    console.log('开发环境')
}
// mockjs 

let args = process.argv.slice(2);// node 1.js [--port,3000]  commander yargs
let obj = {};
for(let i = 0 ;i < args.length ;i++){
    let current = args[i];
    if(current.includes('--')){
        obj[current.slice(2)] = args[i+1]
    }
}
console.log(obj.port);


process.nextTick(function(){
    console.log('nexttick');
})
Promise.resolve().then(()=>{
    console.log('then');
})

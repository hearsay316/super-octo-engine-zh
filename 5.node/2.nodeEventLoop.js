setTimeout(()=>{
    console.log('timeout1');
    process.nextTick(()=>{
        console.log('nextTick2');
    });
    process.nextTick(()=>{
        console.log('nextTick2');
    });
});
setTimeout(()=>{
    console.log('timeout3');
});
process.nextTick(()=>{
    console.log('nextTick1');
    setTimeout(()=>{
        console.log('timeout2');
    });
});
// nextTick1 timeout1   
// node 10 
// start nextTick1 timeout1 timeout2 nextTick2
// nextTick1  timeout1 nextTick2 timeout2
// node 11  尽量和浏览器的表现相同

let fs = require('fs');
fs.readFile('./name.txt','utf8',()=>{
    setTimeout(()=>{ // timer
        console.log('setTimeout')
    })
    setImmediate(()=>{ // check
        console.log('setImmediate');
        process.nextTick(()=>{
            console.log('nextTick');
        })
    })
    setImmediate(()=>{ // check
        console.log('setImmediate')
    })
})


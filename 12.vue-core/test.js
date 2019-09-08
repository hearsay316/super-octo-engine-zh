Promise.reject(123).finally(()=>{
    console.log(1)
}).catch(err=>{
    console.log(err);
})
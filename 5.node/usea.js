// let r = require('./a'); // 策略 默认会增加.js  .json
let path = require('path');
let fs = require('fs');
let vm = require('vm');
function Module (id){
    this.id = id;
    this.exports = {};
}
Module.wrapper = [
    "(function(exports,module,require,__dirname,__filename){",
    "})"
]
Module._extensions = {
    '.js'(module){
        let content = fs.readFileSync(module.id,'utf8');
        let fnStr = Module.wrapper[0] + content + Module.wrapper[1];
        let fn = vm.runInThisContext(fnStr);
        fn.call(module.exports,module.exports,module,req);
    },
    '.json'(module){
        let json = fs.readFileSync(module.id,'utf8');
        module.exports = json; // 把文件的结果放到exports属性上
    }
}
function tryModuleLoad(module){
    let extension = path.extname(module.id);
    // 通过后缀加载当前模块
    Module._extensions[extension](module)
}
Module._cache = {};
function req(modulePath){
    // 获取当前要加载的绝对路径
    let absPathname = path.resolve(__dirname,modulePath);
    let extNames = Object.keys(Module._extensions);
    let index = -1;
    let old = absPathname;
    function find(absPathname){
        if(index === extNames.length){
            return absPathname;
        } 
        try{
            // 找到后 就终止查找
            fs.accessSync(absPathname);
            return absPathname; 
        }catch(e){
           let ext = extNames[index++]; // .js  
           let newPath = old+ext; // path.join(a,b) // a/.js
           return find(newPath);
        }
    }
    absPathname = find(absPathname); // 找当前路径是否存在
    try{
        fs.accessSync(absPathname);
    }catch(e){ // 最后增加json后也没有后缀 就抛出错误
        throw new Error('error');
    }
    if(Module._cache[absPathname]){ // 如果文件已经存在 直接将exports对象返回即可
        return Module._cache[absPathname].exports
    }
    let module = new Module(absPathname);
    Module._cache[absPathname] = module;
    tryModuleLoad(module); // 尝试加载当前模块
    return module.exports; // req方法会默认返回exports对象
}
let obj = req('./a');
console.log(global.a)

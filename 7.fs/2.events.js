// let EventEmitter = require('events');
class EventEmitter{
    constructor(){
        this._events = {}
    }
    on(evneName,callback){
        if(this._events[evneName]){
            this._events[evneName].push(callback);
        }else{
            this._events[evneName] = [callback];
        }
    }
    emit(eventName){
        this._events[eventName].forEach(fn => {
            fn();
        });
    }
    off(eventName,callback){
        this._events[eventName] = this._events[eventName].filter((fn)=>{
            return fn != callback
        })
    }
}
let e = new EventEmitter();
// on方法  {'吃饭':[吃米饭]}
let fn = function(){
    console.log('吃米饭')
}
e.on('吃饭',fn)
e.on('吃饭',function(){
    console.log('吃肉')
});
e.off('吃饭',fn)
e.emit('吃饭'); // once newListener
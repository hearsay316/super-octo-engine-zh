import Vue from 'vue'
import App from './App.vue'
import router from './router';
Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
router.beforeEach((to,from,next)=>{
  let flag = to.matched.some(match=>match.meta && match.meta.needLogin);
  // 如果用户已经登录 并且访问 的还是登录页面

  // 先要交验 当前路由是否要登录
  // 如果登录过 并且需要登录
  if(flag){ // 需要登录
    let isLogin = localStorage.getItem('login');
    if(isLogin){
      if(to.name == 'login'){
        next('/');
      }else{
        next();
      }
    }else{
      next('/');
    }
  }else if(to.name == 'login'){
    if(isLogin){
      next('/');
    }else{
      next();
    }
  }else{
    next();
  }
})
router.beforeResolve((to,from,next)=>{ // 当前路由解析后会跳转的钩子
  console.log('resolve')
  next();
});
router.afterEach(()=>{
  console.log('after')
})
new Vue({
  router, // 在实例中引入路由
  render: h => h(App),
}).$mount('#app')
// 钩子函数
// $router $route
// meta 
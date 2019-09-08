<template>
    <div>
        <input type="text" v-model="username">
        <button @click="toList">去列表页面</button>
    </div>
</template>
<script>
export default {
    methods:{
        toList(){ // vue.use(VueRouter) $router $route
            this.$router.push('/user/list');
        }
    },
    // 路由钩子函数
    beforeRouteLeave(to,from,next){
        if(this.username){
            let confim = window.confirm('你需要切换吗?');
            if(confim){
                next();
            }
        }else{
            next();
        }
        //next(); // express next
    },
    data(){
        return {username:''}
    }
}
</script>

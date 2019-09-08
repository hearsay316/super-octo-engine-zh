<template>
    <div>
        userDetail {{this.$route.query.id}}  问好传递参数
        {{this.$route.params.id}}  通过路由的路径传递参数
    </div>
</template>

<script>
export default {
    beforeRouteEnter(to,from,next){
        console.log('enter');
        next();
    },
    beforeRouteUpdate(to,from,next){
        alert(1);
        next();
    },
    // watch:{
    //     $route(){ // 可以通过监控$route 实现加载数据
    //         alert(1);
    //     }
    // },
    mounted(){
        
    }
}
</script>

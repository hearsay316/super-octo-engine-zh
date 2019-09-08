<template>
  <div id="app">
    <!-- {{lesson}} {{className}} -->
    <!-- {{u}} -->
    <!-- {{getNewName}}
    {{getNewUserName}} -->

    {{u}}
    <button @click="change">修改状态</button>
  </div>
</template>

<script>
// 状态不受模块控制
// 如果增加子模块没有增加namespace 只有状态需要通过模块.属性
// 如果开启了模块 就要使用 模块去取属性

// 如果页面中注入了store 每个实例上都会存在一个属性 $store
// 模块 首页  用户
// 如果使用的是自模块 你可以 增加namespace属性 把他变成一个模块
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
// 如果要改名字 需要 通过 对象形式传递参数
export default {
  name: 'app',
  methods:{
    ...mapActions('user',['change_user']),
    change(){
      this.$store.state.user.userName = 'hello world'
      // this['change_user']('jw')
      // this.$store.commit('user/change_user','jw')
      //this.$store.dispatch('user/change_user','jw')
    }
  },
  computed:{
     //...mapState(['lesson','className']),
       ...mapState('user',{u:s=>s.userName}),
     // ...mapGetters(['getNewName']),
     //...mapGetters('user',['getNewUserName'])
  }
}

// let {mapState} = createNamespacedHelpers('user');
// ...mapState(['userName'])


// 在vuex中如果想使用模块 最好使用辅助方法，限制模块作用域
// 如果直接修改状态 可以 commit  mapMutation
// 如果异步修改状态 可以 dispatch mapActions
</script>

<style>
</style>

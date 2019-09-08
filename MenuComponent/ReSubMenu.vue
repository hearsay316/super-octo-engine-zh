<template>
    <SubMenu >
        <template #title>
            {{data.title}}
        </template>
        <template v-for="child in data.children">
            <!-- 如果没儿子 直接渲染 MenuItem 有儿子 将儿子递归传入 -->
           <MenuItem :key="child.title" v-if="!child.children">{{child.title}}</MenuItem>
           <ReSub v-else :key="child.title" :data="child"></ReSub>
        </template>
    </SubMenu>
</template>
<script>
import SubMenu from './SubMenu';
import MenuItem from './MenuItem';
export default {
    name:'ReSub', // 可以使用"递归组件"
    props:{
        data:{
            type:Object,
            default:()=>({})
        }
    },
    components:{
        SubMenu,MenuItem
    }
}
</script>

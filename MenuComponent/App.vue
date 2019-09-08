<template>
    <div id="app">
        <!-- iview Menu MenuItem SubMenu -->
        <!-- 递归组件 树结构  菜单 -->
        <Menu>
            <template v-for="menu in menuList" >
                <MenuItem 
                    :key="menu.title" 
                    v-if="!menu.children"
                >   {{menu.title}}
                </MenuItem>
                <!-- 把重复的部分 先去抽离出去 -->
                <ReSubMenu :key="menu.title" v-else :data="menu" ></ReSubMenu>
            </template>
        </Menu>

          <!-- <SubMenu>
                <template #title>
                    菜单4
                </template>
                 <MenuItem>菜单4-1</MenuItem>
                 <MenuItem>菜单4-2</MenuItem>
            </SubMenu> -->
    </div>
</template>

<script>
import Menu from './Menu';
import MenuItem from './MenuItem'
import SubMenu from './SubMenu';
import ReSubMenu from './ReSubMenu';

// 使用组件 3步  1） 定义组件  引用组件  注册组件
export default {
    data(){
        return {
            menuList:[
                {
                    title:'菜单1',
                    children:[
                        {
                            title:'菜单1-1',
                            children:[
                                {title:'菜单1-1-1'},
                                {title:'菜单1-1-2'},
                                {title:'菜单1-1-3',
                                children:[
                                {title:'菜单1-1-1'},
                                {title:'菜单1-1-2'},
                                {title:'菜单1-1-3',
                                children:[
                                {title:'菜单1-1-1'},
                                {title:'菜单1-1-2'},
                                {title:'菜单1-1-3',
                                children:[
                                {title:'菜单1-1-1'},
                                {title:'菜单1-1-2'},
                                {title:'菜单1-1-3'}
                            ]}
                            ]}
                            ]}
                            ]
                        },
                        {title:'菜单1-2'},
                        {title:'菜单1-3'}
                    ]
                },
                {
                    title:'菜单2',
                },
                {
                    title:'菜单3',
                }
            ]
        }
    },
    components:{
        Menu,MenuItem,SubMenu,ReSubMenu
    }
}
</script>

<style>
#app{
    color:red
}
</style>


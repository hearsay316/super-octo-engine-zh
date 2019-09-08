import Home from '_v/Home.vue';
import Name from '_v/Name.vue';
import Version from '_v/Version.vue';
// 默认情况下 只有首页默认显示 ，其他点击时才加载组件
// 白屏
export default [ // routeMap
    {
        path:'/',
        redirect:{path:'/home'}
    },
    {
        path:'/home',
        name:'home',
        components:{
            default:Home,
            name:Name,
            version:Version
        }
    },
    {
        path:'/login',
        name:'login',
        component:()=> import('_v/Login.vue') 
    },
    {
        path:'/profile',
        name:'profile',
        component:()=> import('_v/Profile.vue'),
        meta:{needLogin:true} // 路由元信息  bei zhu 
    },
    {
        path:'/user',
        name:'user',
        component:()=> import('_v/User.vue'),
        meta:{needLogin:true},
        children:[
            {
                path:'',
                component:()=>import('_v/UserAdd.vue')
            },
            {
                path:'add',
                name:'userAdd', // 路径默认儿子不能加 / 
                component:()=>import('_v/UserAdd.vue')
            },
            {
                path:'list',
                name:'userList', // 路径默认儿子不能加 / 
                component:()=>import('_v/UserList.vue')
            },
            {
                path:'detail/:id', // /user/detail/3
                name:'userDetail', // 路径默认儿子不能加 / 
                component:()=>import('_v/UserDetail.vue'),
                beforeEnter(to,from,next){
                    console.log('xxxx');
                    next();
                }
            }
        ]
    },
    {
        path:'*',
        component:()=>import('_v/404.vue')
    }
]
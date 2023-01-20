import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '首页' },
            children: [
                {
                    path: 'home',
                    name:'home',
                    component: () => import('../pages/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path:'setting',
                    name:'setting',
                    component:() => import('../pages/Setting.vue'),
                    meta:{title:'个人信息设置'}
                },
                {
                    // markdown组件
                    path: 'markdown',
                    component: () => import('../pages/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    path:'user',
                    name:'user',
                    component: () => import('../pages/user/user.vue'),
                    meta: {title:'用户管理'},
                },
                {
                    path:'user/addUser',
                    name:'addUser',
                    component: () => import('../pages/user/addUser.vue'),
                    meta: {title:'新增用户'},
                },
                {
                    path:'user/editUser',
                    name:'editUser',
                    component: () => import('../pages/user/editUser.vue'),
                    meta:{title:'修改用户'},
                },
                {
                    path: '404',
                    component: () => import('../pages/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '403',
                    component: () => import('../pages/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            name:'login',
            component: () => import('../pages/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

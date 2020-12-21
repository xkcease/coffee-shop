import Vue from 'vue';
import VueRouter from 'vue-router';
import { Toast } from 'vant';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        alias: '/login',
        name: 'Login',
        component: () =>
            import(/* webpackChunkName: "login" */ '../views/Login'),
    },
    {
        path: '/primary',
        name: 'Primary',
        component: () =>
            import(/* webpackChunkName: "primary" */ '../views/Primary'),
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () =>
                    import(
                        /* webpackChunkName: "primary" */ '../views/primary/Home'
                    ),
            },
            {
                path: 'menu',
                name: 'Menu',
                component: () =>
                    import(
                        /* webpackChunkName: "primary" */ '../views/primary/Menu'
                    ),
            },
            {
                path: 'shoppingBag',
                name: 'ShoppingBag',
                component: () =>
                    import(
                        /* webpackChunkName: "primary" */ '../views/primary/ShoppingBag'
                    ),
            },
            {
                path: 'my',
                name: 'My',
                component: () =>
                    import(
                        /* webpackChunkName: "primary" */ '../views/primary/My'
                    ),
            },
        ],
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () =>
            import(/* webpackChunkName: "detail" */ '../views/Detail'),
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login') {
        Toast.loading({ message: '加载中...', duration: 0, forbidClick: true });
    }

    next();
});

export default router;

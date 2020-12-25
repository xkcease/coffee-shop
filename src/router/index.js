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
    {
        path: '/pay',
        name: 'Pay',
        component: () => import(/* webpackChunkName: "pay" */ '../views/Pay'),
    },
    {
        path: '/account',
        name: 'Account',
        component: () =>
            import(/* webpackChunkName: "my" */ '../views/my/Account'),
    },
    {
        path: '/like',
        name: 'Like',
        component: () =>
            import(/* webpackChunkName: "my" */ '../views/my/Like'),
    },
    {
        path: '/address',
        name: 'Address',
        component: () =>
            import(/* webpackChunkName: "my" */ '../views/my/Address'),
    },
    {
        path: '/addressModify',
        name: 'AddressModify',
        component: () =>
            import(/* webpackChunkName: "my" */ '../views/my/AddressModify'),
    },
    {
        path: '/order',
        name: 'Order',
        component: () =>
            import(/* webpackChunkName: "my" */ '../views/my/Order'),
    },
    {
        path: '/security',
        name: 'Security',
        component: () =>
            import(/* webpackChunkName: "my" */ '../views/my/Security'),
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

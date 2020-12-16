import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        alias: '/login',
        name: 'login',
        component: () =>
            import(/* webpackChunkName: "login" */ '../views/Login'),
    },
];

const router = new VueRouter({
    routes,
});

export default router;

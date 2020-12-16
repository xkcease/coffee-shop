import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'amfe-flexible';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import 'amfe-flexible';
import 'font-awesome/css/font-awesome.min.css';
import {
    Row,
    Col,
    Button,
    Popup,
    Form,
    Field,
    Tabbar,
    TabbarItem,
    Toast,
    Swipe,
    SwipeItem,
    Search,
    Card,
    Empty,
    NavBar,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Stepper,
    SubmitBar,
    Cell,
    CellGroup,
    Checkbox,
    AddressList,
    AddressEdit,
    Icon,
    Divider,
    Tabs,
    Tab,
    Uploader,
} from 'vant';

Vue.use(Row)
    .use(Col)
    .use(Button)
    .use(Popup)
    .use(Form)
    .use(Field)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Toast)
    .use(Swipe)
    .use(SwipeItem)
    .use(Search)
    .use(Card)
    .use(Empty)
    .use(NavBar)
    .use(GoodsAction)
    .use(GoodsActionIcon)
    .use(GoodsActionButton)
    .use(Stepper)
    .use(SubmitBar)
    .use(Cell)
    .use(CellGroup)
    .use(Checkbox)
    .use(AddressList)
    .use(AddressEdit)
    .use(Icon)
    .use(Divider)
    .use(Tabs)
    .use(Tab)
    .use(Uploader);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

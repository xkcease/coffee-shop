<template>
    <div class="order">
        <van-nav-bar
            left-text="我的订单"
            left-arrow
            @click-left="goBack"
            fixed
        />
        <van-tabs v-model="tabIndex" class="order__tabs" @change="changeTab">
            <van-tab v-for="title in tabTitles" :key="title" :title="title">
                <div v-if="orders.length">
                    <div v-for="(order, index) in orders" :key="index">
                        <OrderList :order="order" @delete:order="deleteOrder" />
                    </div>
                </div>
                <van-empty v-else description="没有订单喔~!" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { getData } from '../../assets/js/http';
import OrderList from '../../components/OrderList';

export default {
    name: 'Order',
    components: {
        OrderList,
    },
    data() {
        return {
            tokenString: '',
            orders: [],
            tabIndex: 0,
            tabTitles: ['全部', '进行中', '已完成'],
        };
    },
    created() {
        this.tokenString = sessionStorage.getItem('token');
        if (!this.tokenString) {
            this.goBack();
        }

        this.getOrders(0);
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        getOrders(status) {
            getData('/findOrder', {
                tokenString: this.tokenString,
                status,
            }).then((res) => {
                this.orders = [];
                let obj = {};

                res.result.forEach((v) => {
                    if (!obj[v.oid]) {
                        obj[v.oid] = {
                            orderId: v.oid,
                            date: v.createdAt,
                            amount: v.count,
                            total: v.count * v.price,
                            products: [v],
                            status: v.status,
                        };
                    } else {
                        obj[v.oid].amount += v.count;
                        obj[v.oid].total += v.count * v.price;
                        obj[v.oid].products.push(v);
                    }
                });

                for (let key in obj) {
                    this.orders.push(obj[key]);
                }

                this.orders.sort((a, b) => {
                    return (
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    );
                });

                this.$toast.clear();
            });
        },
        changeTab(name) {
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0,
            });

            this.getOrders(name);
        },
        deleteOrder(orderId) {
            for (let i = 0; i < this.orders.length; i++) {
                if (this.orders[i].orderId === orderId) {
                    this.orders.splice(i, 1);
                }
            }
        },
    },
};
</script>

<style lang="scss">
.order {
    .order__tabs {
        margin-top: 45px;
    }
}
</style>

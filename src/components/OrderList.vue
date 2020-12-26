<template>
    <div class="order-list">
        <div v-if="order.orderId" class="van-hairline--bottom order__head">
            <p class="order__id">{{ order.orderId }}</p>
            <van-icon
                v-if="order.status === 2"
                name="success"
                color="#0099cc"
            />
        </div>
        <h2 v-else class="order-list__title">订单信息</h2>
        <ol>
            <li v-for="(product, index) in order.products" :key="index">
                <van-card
                    class="order-list__card"
                    :desc="product.enname"
                    :thumb="getAvatar(product)"
                    :price="product.price"
                    :num="product.count"
                >
                    <template #title>
                        <span class="order-list__name">{{ product.name }}</span>
                        <span class="order-list__rule">{{ product.rule }}</span>
                    </template>
                </van-card>
            </li>
        </ol>
        <van-divider class="line" dashed :hairline="false">
            <div class="round left-round"></div>
            <div class="round right-round"></div>
        </van-divider>
        <p v-if="order.orderId" class="order__date">
            {{ formatDate(order.date) }}
        </p>
        <div class="l-flex order-list__receipt">
            <span>共计{{ order.amount }}件商品</span>
            <span class="order-list__total">合计￥{{ order.total }}</span>
        </div>
        <div class="order__control">
            <van-button
                class="order__btn"
                v-if="order.orderId"
                size="small"
                type="info"
                round
                @click="submitOrder"
            >
                {{ order.status === 1 ? '确认收货' : '删除订单' }}
            </van-button>
        </div>
    </div>
</template>

<script>
import { formatDate } from '../assets/js/util';
import { postData } from '../assets/js/http';

export default {
    name: 'OrderList',
    props: {
        order: Object,
    },
    methods: {
        formatDate,
        getAvatar(product) {
            return product?.small_img ?? product.smallImg;
        },
        submitOrder() {
            let tokenString = sessionStorage.getItem('token');
            if (!tokenString) {
                return;
            }

            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0,
            });

            let data = {
                tokenString,
                oid: this.order.orderId,
            };

            if (this.order.status === 1) {
                postData('/receive', data).then((res) => {
                    console.log(res);
                    if (res.code === 80000) {
                        if (this.tabIndex === 1) {
                            this.$emit('delete:order', this.order.orderId);
                        } else {
                            this.order.status = 2;
                        }
                    }
                    this.$toast.clear();
                });
            } else {
                postData('/removeOrder', data).then((res) => {
                    if (res.code === 90000) {
                        this.$emit('delete:order', this.order.orderId);
                    }
                    this.$toast.clear();
                });
            }
        },
    },
};
</script>

<style lang="scss">
.order-list {
    background-color: #fff;
    margin: 12px;
    padding: 8px;
    border-radius: 20px;
    margin-top: 18px;

    .order__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        padding: 12px;
    }

    .order__id {
        font-size: 16px;
        color: #969799;
    }

    .order__date {
        font-size: 16px;
        color: #969799;
        padding-left: 10px;
        margin-bottom: 8px;
    }

    .l-flex {
        display: flex;
        align-items: center;
        padding: 8px;
    }

    .order-list__title {
        font-size: 16px;
        color: #323233;
        margin: 12px;
    }

    .order-list__card {
        background-color: #fff;
    }

    .order-list__name {
        font-size: 14px;
        line-height: 28px;
    }

    .order-list__rule {
        color: #969799;
        margin-left: 8px;
    }

    .order-list__receipt {
        justify-content: space-between;
        font-size: 16px;
    }

    .order-list__total {
        color: #ee0a24;
    }

    .order__control {
        padding: 12px;
        text-align: right;
    }

    .order__btn {
        padding: 16px;
    }

    .line {
        position: relative;
    }

    .round {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: #f5f5f5;
        border-radius: 50%;
    }

    .left-round {
        left: -20px;
    }

    .right-round {
        right: -20px;
    }
}
</style>

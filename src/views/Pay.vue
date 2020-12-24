<template>
    <div class="pay">
        <van-nav-bar
            left-text="提交订单"
            left-arrow
            @click-left="goBack"
            fixed
        />
        <h2 class="pay__title" style="margin-top: 65px">收货地址</h2>
        <van-cell :center="true" size="large" is-link @click="showPopup">
            <div class="l-flex">
                <van-icon name="location-o" size="24" />
                <div class="pay__info">
                    <p class="pay__name">
                        {{ currentAddress.name }}
                        <span class="pay__tel">{{ currentAddress.tel }}</span>
                    </p>
                    <p>{{ currentAddress.address }}</p>
                </div>
            </div>
        </van-cell>
        <OrderList :order="order" style="margin-bottom: 85px" />
        <div class="pay__btn">
            <van-button type="info" block round @click="pay">
                立即结算
            </van-button>
        </div>
        <van-popup v-model="isShow" position="bottom" closeable>
            <h2 class="pay__addr">选择收货地址</h2>
            <van-address-list
                :list="list"
                v-model="currentAddress.id"
                default-tag-text="默认"
                @select="selectAddress"
                @add="toAddAddress"
                @edit="toModifyAddress"
            />
        </van-popup>
    </div>
</template>

<script>
import { getData, postData } from '../assets/js/http';
import OrderList from '../components/OrderList';

export default {
    name: 'Pay',
    components: {
        OrderList,
    },
    data() {
        return {
            tokenString: '',
            sids: [],
            list: [],
            currentAddress: {
                id: '',
                name: '',
                tel: '',
                address: '',
            },
            bag: [],
            isShow: false,
        };
    },
    computed: {
        amount() {
            let sum = 0;

            this.bag.forEach((product) => {
                sum += product.count;
            });

            return sum;
        },
        total() {
            let sum = 0;

            this.bag.forEach((product) => {
                sum += product.count * product.price;
            });

            return sum;
        },
        order() {
            return {
                products: this.bag,
                total: this.total,
                amount: this.amount,
            };
        },
    },
    created() {
        this.tokenString = sessionStorage.getItem('token');
        if (!this.tokenString) {
            return;
        }

        this.sids = JSON.parse(sessionStorage.getItem('sids'));

        this.getAddress();
        this.getBagBySids();
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        toAddAddress() {
            this.$router.push({ name: 'AddressModify' });
        },
        toModifyAddress(item) {
            this.$router.push({
                name: 'AddressModify',
                query: { aid: item.id },
            });
        },
        showPopup() {
            this.isShow = !this.isShow;
        },
        getAddress() {
            getData('/findAddress', { tokenString: this.tokenString }).then(
                (res) => {
                    if (res.code === 20000) {
                        res.result.forEach((obj) => {
                            let address =
                                obj.province +
                                obj.city +
                                obj.county +
                                obj.addressDetail;

                            this.list.push({
                                id: obj.aid,
                                name: obj.name,
                                tel: obj.tel,
                                address,
                                isDefault: Boolean(obj.isDefault),
                            });

                            if (obj.isDefault) {
                                this.currentAddress.id = obj.id;
                                this.currentAddress.name = obj.name;
                                this.currentAddress.tel = obj.tel;
                                this.currentAddress.address = address;
                            }
                        });
                    }

                    this.$toast.clear();
                }
            );
        },
        getBagBySids() {
            getData('/commitShopcart', {
                tokenString: this.tokenString,
                sids: JSON.stringify(this.sids),
            }).then((res) => {
                this.bag = res.result;
            });
        },
        selectAddress(item) {
            this.isShow = false;

            for (let key in this.currentAddress) {
                this.currentAddress[key] = item[key];
            }
        },
        pay() {
            if (!this.currentAddress.id) {
                this.isShow = true;
                return;
            }

            let data = {
                tokenString: this.tokenString,
                sids: JSON.stringify(this.sids),
                phone: this.currentAddress.tel,
                address: this.currentAddress.address,
                receiver: this.currentAddress.name,
            };

            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0,
            });

            postData('/pay', data).then((res) => {
                this.$toast.clear();

                if (res.code == 60000) {
                    this.$toast(res.msg);
                }
            });
        },
    },
};
</script>

<style lang="scss">
.pay {
    .pay__title {
        color: #969799;
        font-size: 14px;
        margin-top: 16px;
        padding-left: 8px;
    }

    .l-flex {
        display: flex;
        align-items: center;
        padding: 8px;
    }

    .pay__info {
        padding-left: 12px;
        line-height: 28px;
    }

    .pay__name {
        font-size: 16px;
    }

    .pay__tel {
        font-size: 14px;
        color: #969799;
        margin-left: 8px;
    }

    .pay__addr {
        font-size: 16px;
        text-align: center;
        padding-top: 20px;
    }

    .pay__btn {
        position: fixed;
        bottom: 12px;
        left: 0;
        right: 0;
        padding: 0 12px;
    }
}
</style>

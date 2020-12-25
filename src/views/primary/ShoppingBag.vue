<template>
    <div class="shopping-bag">
        <van-nav-bar
            left-text="购物袋"
            left-arrow
            :fixed="true"
            @click-left="goBack"
            @click-right="editProduct"
        >
            <template #right>
                <span>{{ isEdit ? '完成' : '编辑' }}</span>
            </template>
        </van-nav-bar>
        <div v-if="bag.length > 0">
            <img
                class="shopping-bag__bg"
                src="../../assets/image/icon/shopbag_bg.png"
            />
            <div>
                <div
                    class="shopping-bag__item"
                    v-for="(product, index) in bag"
                    :key="index"
                >
                    <van-checkbox
                        v-model="product.isCheck"
                        @change="checkAllChecked"
                    ></van-checkbox>
                    <img class="shopping-bag__img" :src="product.small_img" />
                    <div class="l-flex--grow">
                        <div>
                            <p class="shopping-bag__name">
                                {{ product.name }}
                                <span class="shopping-bag__rule">{{
                                    product.rule
                                }}</span>
                            </p>
                            <p class="shopping-bag__enname">
                                {{ product.enname }}
                            </p>
                        </div>
                        <div class="l-flex">
                            <span class="shopping-bag__price">
                                ￥{{ product.price }}
                            </span>
                            <van-stepper
                                v-model="product.count"
                                theme="round"
                                button-size="18px"
                                @change="modifyCount(product)"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <van-submit-bar
                :price="total"
                :disabled="total === 0"
                button-text="提交订单"
                button-color="#0066CC"
                @submit="toPay"
            >
                <van-checkbox v-model="isAllChekced" @click="selectAll"
                    >全选</van-checkbox
                >
            </van-submit-bar>
            <van-submit-bar
                v-show="isEdit"
                button-text="删除"
                button-color="#0066CC"
                :disabled="total === 0"
                @submit="deleteProduct"
            >
                <van-checkbox
                    class="l-flex--grow"
                    v-model="isAllChekced"
                    @click="selectAll"
                    >全选</van-checkbox
                >
            </van-submit-bar>
        </div>
        <van-empty v-else description="购物袋空空如也，去逛一逛！">
            <van-button type="info" round @click="toMenu">逛一逛</van-button>
        </van-empty>
    </div>
</template>

<script>
import { getData, postData } from '../../assets/js/http';
import { debounce } from '../../assets/js/util';

export default {
    name: 'ShoppingBag',
    data() {
        return {
            bag: [],
            isAllChekced: false,
            isEdit: false,
        };
    },
    computed: {
        total() {
            let sum = 0;

            for (let product of this.bag) {
                if (product.isCheck) {
                    sum += product.price * product.count;
                }
            }

            sum *= 100;

            return sum;
        },
    },
    created() {
        this.checkBag();
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        toMenu() {
            this.$router.push({ name: 'Menu' });
        },
        toPay() {
            let sids = [];

            this.bag.forEach((product) => {
                if (product.isCheck) {
                    sids.push(product.sid);
                }
            });

            sessionStorage.setItem('sids', JSON.stringify(sids));

            this.$router.push({ name: 'Pay' });
        },
        checkBag() {
            let tokenString = sessionStorage.getItem('token');

            if (!tokenString) {
                return;
            }

            getData('/findAllShopcart', { tokenString }).then((res) => {
                if (res.code === 5000) {
                    res.result.map((product) => {
                        product.isCheck = false;
                    });
                    this.bag = res.result;
                }

                this.$toast.clear();
            });
        },
        selectAll: debounce(function () {
            this.bag.forEach((product) => {
                product.isCheck = this.isAllChekced;
            });
        }, 30),
        checkAllChecked() {
            for (let product of this.bag) {
                if (!product.isCheck) {
                    this.isAllChekced = false;
                    return;
                }
            }

            this.isAllChekced = true;
        },
        modifyCount(product) {
            let tokenString = sessionStorage.getItem('token');

            let data = {
                tokenString,
                sid: product.sid,
                count: product.count,
            };

            postData('/modifyShopcartCount', data).then((res) => {
                if (res.code !== 6000) {
                    console.log(res);
                }
            });
        },
        editProduct: debounce(function () {
            this.isEdit = !this.isEdit;
        }, 50),
        deleteProduct() {
            let sids = [];
            this.bag.forEach((product) => {
                if (product.isCheck) {
                    sids.push(product.sid);
                }
            });

            let data = {
                tokenString: sessionStorage.getItem('token'),
                sids: JSON.stringify(sids),
            };

            postData('/deleteShopcart', data).then((res) => {
                if (res.code === 7000) {
                    for (let i = this.bag.length - 1; i >= 0; i--) {
                        if (this.bag[i].isCheck) {
                            this.bag.splice(i, 1);
                        }
                    }
                }
            });
        },
    },
};
</script>

<style lang="scss">
.shopping-bag {
    margin-bottom: 65px;

    .shopping-bag__bg {
        width: 100%;
        margin-top: 46px;
    }

    .shopping-bag__item {
        display: flex;
        align-items: center;
        padding: 18px;
        line-height: 22px;
    }

    .shopping-bag__img {
        width: 70px;
        height: 70px;
        margin: 0 12px;
    }

    .shopping-bag__name {
        font-size: 16px;
    }

    .shopping-bag__rule {
        font-size: 14px;
        color: #999;
        margin-left: 6px;
    }

    .shopping-bag__enname {
        font-size: 14px;
        color: #999;
    }

    .l-flex {
        display: flex;
        justify-content: space-between;
    }

    .l-flex--grow {
        flex: 1;
    }

    .l-flex--between {
        justify-content: space-between;
    }

    .shopping-bag__price {
        font-size: 16px;
        color: #ee0a24;
    }
}
</style>

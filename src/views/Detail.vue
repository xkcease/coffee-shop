<template>
    <div class="detail">
        <van-nav-bar
            :title="product.name"
            left-arrow
            :fixed="true"
            @click-left="goBack"
        />
        <div>
            <img :src="product.large_img" style="width: 100%" />
            <div class="detail__content">
                <div class="detail__head">
                    <h2 class="detail__title">
                        {{ product.name }}
                    </h2>
                    <span class="detail__price">￥{{ product.price }}</span>
                </div>
                <div class="detail__rules van-hairline--bottom">
                    <div
                        v-for="(rule, ruleIndex) in product.rules"
                        :key="ruleIndex"
                        class="detail__rule"
                    >
                        <h3 class="detail__name">
                            {{ rule.name }}
                        </h3>
                        <span
                            v-for="(option, optionIndex) in rule.options"
                            :key="optionIndex"
                            class="detail__option"
                            :class="{ active: option.isActive }"
                            @click="changeOption(option, ruleIndex)"
                        >
                            {{ option.name }}
                        </span>
                    </div>
                    <div class="detail__control">
                        <van-stepper
                            theme="round"
                            v-model="count"
                            button-size="18"
                        />
                    </div>
                </div>
                <div class="detail__desc">
                    <h2 class="detail__title">商品描述</h2>
                    <p
                        class="detail__text"
                        v-for="(text, index) in descArray"
                        :key="index"
                    >
                        {{ index + 1 }}、{{ text }}
                    </p>
                </div>
            </div>
        </div>
        <van-goods-action>
            <van-goods-action-icon
                :badge="bagCount"
                icon="cart-o"
                text="购物车"
            />
            <van-goods-action-icon
                :color="isLike ? '#0099CC' : '#323233'"
                :icon="isLike ? 'star' : 'star-o'"
                text="收藏"
                @click="toggleLike"
            />
            <van-goods-action-button
                type="warning"
                text="加入购物车"
                color="#0099CC"
                @click="addToBag"
            />
            <van-goods-action-button
                type="danger"
                text="立即购买"
                color="#0066CC"
            />
        </van-goods-action>
    </div>
</template>

<script>
import { getData, postData } from '../assets/js/http';

export default {
    name: 'Detail',
    data() {
        return {
            pid: null,
            product: {},
            descArray: [],
            isLike: false,
            count: 1,
            bagCount: 0,
        };
    },
    created() {
        this.pid = this.$route.query.pid;
        this.findLike();
        this.checkBag();
        this.getProductDetail();
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        getProductDetail() {
            getData('/productDetail', { pid: this.pid }).then((res) => {
                let product = res.result[0];

                this.descArray = product.desc.split('\n');

                // 选项数据处理
                let rulesName = ['tem', 'sugar', 'cream', 'milk'];
                let rules = [];

                for (let name of rulesName) {
                    if (product[name]) {
                        let rule = {
                            name: product[name + '_desc'],
                            options: [],
                        };

                        let optionsName = product[name].split('/');
                        optionsName.forEach((name, index) => {
                            let option = {
                                name: name,
                                isActive: index === 0,
                            };

                            rule.options.push(option);
                        });

                        rules.push(rule);
                    }
                }

                product.rules = rules;
                this.product = product;

                console.log(this.product);
                this.$toast.clear();
            });
        },
        changeOption(option, ruleIndex) {
            if (!option.isActive) {
                for (let item of this.product.rules[ruleIndex].options) {
                    if (item.isActive) {
                        item.isActive = false;
                    }
                }

                option.isActive = true;
            }
        },
        findLike() {
            let tokenString = sessionStorage.getItem('token');

            if (!tokenString) {
                return;
            }

            getData('/findlike', { tokenString, pid: this.pid }).then((res) => {
                if (res.code === 1000 && res.result.length === 1) {
                    this.isLike = true;
                }
            });
        },
        toggleLike() {
            let tokenString = sessionStorage.getItem('token');

            if (!tokenString) {
                this.$router.push({ name: 'Login' });
                return;
            }

            let url = this.isLike ? '/notlike' : '/like';

            postData(url, { tokenString, pid: this.pid }).then((res) => {
                if (res.code === 700) {
                    console.log('err');
                } else if (res.code === 800) {
                    this.isLike = true;
                } else if (res.code === 900) {
                    this.isLike = false;
                }
            });
        },
        checkBag() {
            let tokenString = sessionStorage.getItem('token');

            if (!tokenString) {
                return;
            }

            getData('/findAllShopcart', { tokenString }).then((res) => {
                if (res.code === 5000) {
                    console.log(res);
                    this.bagCount = res.result.length;
                }
            });
        },
        addToBag() {
            let tokenString = sessionStorage.getItem('token');

            if (!tokenString) {
                this.$router.push({ name: 'Login' });
                return;
            }

            let rule = [];

            for (let r of this.product.rules) {
                for (let option of r.options) {
                    if (option.isActive) {
                        rule.push(option.name);
                        break;
                    }
                }
            }

            let data = {
                tokenString,
                pid: this.pid,
                count: this.count,
                rule: rule.join('/'),
            };

            this.$toast.loading({
                message: '加载中...',
                duration: 0,
                forbidClick: true,
            });

            postData('/addShopcart', data).then((res) => {
                if (res.status === 1) {
                    this.bagCount++;
                }
                this.$toast.clear();
            });
        },
    },
};
</script>

<style lang="scss">
.detail {
    .detail__content {
        padding: 12px;
    }

    .detail__head {
        display: flex;
        justify-content: space-between;
    }

    .detail__price {
        font-size: 20px;
        color: #ee0a24;
    }

    .detail__rules {
        padding-bottom: 12px;
        margin-bottom: 24px;
    }

    .detail__rule {
        display: flex;
        font-size: 12px;
        line-height: 26px;
        margin-bottom: 16px;
    }

    .detail__name {
        width: 60px;
        font-size: 14px;
        color: #444;
    }

    .detail__option {
        display: inline-block;
        width: 70px;
        text-align: center;
        margin-left: 18px;
        border-radius: 20px;
        background-color: #ebebeb;
        color: #6a6a6a;
        cursor: pointer;

        &.active {
            color: #fff;
            background-color: #6a91ec;
        }
    }

    .detail__control {
        text-align: right;
    }

    .detail__desc {
        color: #2c3e50;
    }

    .detail__title {
        font-size: 20px;
        margin-bottom: 14px;
    }

    .detail__text {
        font-size: 12px;
        line-height: 24px;
    }
}
</style>

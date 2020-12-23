<template>
    <div class="menu">
        <div class="menu__topbar">
            <van-search
                v-model="keyword"
                @input="searchProduct"
                placeholder="请输入搜索关键词"
            />
            <div class="menu__tabs">
                <div
                    class="menu__type--wrap"
                    v-for="type in typeData"
                    :key="type.type"
                    @click="changeTab(type)"
                >
                    <img
                        class="menu__type"
                        :src="type.isActive ? type.activeIcon : type.icon"
                    />
                    <span>{{ type.typeDesc }}</span>
                </div>
            </div>
        </div>
        <div class="menu__tab">
            <ol>
                <li
                    class="menu__item"
                    v-for="product in products"
                    :key="product.pid"
                    @click="viewProduct(product.pid)"
                >
                    <van-card
                        class="menu__card"
                        :price="product.price"
                        :title="product.name"
                        :desc="product.desc"
                        :thumb="product.smallImg"
                    ></van-card>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
import { getData } from '../../assets/js/http';
import { throttle } from '../../assets/js/util';

export default {
    name: 'Menu',
    data() {
        return {
            typeData: [
                {
                    type: 'isHot',
                    typeDesc: '推荐',
                    icon: require('../../assets/image/icon/icons_09.gif'),
                    activeIcon: require('../../assets/image/icon/icons_21.gif'),
                    isActive: true,
                },
                {
                    type: 'latte',
                    typeDesc: '拿铁',
                    icon: require('../../assets/image/icon/icons_05.gif'),
                    activeIcon: require('../../assets/image/icon/icons_19.gif'),
                    isActive: false,
                },
                {
                    type: 'coffee',
                    typeDesc: '咖啡',
                    icon: require('../../assets/image/icon/icons_03.gif'),
                    activeIcon: require('../../assets/image/icon/icons_18.gif'),
                    isActive: false,
                },
                {
                    type: 'rena_ice',
                    typeDesc: '瑞纳冰',
                    icon: require('../../assets/image/icon/icons_07.gif'),
                    activeIcon: require('../../assets/image/icon/icons_20.gif'),
                    isActive: false,
                },
            ],
            products: [],
            keyword: '',
            selectedType: '',
        };
    },
    created() {
        this.getProductsByType(this.typeData[0]);
        this.selectedType = this.typeData[0];
    },
    methods: {
        getProductsByType(item) {
            this.products = [];

            let data = sessionStorage.getItem(item.type);
            if (data) {
                this.products = JSON.parse(data);
                this.$toast.clear();

                return;
            }

            this.$toast.loading({
                message: '加载中...',
                duration: 0,
                forbidClick: true,
            });

            let params = {
                key: 'type',
                value: item.type,
            };

            if (item.type === 'isHot') {
                params.key = 'isHot';
                params.value = 1;
            }

            getData('/typeProducts', params).then((res) => {
                this.products = res.result;
                this.$toast.clear();
                sessionStorage.setItem(
                    item.type,
                    JSON.stringify(this.products)
                );
            });
        },
        changeTab(type) {
            if (type.isActive) {
                return;
            }

            for (let temp of this.typeData) {
                if (temp.isActive) {
                    temp.isActive = false;
                    break;
                }
            }
            type.isActive = true;
            this.selectedType = type;

            this.getProductsByType(type);
        },
        searchProduct: throttle(function () {
            if (!this.keyword) {
                this.getProductsByType(this.selectedType);
                return;
            }

            this.$toast.loading({
                message: '加载中...',
                duration: 0,
                forbidClick: true,
            });

            getData('/search', { name: this.keyword }).then((res) => {
                this.products = res.result;
                this.$toast.clear();
            });
        }, 200),
        viewProduct(pid) {
            this.$router.push({ name: 'Detail', query: { pid } });
        },
    },
};
</script>

<style lang="scss">
.menu {
    margin-bottom: 55px;

    .menu__topbar {
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 555;
    }

    .menu__tabs {
        display: flex;
        background-color: #fff;
        padding-top: 8px;
        padding-bottom: 20px;
    }

    .menu__type--wrap {
        margin-left: 20px;
        text-align: center;

        span {
            display: block;
            font-size: 16px;
        }
    }

    .menu__type {
        width: 40px;
        height: 40px;
    }

    .menu__tab {
        margin: 12px;
        margin-top: 150px;
    }

    .menu__item {
        margin-bottom: 12px;
        margin-right: 12px;
    }

    .menu__card {
        background-color: #fff;
        border-radius: 20px;
    }
}

.van-card__title {
    font-size: 14px;
    line-height: 24px;
}
</style>

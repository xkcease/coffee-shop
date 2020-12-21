<template>
    <div class="primary">
        <router-view />
        <van-tabbar v-model="tabbarIndex" active-color="#0C34BA" route>
            <van-tabbar-item
                v-for="(item, index) in tabbarData"
                :key="index"
                :to="item.url"
            >
                <span>{{ item.title }}</span>
                <template #icon="props">
                    <img
                        :src="
                            props.active ? item.icon.active : item.icon.inactive
                        "
                    />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'Primary',
    data() {
        return {
            tabbarIndex: 0,
            tabbarData: [
                {
                    title: '首页',
                    icon: {
                        active: require('../assets/image/icon/tabbar_18.png'),
                        inactive: require('../assets/image/icon/tabbar_03.png'),
                    },
                    url: {
                        name: 'Home',
                    },
                },
                {
                    title: '菜单',
                    icon: {
                        active: require('../assets/image/icon/tabbar_19.png'),
                        inactive: require('../assets/image/icon/tabbar_05.png'),
                    },
                    url: {
                        name: 'Menu',
                    },
                },
                {
                    title: '购物袋',
                    icon: {
                        active: require('../assets/image/icon/tabbar_21.png'),
                        inactive: require('../assets/image/icon/tabbar_09.png'),
                    },
                    url: {
                        name: 'ShoppingBag',
                    },
                },
                {
                    title: '我的',
                    icon: {
                        active: require('../assets/image/icon/tabbar_22.png'),
                        inactive: require('../assets/image/icon/tabbar_11.png'),
                    },
                    url: {
                        name: 'My',
                    },
                },
            ],
        };
    },
};
</script>

<style lang="scss">
.primary {
}
</style>

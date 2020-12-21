<template>
    <div class="shopping-bag">
        <van-nav-bar
            title="购物袋"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <van-empty description="购物袋空空如也，去逛一逛！">
            <van-button type="info" round @click="toMenu">逛一逛</van-button>
        </van-empty>
    </div>
</template>

<script>
export default {
    name: 'ShoppingBag',
    created() {
        this.$toast.clear();
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        toMenu() {
            this.$router.push({ name: 'Menu' });
        },
    },
};
</script>

<style lang="scss">
</style>

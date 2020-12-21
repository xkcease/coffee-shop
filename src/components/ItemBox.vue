<template>
    <div class="item-box">
        <span class="item-box__price">￥ {{ item.price }}</span>
        <img class="item-box__img" :src="item.smallImg" />
        <span class="item-box__name">{{ item.name }}</span>
    </div>
</template>

<script>
export default {
    name: 'ItemBox',
    props: {
        item: Object,
    },
};
</script>

<style lang="scss">
.item-box {
    overflow: hidden;
    border-radius: 16px;
    position: relative;

    .item-box__price {
        display: inline-block;
        font-size: 12px;
        color: rgb(119, 177, 201);
        background-color: rgba(167, 167, 161, 0.2);
        padding: 8px;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 5px;
    }

    .item-box__img {
        width: 100%;
        height: 100%;
    }

    .item-box__name {
        display: inline-block;
        width: 100%;
        font-size: 18px;
        color: rgb(236, 234, 86, 0.7);
        background-color: rgb(221, 223, 204, 0.2);
        padding: 8px;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 8px;
    }
}
</style>

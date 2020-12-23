<template>
    <div class="my">
        <van-cell class="my__cell" :center="true" is-link>
            <div class="my__info">
                <img class="my__img" :src="user.userImg" />
                <div class="l-flex">
                    <p class="my__name">{{ user.nickName }}</p>
                    <p class="my__desc">
                        {{ user.desc || '这个家伙很懒，什么都没留下！' }}
                    </p>
                </div>
            </div>
        </van-cell>
        <van-cell-group class="my__cell">
            <van-cell title="收货地址" :to="{ name: 'Address' }" is-link />
            <van-cell title="我的订单" is-link />
        </van-cell-group>
        <van-cell class="my__cell" title="我的收藏" is-link />
        <van-cell
            class="my__cell"
            title="账号与安全"
            :to="{ name: 'Security' }"
            is-link
        />
    </div>
</template>

<script>
import { getData } from '../../assets/js/http';

export default {
    name: 'My',
    data() {
        return {
            user: {},
        };
    },
    created() {
        this.getUser();
    },
    methods: {
        getUser() {
            let tokenString = sessionStorage.getItem('token');
            if (!tokenString) {
                this.$toast.clear();
                this.$router.push({ name: 'Login' });
                return;
            }

            getData('/findMy', { tokenString }).then((res) => {
                if (res.code === 'A001' && res.result.length > 0) {
                    this.user = res.result[0];
                }

                this.$toast.clear();
            });
        },
    },
};
</script>

<style lang="scss">
.my {
    .my__cell {
        margin-bottom: 12px;
    }

    .my__info {
        display: flex;
        padding: 20px 0;
    }

    .my__img {
        width: 60px;
        border-radius: 5px;
        margin-right: 14px;
    }

    .my__name {
        font-size: 16px;
        margin-bottom: 8px;
    }

    .my__desc {
        font-size: 12px;
        color: #969799;
    }
}
</style>

<template>
    <div class="security">
        <van-nav-bar left-text="账号与安全" left-arrow @click-left="goBack" />
        <van-cell-group>
            <van-cell title="修改密码" clickable @click="isShow = true" />
            <van-cell title="注销账号" clickable />
        </van-cell-group>
        <van-cell class="security__cell">
            <span class="security__logout">退出登录</span>
        </van-cell>
        <van-popup v-model="isShow" position="bottom" :closeable="true" round>
            <div class="">
                <van-form ref="registerForm">
                    <van-field
                        type="password"
                        label="密码"
                        label-width="4.2em"
                        placeholder="密码为字母开头,5-15位"
                        v-model="userRegister.password"
                        :rules="registerRules.password"
                    />
                    <van-button
                        style="margin: 14px 0"
                        type="info"
                        block
                        round
                        @click="modifyPassword"
                        >修改密码</van-button
                    >
                </van-form>
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'Security',
    data() {
        return {
            isShow: false,
        };
    },
    created() {
        this.$toast.clear();
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        modifyPassword() {},
    },
};
</script>

<style lang="scss">
.security {
    .security__cell {
        margin-top: 12px;
        cursor: pointer;
    }

    .security__logout {
        display: block;
        text-align: center;
    }
}
</style>

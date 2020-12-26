<template>
    <div class="security">
        <van-nav-bar left-text="账号与安全" left-arrow @click-left="goBack" />
        <van-cell-group>
            <van-cell title="修改密码" clickable @click="isShow = true" />
            <van-cell title="注销账号" clickable @click="destroyAccount" />
        </van-cell-group>
        <van-cell class="security__cell">
            <span class="security__logout" @click="logout">退出登录</span>
        </van-cell>
        <van-popup v-model="isShow" position="bottom" :closeable="true" round>
            <div class="security__change">
                <h2 class="security__title">修改密码</h2>
                <van-form ref="passwordForm">
                    <van-field
                        type="password"
                        label="旧密码"
                        label-width="4.2em"
                        placeholder="密码为字母开头,5-15位"
                        v-model="oldPassword"
                        :rules="rules.password"
                    />
                    <van-field
                        type="password"
                        label="新密码"
                        label-width="4.2em"
                        placeholder="密码为字母开头,5-15位"
                        v-model="newPassword"
                        :rules="rules.password"
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
import { postData } from '../../assets/js/http';
import { mapState } from 'vuex';

export default {
    name: 'Security',
    data() {
        return {
            isShow: false,
            oldPassword: '',
            newPassword: '',
            rules: {
                password: [
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'onBlur',
                    },
                    {
                        pattern: /^[A-Za-z]\w{5,15}$/,
                        message: '密码为字母开头,5-15位',
                        trigger: 'onBlur',
                    },
                ],
            },
        };
    },
    computed: {
        ...mapState(['tokenString']),
    },
    created() {
        this.$toast.clear();
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        modifyPassword() {
            this.$refs.passwordForm.validate().then(() => {
                postData('/updatePassword', {
                    tokenString: this.tokenString,
                    oldPassword: this.oldPassword,
                    password: this.newPassword,
                }).then((res) => {
                    if (res.code === 'E001') {
                        sessionStorage.removeItem('token');
                        this.$router.push({ name: 'Login' });
                    }
                });
            });
        },
        destroyAccount() {
            this.$dialog
                .confirm({
                    title: '注销账号',
                    message: '是否确认注销账号，一旦确认无法恢复',
                })
                .then(() => {
                    postData('/destroyAccount', {
                        tokenString: this.tokenString,
                    }).then((res) => {
                        if (res.code === 'G001') {
                            sessionStorage.removeIrem('token');
                            this.$router.push({ name: 'Login' });
                        }
                    });
                });
        },
        logout() {
            this.$dialog
                .confirm({
                    title: '退出登录',
                    message: '是否确认退出登录！',
                })
                .then(() => {
                    sessionStorage.removeItem('token');
                    this.$router.push({ name: 'Login' });
                });
        },
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

    .security__change {
        padding: 32px;
        text-align: center;
    }

    .security__title {
        font-size: 18px;
        padding-bottom: 18px;
    }
}
</style>

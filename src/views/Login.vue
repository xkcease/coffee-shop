<template>
    <div class="login">
        <nav class="login__topbar">
            <div>
                <img class="login__brand" src="../assets/image/125.png" />
                <h2 class="login__title">Coffee</h2>
            </div>
            <div>
                <router-link :to="{ name: 'Home' }" class="login__shopping"
                    >逛一逛</router-link
                >
            </div>
        </nav>
        <div class="login__logo--wrap">
            <img class="login__logo" src="../assets/image/125.png" />
        </div>
        <div class="login__form--wrap">
            <p v-show="isShowError" class="login__error">手机号或密码错误</p>
            <van-form ref="loginForm">
                <van-field
                    type="tel"
                    label="手机号"
                    label-width="4.2em"
                    v-model="userLogin.phone"
                    :rules="loginRules.phone"
                    @focus="isShowError = false"
                />
                <van-field
                    type="password"
                    label="密码"
                    label-width="4.2em"
                    v-model="userLogin.password"
                    :rules="loginRules.password"
                    @focus="isShowError = false"
                />
                <van-button
                    style="margin: 12px 0"
                    type="info"
                    native-type="submit"
                    block
                    @click="login"
                    >登录</van-button
                >
                <van-button type="default" block @click="showRegister"
                    >注册</van-button
                >
            </van-form>
        </div>
        <van-popup
            v-model="isShowRegister"
            position="bottom"
            :closeable="true"
            round
        >
            <div class="login__register">
                <van-form ref="registerForm">
                    <p
                        v-show="isShowExist"
                        class="login__error"
                        style="text-align: center"
                    >
                        手机号已存在
                    </p>
                    <van-field
                        type="text"
                        label="昵称"
                        label-width="4.2em"
                        placeholder="不少于1个字符"
                        v-model="userRegister.nickName"
                        :rules="registerRules.nickName"
                        @focus="isShowExist = false"
                    />
                    <van-field
                        type="tel"
                        label="手机号"
                        label-width="4.2em"
                        v-model="userRegister.phone"
                        :rules="registerRules.phone"
                        @focus="isShowExist = false"
                    />
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
                        @click="register"
                        >注册</van-button
                    >
                </van-form>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { postData } from '../assets/js/http';
import { mapMutations } from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            userLogin: {
                phone: '',
                password: '',
            },
            userRegister: {
                nickName: '',
                phone: '',
                password: '',
            },
            loginRules: {
                phone: [
                    {
                        required: true,
                        message: '手机不能为空',
                        trigger: 'onBlur',
                    },
                ],
                password: [
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'onBlur',
                    },
                ],
            },
            registerRules: {
                nickName: [
                    {
                        required: true,
                        message: '昵称不能为空',
                        trigger: 'onBlur',
                    },
                    {
                        pattern: /^[\w\u4e00-\u9fa5]{1,10}$/,
                        message: '昵称格式不对',
                        trigger: 'onBlur',
                    },
                ],
                phone: [
                    {
                        required: true,
                        message: '手机不能为空',
                        trigger: 'onBlur',
                    },
                    {
                        pattern: /^1[3-9]\d{9}$/,
                        message: '手机号格式错误',
                        trigger: 'onBlur',
                    },
                ],
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
            isShowRegister: false,
            isShowError: false,
            isShowExist: false,
        };
    },
    methods: {
        ...mapMutations(['setTokenString']),
        showRegister() {
            this.isShowRegister = !this.isShowRegister;
        },
        login() {
            this.$refs.loginForm.validate().then(() => {
                let data = {
                    phone: this.userLogin.phone,
                    password: this.userLogin.password,
                };

                postData('/login', data).then((res) => {
                    if (res.code !== 200) {
                        this.isShowError = true;
                        return;
                    }
                    sessionStorage.setItem('token', res.token);
                    this.setTokenString({ tokenString: res.token });

                    this.$router.push({ name: 'Home' });
                });
            });
        },
        register() {
            this.$refs.registerForm.validate().then(() => {
                let data = {
                    nickName: this.userRegister.nickName,
                    phone: this.userRegister.phone,
                    password: this.userRegister.password,
                };

                postData('/register', data).then((res) => {
                    console.log(res.data);
                    if (res.code !== 100) {
                        this.isShowExist = false;
                        return;
                    }

                    this.$toast.success({ message: '注册成功', duration: 800 });
                    this.isShowRegister = false;
                });
            });
        },
    },
};
</script>

<style lang="scss">
.login {
    width: 100%;
    height: 100%;

    .login__topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 10px;
    }

    .login__brand {
        width: 46px;
        height: 46px;
        vertical-align: middle;
    }

    .login__title {
        display: inline-block;
        font-size: 26px;
        vertical-align: middle;
        margin-left: 12px;
    }

    .login__shopping {
        font-size: 14px;
        margin-right: 8px;
        color: rgb(151, 100, 245);
        cursor: pointer;
    }

    .login__logo--wrap {
        width: 100%;
        height: 150px;
        text-align: center;
        margin: 40px 0;
    }

    .login__logo {
        width: 150px;
        height: 150px;
    }

    .login__form--wrap {
        padding: 0 24px;
    }

    .login__error {
        color: #ee0a24;
        font-size: 0.32rem;
        text-align: right;
    }

    .login__register {
        padding: 16px;
        padding-top: 26px;
    }
}
</style>

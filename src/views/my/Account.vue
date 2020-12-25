<template>
    <div class="account">
        <van-nav-bar left-text="个人信息" left-arrow @click-left="goBack" />
        <div>
            <van-cell title="头像" is-link center>
                <van-uploader>
                    <img class="account__img" :src="user.userImg" />
                </van-uploader>
            </van-cell>
            <van-cell title="id" :value="user.userId" />
            <van-cell title="手机号" :value="user.phone" />
            <van-form>
                <van-field
                    type="text"
                    label="昵称"
                    label-width="4.2em"
                    placeholder="不少于1个字符"
                    v-model="user.nickName"
                    input-align="right"
                />
                <van-field
                    v-model="user.desc"
                    rows="2"
                    autosize
                    label="简介"
                    type="textarea"
                    placeholder="这个家伙很懒，什么都没留下！"
                />
            </van-form>
        </div>
    </div>
</template>

<script>
import { getData } from '../../assets/js/http';

export default {
    name: 'Account',
    data() {
        return {
            user: {},
            tokenString: '',
        };
    },
    created() {
        this.tokenString = sessionStorage.getItem('token');

        this.getUser();
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        getUser() {
            getData('/findAccountInfo', { tokenString: this.tokenString }).then(
                (res) => {
                    console.log(res);
                    if (res.code === 'B001') {
                        this.user = res.result[0];
                    }
                    this.$toast.clear();
                }
            );
        },
    },
};
</script>

<style lang="scss">
.account {
    .account__img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
}
</style>

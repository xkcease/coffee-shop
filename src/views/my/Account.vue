<template>
    <div class="account">
        <van-nav-bar left-text="个人信息" left-arrow @click-left="goBack" />
        <div>
            <van-cell title="头像" is-link center>
                <van-uploader :after-read="uploadImg">
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
                    @change="updateMessage('nickName')"
                />
                <van-field
                    v-model="user.desc"
                    rows="2"
                    autosize
                    label="简介"
                    type="textarea"
                    placeholder="这个家伙很懒，什么都没留下！"
                    @change="updateMessage('desc')"
                />
            </van-form>
        </div>
    </div>
</template>

<script>
import { getData, postData } from '../../assets/js/http';

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
        uploadImg(file) {
            let type = file.file.type.split('/')[1];
            let imgTypes = ['png', 'gif', 'jpg', 'jpeg'];

            if (imgTypes.indexOf(type) === -1) {
                this.$toast({
                    message: '图片类型只支持' + imgTypes.join(','),
                });

                return;
            }

            let maxSize = 1 * 1024 * 1024;
            if (maxSize < file.file.size) {
                this.$toast({
                    message:
                        '上传文件大小不能超过' + this.maxSize / 1024 + 'KB',
                });

                return;
            }

            let base64 = file.content.replace(
                /data:image\/[A-Za-z]+;base64,/,
                ''
            );

            postData('/updateAvatar', {
                tokenString: this.tokenString,
                imgType: type,
                serverBase64Img: base64,
            }).then((res) => {
                if (res.code === 'H001') {
                    this.user.userImg = res.userImg;
                }
            });
        },
        updateMessage(key) {
            let url = '';

            if (key === 'nickName') {
                url = '/updateNickName';
            } else {
                url = '/updateDesc';
            }

            postData(url, {
                tokenString: this.tokenString,
                [key]: this.user[key],
            }).then((res) => {
                console.log(res);
            });
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

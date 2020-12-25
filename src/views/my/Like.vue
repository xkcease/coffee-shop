<template>
    <div class="like">
        <van-nav-bar left-text="我的收藏" left-arrow @click-left="goBack" />
        <div v-if="likeData.length">
            <ol>
                <li
                    class="like__item"
                    v-for="(p, index) in likeData"
                    :key="index"
                    @click="toDetail(p.pid)"
                >
                    <van-card
                        class="like__card"
                        :title="p.name"
                        :desc="p.enname"
                        :price="p.price"
                        :thumb="p.smallImg"
                    >
                        <template #footer>
                            <van-icon
                                name="delete"
                                size="24"
                                @click.stop="deleteLike(p.pid, index)"
                            />
                        </template>
                    </van-card>
                </li>
            </ol>
        </div>
        <van-empty v-else description="没有收藏喔~!" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getData, postData } from '../../assets/js/http';

export default {
    name: 'Like',
    data() {
        return {
            likeData: [],
        };
    },
    computed: {
        ...mapState(['tokenString']),
    },
    created() {
        this.getLikeData();
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        getLikeData() {
            getData('/findAllLike', { tokenString: this.tokenString }).then(
                (res) => {
                    if (res.code === 2000) {
                        this.likeData = res.result;
                    }
                    this.$toast.clear();
                }
            );
        },
        toDetail(pid) {
            this.$router.push({ name: 'Detail', query: { pid } });
        },
        deleteLike(pid, index) {
            postData('/notlike', { tokenString: this.tokenString, pid }).then(
                (res) => {
                    if (res.code === 900) {
                        this.likeData.splice(index, 1);
                    }
                }
            );
        },
    },
};
</script>

<style lang="scss">
.like {
    .like__item {
        background-color: #fff;
        margin: 12px;
        padding: 12px;
        border-radius: 20px;
    }

    .like__card {
        background-color: #fff;
    }
}
</style>

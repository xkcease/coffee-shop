<template>
    <div class="home">
        <div class="home__greet--wrap van-hairline--bottom">
            <p class="home__greet">{{ timeText }} {{ user.nickName }}</p>
        </div>
        <div class="home__swipe--wrap">
            <van-swipe class="home__swipe" autoplay="2500">
                <van-swipe-item
                    v-for="(banner, bannerIndex) in banners"
                    :key="bannerIndex"
                >
                    <img class="home__banner" :src="banner.bannerImg" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="home__recommend">
            <h2 class="van-hairline--bottom home__title">热门推荐</h2>
            <div class="home__list">
                <ItemBox
                    class="home__item"
                    v-for="item in hotItem"
                    :key="item.id"
                    :item="item"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ItemBox from '../../components/ItemBox';
import { getAllData } from '../../assets/js/http';

export default {
    name: 'Home',
    components: {
        ItemBox,
    },
    data() {
        return {
            banners: [],
            hotItem: [],
            user: {},
            timeText: '',
        };
    },
    methods: {
        getTime() {
            let hours = new Date().getHours();
            if (hours >= 6 && hours < 12) {
                this.timeText = '早上好';
            } else if (hours >= 12 && hours < 18) {
                this.timeText = '下午好';
            } else if (hours >= 18 && hours < 24) {
                this.timeText = '晚上好';
            } else {
                this.timeText = '深夜好';
            }
        },
    },
    created() {
        this.getTime();

        let requestArray = [
            {
                url: '/banner',
            },
            {
                url: '/typeProducts',
                params: { key: 'isHot', value: 1 },
            },
        ];

        if (sessionStorage.getItem('token')) {
            requestArray.push({
                url: '/findMy',
                params: { tokenString: sessionStorage.getItem('token') },
            });
        }

        getAllData(requestArray).then((res) => {
            this.banners = res[0].data.result;
            this.hotItem = res[1].data.result;
            this.user = res[2]?.data?.result ?? {};

            this.$toast.clear();
        });
    },
};
</script>

<style lang="scss">
.home {
    margin-bottom: 50px;

    .home__greet--wrap {
        position: fixed;
        width: 100%;
        z-index: 555;
    }

    .home__greet {
        font-size: 14px;
        padding: 12px;
        background-color: #fff;
    }

    .home__swipe--wrap {
        text-align: center;
        padding: 12px;
        padding-top: 50px;
    }

    .home__swipe {
        width: 100%;
        height: 200px;
        border-radius: 20px;
    }

    .home__banner {
        width: 100%;
        height: 200px;
    }

    .home__recommend {
        margin-top: 20px;

        padding: 12px;
    }

    .home__title {
        font-size: 16px;
        font-weight: 600;
        padding-bottom: 12px;
    }

    .home__list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 12px;
    }

    .home__item {
        width: 170px;
        height: 170px;
        margin-bottom: 12px;
    }
}
</style>

<template>
    <div class="address">
        <van-nav-bar left-text="收货地址" left-arrow @click-left="goBack" />
        <van-address-list
            v-model="selectedId"
            :list="list"
            default-tag-text="默认"
            @add="toAddAddress"
            @edit="toEditAddress"
        />
    </div>
</template>

<script>
import { getData } from '../../assets/js/http';

export default {
    name: 'Address',
    data() {
        return {
            list: [],
            selectedId: '',
        };
    },
    created() {
        this.getAddress();
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        getAddress() {
            let tokenString = sessionStorage.getItem('token');
            if (!tokenString) {
                return;
            }

            getData('/findAddress', { tokenString }).then((res) => {
                if (res.code === 20000) {
                    res.result.forEach((obj) => {
                        this.list.push({
                            id: obj.aid,
                            name: obj.name,
                            tel: obj.tel,
                            address:
                                obj.province +
                                obj.city +
                                obj.county +
                                obj.addressDetail,
                            isDefault: Boolean(obj.isDefault),
                        });
                    });
                }

                this.$toast.clear();
            });
        },
        toAddAddress() {
            this.$router.push({ name: 'AddressModify' });
        },
        toEditAddress(item) {
            this.$router.push({
                name: 'AddressModify',
                query: { aid: item.id },
            });
        },
    },
};
</script>

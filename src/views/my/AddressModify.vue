<template>
    <div class="address-modify">
        <van-nav-bar left-text="添加地址" left-arrow @click-left="goBack" />
        <van-address-edit
            :area-list="areaList"
            :address-info="addressInfo"
            :show-delete="Boolean(aid)"
            show-postal
            show-detail
            show-set-default
            @save="saveAddress"
            @delete="deleteAddress"
        />
    </div>
</template>

<script>
import areaList from '../../assets/js/areaList';
import { getData, postData } from '../../assets/js/http';

export default {
    name: 'AddressModify',
    data() {
        return {
            areaList,
            addressInfo: {
                id: '',
                name: '',
                tel: '',
                province: '',
                city: '',
                county: '',
                addressDetail: '',
                areaCode: '',
                postalCode: '',
                isDefault: false,
            },
            aid: '',
        };
    },
    created() {
        this.aid = this.$route.query.aid;

        if (this.aid) {
            this.getAddress();
        } else {
            this.$toast.clear();
        }
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

            getData('/findAddressByAid', { tokenString, aid: this.aid }).then(
                (res) => {
                    if (res.code === 40000) {
                        for (let key in this.addressInfo) {
                            if (key === 'isDefault') {
                                this.addressInfo[key] = Boolean(
                                    res.result[0][key]
                                );
                            } else if (key === 'id') {
                                this.addressInfo[key] = res.result[0].aid;
                            } else {
                                this.addressInfo[key] = res.result[0][key];
                            }
                        }
                    }

                    this.$toast.clear();
                }
            );
        },
        saveAddress(content) {
            let tokenString = sessionStorage.getItem('token');

            let address = JSON.parse(JSON.stringify(content));

            Reflect.deleteProperty(address, 'id');
            Reflect.deleteProperty(address, 'country');
            address.aid = this.aid;
            address.isDefault = Number(address.isDefault);

            if (this.aid) {
                postData('/editAddress', { tokenString, ...address }).then(
                    (res) => {
                        if (res.code === 30000) {
                            this.goBack();
                        }
                    }
                );
            } else {
                postData('/addAddress', { tokenString, ...address }).then(
                    (res) => {
                        if (res.code === 9000) {
                            this.goBack();
                        }
                    }
                );
            }
        },
        deleteAddress() {
            let tokenString = sessionStorage.getItem('token');

            postData('/deleteAddress', { tokenString, aid: this.aid }).then(
                (res) => {
                    if (res.code === 10000) {
                        this.goBack();
                    }
                }
            );
        },
    },
};
</script>

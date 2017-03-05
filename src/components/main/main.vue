<template>
    <div class="main">
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="shops">商家</router-link>
            </div>
        </div>
        <div class="content">
           <keep-alive>
               <router-view :seller="seller"></router-view>
           </keep-alive>
        </div>
    </div>
</template>

<script>
    /** 状态常量，请求正确回复ok对应1**/
    const ok = 1;
    import header from 'components/header/header.vue';
    export default {
        data () {
         return {
             seller: {}
         };
        },
        components: {
            'v-header': header
        },
        created () {
            this.$http.get('/api/seller').then((res) => {
                 let seller = res.body.data;
                 let status = res.body.status;
                 if (status === ok) {
                    this.seller = seller;
                    console.log(this.seller);
                 }
            }, (res) => {

            });
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .tab
        display: flex
        width: 100%
        height: 40px
        border-1px(rgba(7,17,27,0.1))
        .tab-item
            flex: 1
            text-align: center
            line-height: 40px
            &>a
                display:block
                font-size:14px
                color:rgb(77,85,93)
                &.router-link-active
                    color:rgb(240,20,20)
</style>

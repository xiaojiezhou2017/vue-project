<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64" alt="头像">
            </div>
            <div class="content">
                <span class="brand"></span>
                <span class="title">{{seller.name}}</span>
                <p class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </p>
                <p v-if="seller.supports" class="note">
                    <i class="icon" :class="classMap[seller.supports[0].type]"></i>
                    <span class="text">{{seller.supports[0].description}}</span>
                </p>
            </div>
            <div v-if="seller.supports" class="count-wrapper" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="report" @click="showDetail">
            <span class="report-title"></span>
            <span class="report-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h2 class="title">{{seller.name}}</h2>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="line-title-wrapper">
                            <line-title text="优惠信息"></line-title>
                        </div>
                        <ul v-if="seller.supports" class="support">
                            <li v-for="item in seller.supports" class="support-item">
                                <i :class="classMap[item.type]" class="icon"></i>
                                <span class="description">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="line-title-wrapper">
                            <line-title text="商家公告"></line-title>
                        </div>
                        <div class="shop-report">
                            {{seller.bulletin}}
                        </div>
                    </div>
                </div>
                <div class="close" @click="hiddeDetail">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import star from 'components/star/star.vue';
    import lineTitle from 'components/line-title/line-title.vue';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                classMap: [],
                detailShow: false
            };
        },
        methods: {
            showDetail () {
                this.detailShow = true;
            },
            hiddeDetail () {
                this.detailShow = false;
            }
        },
        created () {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        components: {
            star,
            lineTitle
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .header
        position: relative
        background: rgba(1, 17, 27, 0.5)
        overflow: hidden
        .content-wrapper
            padding: 24px 6px 18px 24px
            position: relative
            font-size: 0
            .avatar
                vertical-align: top
                display: inline-block
                & > img
                    border-radius: 2px
            .content
                font-size: 14px;
                display: inline-block
                margin-left: 16px
                .brand
                    display: inline-block
                    vertical-align: top
                    width: 30px
                    height: 18px
                    bg-img(brand)
                    background-repeat: no-repeat
                    background-size: 30px 18px
                .title
                    font-size: 16px
                    color: rgb(225, 225, 225)
                    line-height: 18px
                    font-weight: bold
                .description
                    margin: 8px 0px 10px 0px
                    font-size: 12px
                    font-weight: 200
                    line-height: 12px
                    color: rgb(225, 225, 225)
                .note
                    .icon
                        display: inline-block
                        height: 12px
                        width: 12px
                        background-size: 12px 12px
                        background-repeat: no-repeat
                        &.decrease
                            bg-img(decrease_1)
                        &.discount
                            bg-img(discount_1)
                        &.guarantee
                            bg-img(guarantee_1)
                        &.special
                            bg-img(special_1)
                    .text
                        vertical-align: top
                        font-size: 10px
                        line-height: 14px
                        font-weight: 200
                        color: rgb(225, 225, 225)
                        margin-left: 4px
            .count-wrapper
                position: absolute
                height: 24px
                line-height: 24px
                right: 12px
                bottom: 18px
                font-size: 10px
                color: rgb(225, 225, 225)
                background: rgba(0, 0, 0, 0.2)
                padding: 0 8px
                border-radius: 14px
                .count
                    vertical-align: top
                    margin-right: 2px
                .icon-keyboard_arrow_right
                    line-height: 24px

        .report
            position: relative
            height: 28px
            padding: 0 12px
            background: rgba(7, 17, 27, 0.2)
            font-size: 0
            .report-title
                vertical-align: top
                display: inline-block
                margin-top: 8px
                margin-right: 4px
                width: 22px
                height: 12px
                background-size: 22px 12px
                background-repeat: no-repeat
                bg-img(bulletin)
            .report-text
                vertical-align: top
                display: inline-block
                width: 88%
                white-space: nowrap
                overflow: hidden
                -ms-text-overflow: ellipsis
                text-overflow: ellipsis
                line-height: 28px
                font-size: 10px
                color: rgb(225, 225, 225)
            .icon-keyboard_arrow_right
                position: absolute
                right: 12px
                bottom: 0
                line-height: 28px
                font-size: 10px
                color: rgb(225, 225, 225)
        .background
            position: absolute
            height: 100%
            width: 100%
            left: 0
            top: 0
            z-index: -1
            filter: blur(10px)
        .detail
            height: 100%
            position: fixed
            width: 100%
            left: 0
            top: 0
            background: rgba(1, 17, 27, 0.8)
            z-index: 100
            overflow: auto
            .detail-wrapper
                min-height: 100%
                width: 100%
                .detail-main
                    margin-top: 64px
                    padding-bottom: 64px
                    .title
                        text-align: center;
                        font-size: 16px
                        font-weight: 700
                        color: rgb(225, 225, 225)
                    .star-wrapper
                        margin-top: 16px
                        padding: 2px 0
                        text-align: center
                    .line-title-wrapper
                        width: 80%
                        margin: 28px auto 24px auto
                    .support
                        margin-left: 36px
                        font-size: 0
                        .support-item
                            height: 16px
                            margin-bottom: 12px
                            line-height: 16px
                            &:last-child
                                margin-bottom: 0
                            .icon
                                vertical-align: top
                                display: inline-block
                                height: 16px
                                width: 16px
                                background-size: 16px
                                background-repeat: no-repeat
                                margin-right: 6px
                                &.decrease
                                    bg-img(decrease_2)
                                &.discount
                                    bg-img(discount_2)
                                &.guarantee
                                    bg-img(guarantee_2)
                                &.special
                                    bg-img(special_2)
                                &.invoice
                                    bg-img(invoice_2)
                            .description
                                display: inline-block
                                height: 16px
                                font-size: 12px
                                font-weight: 200
                                color: rgb(225, 225, 225)
                                line-height: 16px

                    .shop-report
                        margin: 0 36px 0 36px
                        font-size: 12px
                        font-weight: 200
                        color: rgb(225, 225, 225)
                        line-height: 24px
            .close
                position: relative
                margin: -64px auto 0 auto
                height: 32px
                width: 32px
                font-size: 32px
                clear: both
                color: rgba(225, 225, 225, 0.5)
</style>

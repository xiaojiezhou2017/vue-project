<template>
    <div class="shop" ref="shop">
        <div class="shop-content">
            <div class="shop-header">
                <div class="shop-intro border-1px">
                    <div class="left">
                        <div class="name">{{seller.name}}</div>
                        <div class="wrapper">
                            <div class="star-wrapper">
                                <star :size="36" :score="seller.score"></star>
                            </div>
                            <p class="count">(661)</p>
                            <p class="sell-count">月售{{seller.sellCount}}单</p>
                        </div>
                    </div>
                    <div class="right">
                        <i class="icon icon-favorite"></i>
                        <p class="text">收藏</p>
                    </div>
                </div>
                <div class="delivery-intro">
                    <div class="item">
                        <p class="title">起送价</p>
                        <p class="text"><span class="num">{{seller.minPrice}}</span>元</p>
                    </div>
                    <div class="item">
                        <p class="title">商家配送</p>
                        <p class="text"><span class="num">{{seller.deliveryPrice}}</span>元</p>
                    </div>
                    <div class="item">
                        <p class="title">平均配送时间</p>
                        <p class="text"><span class="num">{{seller.deliveryTime}}</span>分钟</p>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="bulletin border-1px">
                <h2 class="title">公告与活动</h2>
                <p class="text">{{seller.bulletin}}</p>
            </div>
            <div class="activity">
                <ul>
                    <li class="item border-1px" v-for="support in seller.supports">
                        <i class="icon" :class="classMap[support.type]"></i>
                        <span class="desc">{{support.description}}</span>
                    </li>
                </ul>
            </div>
            <div class="line"></div>
            <div class="shop-view">
                <h2 class="title">商家实景</h2>
                <div class="list-wrapper" ref="listWrapper">
                    <ul class="shop-view-list" ref="ul">
                        <li class="item" v-for="item in seller.pics">
                            <img :src="item" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="line"></div>
            <div class="shop-info">
                <h2 class="title border-1px">商家信息</h2>
                <p class="text border-1px" v-for=" info in seller.infos">{{info}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import star from 'components/star/star';
    import BSroll from 'better-scroll';
    export default {
        props: {
            seller: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                classMap: []
            };
        },
        watch: {
            seller () {
                this.$nextTick(() => {
                });
            }
        },
        updated () {
            this.$nextTick(() => {
                this._initPicScroll();
                this._initScroll();
            });
        },
        components: {
            star
        },
        created () {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            console.log('create');
        },
        methods: {
            _initPicScroll () {
                let picWidth = 120;
                let wrapperWidth = this.$refs.listWrapper.offsetWidth;
                let length = this.seller.pics.length;
                let viewList = this.$refs.ul;
                let width = (picWidth + 6) * length - 6;
                if (width > wrapperWidth) {
                    viewList.style.width = width;
                    if (!this.picScrol) {
                        this.picScrol = new BSroll(this.$refs.listWrapper, {
                            scrollX: true
                        });
                    } else {
                        this.picScrol.refresh();
                    }
                }
            },
            _initScroll () {
                if (!this.scroll) {
                    this.scroll = new BSroll(this.$refs.shop, {
                        scrollY: true
                    });
                } else {
                    this.scroll.refresh();
                }
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .shop
        position: absolute
        top: 173px
        left: 0
        height: 100%
        width: 100%
        overflow: hidden
        .shop-content
            .shop-header
                .shop-intro
                    position: relative
                    margin: 18px 18px 0 18px
                    padding-bottom: 18px
                    font-size: 0
                    border-1px(rgba(7, 17, 27, 0.1))
                    .left
                        .name
                            font-size: 14px
                            color: rgb(7, 17, 27)
                            line-height: 14px
                        .wrapper
                            margin-top: 8px
                            .star-wrapper
                                vertical-align: top
                                display: inline-block
                                margin-right: 8px
                            .sell-count
                            .count
                                display: inline-block
                                font-size: 10px
                                color: rgb(77, 85, 93)
                                line-height: 18px
                                margin-right: 12px
                    .right
                        position: absolute
                        top: 0
                        right: 0
                        text-align: center
                        .icon
                            font-size: 24px
                            color: rgb(240, 20, 20)
                            line-height: 24px
                        .text
                            margin-top: 4px
                            font-size: 10px
                            color: rgb(77, 85, 93)

                .delivery-intro
                    display: flex
                    .item
                        flex: 1
                        text-align: center
                        padding: 18px 0 0 0
                        .title
                            font-size: 10px
                            color: rgb(147, 153, 159)
                            line-height: 10px
                        .text
                            margin-top: 4px
                            font-size: 10px
                            color: rgb(7, 17, 27)
                            .num
                                font-size: 24px
                                rgb(7, 17, 27)
                                line-height: 24px

        .line
            margin: 18px 0
            height: 16px
            background: #f3f5f7
        .bulletin
            margin: 0 18px
            padding: 0 0 16px 0
            border-1px(rgba(7, 17, 27, 0.1))
            .title
                color: rgb(7, 17, 27)
                font-size: 14px
            .text
                margin: 8px 6px 0 6px
                font-size: 12px
                color: rgb(240, 20, 20)
                line-height: 24px

        .activity
            margin: 0 18px
            .item
                padding: 16px 12px
                font-size: 12px
                color: rgb(7, 17, 27)
                line-height: 16px
                border-1px(rgba(7, 17, 27, 0.1))
                .icon
                    display: inline-block
                    vertical-align: top
                    height: 16px
                    width: 16px
                    margin-right: 6px
                    background-size: 16px
                    &.decrease
                        bg-img(decrease_4)
                    &.discount
                        bg-img(discount_4)
                    &.guarantee
                        bg-img(guarantee_4)
                    &.special
                        bg-img(special_4)
                    &.invoice
                        bg-img(invoice_4)
                    &:last-child
                        border-none()

        .shop-view
            padding: 18px 0 0 18px
            .title
                font-size: 14px
                color: rgb(7, 17, 27)
            .list-wrapper
                width: 100%
                overflow: hidden
                .shop-view-list
                    white-space: nowrap
                    width: 500px
                    .item
                        margin-top: 6px
                        margin-right: 6px
                        display: inline-block
                        img
                            height: 90px
                            width: 120px
        .shop-info
            margin: 0 18px
            .title
                font-size: 14px
                padding-bottom: 12px
                border-1px(rgba(7, 17, 27, 0.1))
            .text
                padding: 16px 0 16px 12px
                font-size: 12px
                color: rgb(7, 17, 17)
                line-height: 16px
                border-1px(rgba(7, 17, 27, 0.1))

</style>

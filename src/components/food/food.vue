<template>
    <transition name="translate">
        <div class="food-detail" v-show="foodShow" ref="foodDetail">
            <div class="food">
                <span class="icon back icon-arrow_lift" @click="back"></span>
                <header class="header">
                    <div class="big-img">
                        <img :src="selectedFood.image" alt="selectedFood.image">
                    </div>
                </header>
                <div class="content">
                    <div class="food-info">
                        <p class="name">{{selectedFood.name}}</p>
                        <p>
                            <span class="sell-count">月售{{selectedFood.sellCount}}份</span>
                            <span class="rating">好评率{{selectedFood.rating}}%</span>
                        </p>
                        <p>
                            <span class="newPrice">￥{{selectedFood.price}}</span>
                            <del v-show="selectedFood.oldPrice" class="oldPrice">￥{{selectedFood.oldPrice}}</del>
                        </p>
                        <div class="addCart" @click="addFirst" v-show="!selectedFood.count||selectedFood===0">
                            加入购物车
                        </div>
                        <div class="cart-wrapper" v-show="selectedFood.count&&selectedFood.count!==0">
                            <cart :food="selectedFood"></cart>
                        </div>
                    </div>
                    <p class="line"></p>
                    <div class="info">
                        <h2 class="title">商品介绍</h2>
                        <p class="desc">{{selectedFood.info}}</p>
                    </div>
                    <div class="line"></div>
                    <ratingSelected :ratingType="ratingType" @choiced="choice" :ratings="selectedFood.ratings"
                                    @onlyContent="onlyContent"></ratingSelected>
                    <div class="rating-wrapper">
                        <div class="rating-list">
                            <ul>
                                <li v-show="ratingShow(rating)" :curr="currType" :type="rating.type"
                                    class="rating-item border-1px" v-for="rating in selectedFood.ratings">
                                    <div class="user">
                                        <span class="acount">{{rating.username}}</span>
                                        <img class="user-img" :src="rating.avatar" alt="">
                                    </div>
                                    <p class="time">{{rating.rateTime | formateDate}}</p>
                                    <i class="hand icon-thumb_down icon"
                                       :class="{'icon-thumb_up':rating.rateType===0}"></i>
                                    <p class="text">{{rating.text}}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </transition>
</template>
<script>
    import cart from 'components/cart/cart';
    import ratingSelected from 'components/rating-selected/rating-selected';
    import BSscrool from 'better-scroll';
    import {formateDate} from '../../common/js/formateDate';

    const ALL = -1;
    const RECOMED = 0;
    const BLAME = 1;

    export default {
        props: {
            selectedFood: {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                foodShow: false,
                ratingType: [
                    {
                        text: '全部',
                        type: ALL
                    },
                    {
                        text: '推荐',
                        type: RECOMED
                    },
                    {
                        text: '吐槽',
                        type: BLAME
                    }
                ],
                currType: ALL,
                haveContent: false
            }
                ;
        },
        methods: {
            showFood () {
                this.foodShow = true;
                this.$nextTick(() => {
                    if (!this.scrool) {
                        this.scrool = new BSscrool(this.$refs.foodDetail, {
                            click: true
                        });
                    } else {
                        this.scrool.refresh();
                    }
                });
            },
            back () {
                this.foodShow = false;
            },
            addFirst (event) {
                console.log('clicked');
                if (!event._constructed) {
                    return;
                }
                if (!this.selectedFood.count) {
                    this.$set(this.selectedFood, 'count', 1);
                }
            },
            choice (type) {
                this.currType = type;
            },
            onlyContent (flage) {
                this.haveContent = flage;
            },
            ratingShow (rating) {
                if (this.currType === ALL) {
                    if (!this.haveContent) {
                        return true;
                    }
                    if (this.haveContent && rating.text) {
                        return true;
                    }
                }
                if (this.currType !== rating.rateType) {
                    return false;
                }
                if (!this.haveContent) {
                    return true;
                }
                if (this.haveContent && rating.text) {
                    return true;
                }
            }
        },
        filters: {
            formateDate (time) {
                time = new Date(time);
                return formateDate(time, 'YYYY-MM-DD hh:mm');
            }
        },
        components: {
            cart,
            ratingSelected
        },
        created () {
            console.log('ok');
            console.log(this.selectedFood);
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'
    .food-detail
        position: fixed
        top: 0px
        left: 0px
        padding-bottom: 48px
        height: 100%
        width: 100%
        background: #fff
        overflow: hidden
        .food
            padding-bottom: 48px
            .back
                position: absolute
                left: 0
                top: 0
                display: inline-block
                font-size: 20px
                padding: 6px
                color: #fff
                z-index: 2
                margin-top: 6px
                margin-left: 6px
            .header
                .big-img
                    position: relative
                    width: 100%
                    padding-top: 100%
                    img
                        position: absolute
                        left: 0
                        top: 0
                        width: 100%
                        height: 100%
            .content
                font-size: 0
                .food-info
                    position: relative
                    .name
                        margin: 18px 0 8px 18px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc
                        margin: 8px 0 8px 0
                        font-size: 10px
                        line-height: 10px
                        color: rgb(147, 153, 159)
                    .sell-count
                    .rating
                        display: inline-block
                        font-size: 10px
                        line-height: 10px
                        color: rgb(147, 153, 159)
                        padding-bottom: 18px
                    .sell-count
                        margin-right: 12px
                        margin-left: 18px
                    .newPrice
                        display: inline-block
                        font-size: 14px
                        color: rgb(240, 20, 20)
                        margin-right: 8px
                        margin-left: 18px
                        font-weight: 700
                        line-height: 24px
                    .oldPrice
                        margin-left: 18px
                        font-size: 10px
                        font-weight: 700
                        color: rgb(147, 153, 159)
                .line
                    margin: 18px 0
                    height: 16px
                    background: #f3f5f7
                .addCart
                    position: absolute
                    bottom: 0px
                    right: 18px
                    width: 72px
                    height: 24px
                    line-height: 24px
                    text-align: center
                    color: #fff
                    background: rgb(0, 160, 200)
                    border-radius: 24px
                    font-size: 10px
                .cart-wrapper
                    position: absolute
                    bottom: 0
                    right: 18px
                .info
                    padding: 0 18px
                    .title
                        font-size: 14px
                        font-weight: 400
                        color: #07111b
                    .desc
                        margin-top: 6px
                        padding: 0 8px
                        color: rgb(77, 85, 93)
                        font-size: 12px
                        line-height: 24px
                .rating-wrapper
                    .rating-list
                        .rating-item
                            font-size: 0
                            padding: 0 12px 16px 18px
                            margin: 18px 0
                            border-1px(rgba(7, 17, 27, 0.1))
                            .time
                                font-size: 10px
                                color: rgb(147, 153, 159)
                            .hand
                                display: inline-block
                                font-size: 12px
                                line-height: 24px
                                color: rgb(147, 153, 159)
                                margin-right: 4px
                            .text
                                display: inline-block
                                font-size: 12px
                                color: rgb(7, 17, 27)
                                margin-top: 12px
                            .user
                                float: right
                                .acount
                                    display: inline-block
                                    font-size: 12px
                                    color: rgb(7, 17, 27)
                                    margin-right: 6px
                                .user-img
                                    display: inline-block
                                    height: 12px
                                    width: 12px


</style>


<template>
    <div class="shopcart">
        <div class="content" @click="showDetail">
            <div class="left">
                <div class="log-wrapper">
                    <span class="log icon-shopping_cart"></span>
                    <span class="count" v-show="totalCount">{{totalCount}}</span>
                </div>
                <div class="price">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥4元</div>
            </div>
            <div class="right" :class="{'pay':this.totalPrice>=this.minPrice}">
                {{this.payContent}}
            </div>
        </div>
        <transition name="fold">
            <div class="detail" v-show="listShow">
                <div class="header ">
                    <div class="empty" @click="empty">清空</div>
                    <div class="title">购物车</div>
                </div>
                <div class="detail-content" ref="detail">
                    <ul>
                        <li class="food border-1px" v-for="food in selectFoods">
                            <span class="name">{{food.name}}</span>
                            <span class="price">￥{{food.price}}</span>
                            <div class="cart-wrapper">
                                <cart :food="food"></cart>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import cart from 'components/cart/cart.vue';
    import BScrool from 'better-scroll';
    export default {
        props: {
            selectFoods: {
                type: Array,
                default: function () {
                    return [
                        {
                            price: 10,
                            count: 2
                        }
                    ];
                }
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                fold: true
            };
        },
        computed: {
            totalCount () {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            },
            totalPrice () {
                let price = 0;
                this.selectFoods.forEach((food) => {
                    price += (food.price * food.count);
                });
                return price;
            },
            payContent () {
                let content;
                if (this.totalPrice === 0) {
                    content = `￥${this.minPrice}起送`;
                    return content;
                }
                if (this.totalPrice < this.minPrice) {
                    content = `还差${this.minPrice - this.totalPrice}元起送`;
                } else {
                    content = '去支付';
                }
                return content;
            },
            listShow () {
                if (!this.totalCount) {
                    this.fold = true;
                    this.$emit('showBackground', !this.fold);
                    return false;
                }
                this.$nextTick(() => {
                    if (!this.scrool) {
                        this.scrool = new BScrool(this.$refs.detail, {
                            click: true
                        });
                    } else {
                        this.scrool.refresh();
                    }
                });
                this.$emit('showBackground', !this.fold);
                return !this.fold;
            }
        },
        components: {
            cart
        },
        methods: {
            showDetail () {
                this.fold = !this.fold;
            },
            empty () {
                this.selectFoods.forEach((food) => {
                    if (food.count) {
                        food.count = 0;
                    }
                });
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .shopcart
        height: 48px
        background: rgb(20, 29, 38)
        width: 100%
        .content
            display: flex
            .left
                flex: 1
                font-size: 0
            .log-wrapper
                position: relative
                display: inline-block
                vertical-align: top
                top: -10px
                box-sizing: border-box
                height: 56px
                width: 56px
                padding: 6px
                border-radius: 50%
                background: rgb(20, 29, 38)
                margin: 0 16px 0 18px
                .log
                    display: inline-block
                    line-height: 45px
                    text-align: center
                    height: 45px
                    width: 45px
                    border-radius: 50%
                    font-size: 21px
                    color: rgb(128, 133, 137)
                    background: rgb(43, 52, 60, 40%)
                .count
                    position: absolute;
                    display: inline-block
                    left: 31px
                    top: 0
                    height: 16px
                    width: 24px
                    border-radius: 10px
                    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
                    background-color: rgb(240, 20, 20);
                    text-align: center
                    line-height: 16px
                    font-size: 10px
                    color: #fff
                    font-weight: bold
            .price
                vertical-align: top
                display: inline-block
                color: rgb(128, 133, 137)
                font-size: 14px
                font-weight: bold
                line-height: 48px
                margin-right: 16px
            .desc
                display: inline-block
                vertical-align: top
                font-size: 10px
                line-height: 12px
                height: 12px
                border: 1 p
                margin-top: 18px
                color: rgb(225, 225, 225)
                border-left: 1px solid rgba(225, 225, 225, 0.1)
                padding-left: 16px

            .right
                font-size: 14px
                flex: 0 0 105px
                height: 48px
                background: rgb(43, 51, 59)
                text-align: center
                line-height: 48px
                color: rgb(128, 133, 137)
                font-weight: bold
                &.pay
                    background: #00b43c
                    color: #fff
        .detail
            position: absolute
            top: -18px
            left: 0
            width: 100%
            transform: translate3D(0, -100%, 0)
            .header
                width: 100%
                height: 40px
                line-height: 40px
                background: #f3f5f7
                font-size: 12px
                padding: 0 18px
                border-bottom: 1px solid rgba(1, 17, 27, 0.1)
                .empty
                    float: right
                    color: rgb(0, 160, 220)
            .detail-content
                max-height: 240px
                background: #fff
                overflow: hidden
                .food
                    position: relative
                    margin: 12px 18px
                    height: 48px
                    width: 100%
                    border-1px(rgba(1, 17, 27, 0.1))
                    .name
                        font-size: 14px
                        line-height: 24px
                        color: rgb(7, 17, 27)
                    .price
                        position: absolute
                        top: 12px
                        right: 100px
                        font-size: 14px
                        line-height: 24px
                        font-weight: 700
                        color: rgb(240, 20, 20)
                    .cart-wrapper
                        position: absolute
                        top: 12px
                        right: 18px

</style>


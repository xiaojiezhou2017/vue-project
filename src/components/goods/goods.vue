<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item " :cindex="currentIndex" :index="index"
                    :class="{'current':currentIndex === index}" @click="selected(index,$event)">
                    <div class="wrapper border-1px">
                        <span v-show="item.type > 0" :class="classMap[item.type]" :type="item.type" class="icon"></span>
                        <span class="text">{{item.name}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="good-item  good-item-hook">
                    <h2 class="title">{{item.name}}</h2>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px" @click="showDetail(food)">
                            <div class="icon-wrapper">
                                <img :src="food.icon" width="100%" height="100%" alt="" class="icon">
                            </div>
                            <div class="content">
                                <p class="name">{{food.name}}</p>
                                <p class="desc">{{food.description}}</p>
                                <p>
                                    <span class="sell-count">月售{{food.sellCount}}份</span>
                                    <span class="rating">好评率{{food.rating}}%</span>
                                </p>
                                <p>
                                    <span class="newPrice">￥{{food.price}}</span>
                                    <del v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</del>
                                </p>
                                <div class="cart-wrapper">
                                    <cart :food="food"></cart>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="shopcart-wrapper">
            <shop-cart @showBackground="showBackground" :selectFoods="selectFoods"
                       :delivery-price="seller.deliveryPrice"
                       :min-price="seller.minPrice"></shop-cart>
            <div class="background" v-show="listShow" :listShow="listShow">
            </div>
        </div>
        <food ref="food" :selectedFood="selectedFood"></food>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import shopCart from 'components/shopcart/shopcart.vue';
    import cart from 'components/cart/cart.vue';
    import food from 'components/food/food.vue';
    const OK = 1;
    export default {
        props: {
            /** 这里的seller是通过view-router传过来的 **/
            seller: {
                type: Object
            }
        },
        data () {
            return {
                goods: [],
                heightList: [],
                scrollY: 0,
                listShow: false,
                selectedFood: {}
            };
        },
        created () {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.$http.get('/api/goods').then((res) => {
                res = res.body;
                if (res.status === OK) {
                    this.goods = res.data;
                    this.$nextTick(() => {
                        this._initScroll();
                        this._caculateHeight();
                    });
                }
            }, () => {

            });
        },
        computed: {
            currentIndex () {
                for (let i = 0; i < this.heightList.length; i++) {
                    let height1 = this.heightList[i];
                    let height2 = this.heightList[i + 1];
                    if (this.scrollY < height2 && this.scrollY >= height1 && height2) {
                        return i;
                    }
                }
                return 0;
            },
            selectFoods () {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        },
        methods: {
            _initScroll () {
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true   // 允许点击事件
                });

                this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
                    // 允许将滚动的值传出来
                    probeType: 3,
                    click: true   // 允许点击事件
                });
                this.foodScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            selected (index, event) {
                if (!event._constructed) {
                    return;
                }
                let goodItem = this.$refs.foodsWrapper.getElementsByClassName('good-item-hook');
                let el = goodItem[index];
                this.foodScroll.scrollToElement(el, 300);
            },
            _caculateHeight () {
                let goodItem = this.$refs.foodsWrapper.getElementsByClassName('good-item-hook');
                let height = 0;
                this.heightList.push(height);
                for (let i = 0; i < goodItem.length; i++) {
                    let item = goodItem[i];
                    height += item.clientHeight;
                    this.heightList.push(height);
                }
            },
            showBackground (show) {
                this.listShow = show;
            },
            showDetail (food) {
                this.$refs.food.showFood();
                this.selectedFood = food;
            }
        },
        components: {
            shopCart,
            cart,
            food
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'
    .goods
        position: absolute
        display: flex
        top: 174px
        width: 100%
        bottom: 47px
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                height: 54px
                width: 80px
                padding-left: 12px
                font-size: 0
                &.current
                    position: relative
                    margin-top: -1px
                    background: #fff
                    border-none()
                    .text
                        color: black
                        font-weight: 700
                .wrapper
                    display: table-cell
                    vertical-align: middle
                    width: 56px
                    border-1px(rgba(1, 17, 27, 0.1))
                    .icon
                        display: inline-block
                        vertical-align: top
                        height: 12px
                        width: 12px
                        margin-right: 2px
                        background-size: 12px 12px
                        background-repeat: no-repeat
                        &.decrease
                            bg-img(decrease_3)
                        &.discount
                            bg-img(discount_3)
                        &.guarantee
                            bg-img(guarantee_3)
                        &.special
                            bg-img(special_3)
                    .text
                        width: 56px
                        font-size: 12px
                        line-height: 14px
        .foods-wrapper
            flex: 1
            .good-item
                position: relative
                .title
                    font-size: 12px
                    line-height: 26px
                    height: 26px
                    color: rgb(147, 153, 159)
                    padding-left: 14px
                    border-left: 2px solid #d9dde1
                    background: #f3f5f7
                .food-item
                    display: flex
                    margin: 18px 0 0 18px
                    padding-bottom: 18px
                    border-1px(rgba(7, 17, 27, 0.1))
                    &:last-child
                        border-none()
                    &:last-child
                        margin-bottom: 0
                    .icon-wrapper
                        flex: 0 0 57px
                        height: 57px
                        margin-right: 10px
                    .content
                        flex: 1
                        font-size: 0
                        .name
                            font-size: 14px
                            color: rgb(7, 17, 27)
                            margin-top: 2px
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
                        .sell-count
                            margin-right: 12px
                        .newPrice
                            display: inline-block
                            font-size: 14px
                            color: rgb(240, 20, 20)
                            margin-right: 8px
                            font-weight: 700
                            line-height: 24px
                        .oldPrice
                            font-size: 10px
                            font-weight: 700
                            color: rgb(147, 153, 159)
                        .cart-wrapper
                            position: absolute
                            right: 18px
                            bottom: 18px

        .shopcart-wrapper
            position: fixed
            bottom: 0
            left: 0
            width: 100%
            z-index: 30
            .background
                position: fixed
                left: 0
                top: 0
                height: 100%
                width: 100%
                z-index: -1
                background: rgba(7, 17, 27, 0.6)
</style>


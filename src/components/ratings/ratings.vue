<template>
    <div class="ratings" ref="rating">
        <div class="ratings-content">
            <div class="overview">
                <div class="left">
                    <p class="score">{{seller.score}}</p>
                    <p class="title">综合评分</p>
                    <p class="score-desc">高于周边商家{{seller.rankRate}}%</p>
                </div>
                <div class="right">
                    <div class="row">
                        <div class="title">服务态度</div>
                        <div class="star-wrapper">
                            <star :size="36" :score="seller.serviceScore"></star>
                        </div>
                        <div class="score">{{seller.serviceScore}}</div>
                    </div>
                    <div class="row">
                        <div class="title">服务态度</div>
                        <div class="star-wrapper">
                            <star :size="36" :score="seller.foodScore"></star>
                        </div>
                        <div class="score">
                            {{seller.foodScore}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="title">送达时间</div>
                        <div class="delivery-time">{{seller.deliveryTime}}分钟</div>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="rating-selected-wrapper">
                <ratingSelected :ratingType="ratingType" @choiced="choice" :ratings="ratings"
                                @onlyContent="onlyContent"></ratingSelected>
            </div>
            <div class="rating">
                <ul>
                    <li v-show="ratingShow(item)" class="rating-item" v-for="item in ratings">
                        <div class="rating-item-header">
                            <div class="user">
                                <p class="avatar"><img :src="item.avatar" alt="">
                                </p>
                                <p class="username">{{item.username}}</p>
                            </div>
                            <div class="delivery">
                                <p class="star-wrapper">
                                    <star :size="24" :score="item.score"></star>
                                </p>
                                <p v-show="item.deliveryTime" class="text">{{item.deliveryTime}}分钟送达</p>
                            </div>
                            <time class="time">2016-07-13 20:33</time>
                        </div>
                        <p class="content">
                            {{item.text}}
                        </p>
                        <p class="recommend" :name="item.recommend">
                            <i class="icon icon-thumb_up"></i>
                            <span class="name" v-for="name in item.recommend">{{name}}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    import star from 'components/star/star';
    import BScrool from 'better-scroll';
    import ratingSelected from 'components/rating-selected/rating-selected';
    const OK = 1;
    const ALL = -1;
    const PLEASE = 0;
    const NOTPLEASE = 1;
    export default {
        props: {
            seller: {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                ratings: [],
                ratingType: [
                    {
                        text: '全部',
                        type: ALL
                    },
                    {
                        text: '满意',
                        type: PLEASE
                    },
                    {
                        text: '不满意',
                        type: NOTPLEASE
                    }
                ],
                currType: ALL,
                haveContent: false
            };
        },
        components: {
            star,
            ratingSelected
        },
        created () {
            this.$http.get('/api/rating').then((res) => {
                res = res.body;
                if (res.status === OK) {
                    this.ratings = res.data;
                    this.$nextTick(() => {
                        this.scrool = new BScrool(this.$refs.rating, {
                            click: true
                        });
                    });
                }
            }, () => {
            });
        },
        methods: {
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
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .ratings
        position: fixed
        top: 173px
        width: 100%
        height: 100%
        overflow: hidden
        .ratings-content
            .overview
                display: flex
                width: 100%
                .left
                    flex: 0 0 137px
                    width: 132px
                    padding: 18px 0
                    text-align: center
                    .score
                        font-size: 24px
                        color: rgb(255, 153, 0)
                        line-height: 28px
                        height: 28px
                    .title
                        font-size: 12px
                        color: rgb(7, 17, 27)
                        line-height: 18px
                        height: 18px
                        margin: 6px 0 8px 0
                    .score-desc
                        font-size: 10px
                        color: rgb(147, 153, 159)
                        line-height: 10px
                        height: 10px
                .right
                    flex: 1
                    width: 237px
                    margin: 18px 0
                    border-left: 1px solid rgba(7, 17, 27, 0.1)
                    .row
                        font-size: 0
                        margin: 0 0 8px 24px
                        div
                            display: inline-block
                        &:last-child
                            margin-bottom: 0
                        .title
                            font-size: 12px
                            color: rgb(7, 17, 27)
                            line-height: 18px
                            margin-right: 12px
                        .star-wrapper
                            margin-right: 12px
                            vertical-align: top
                        .score
                            font-size: 12px
                            color: rgb(225, 153, 0)
                            line-height: 18px
                        .delivery-time
                            font-size: 12px
                            color: rgb(147, 153, 159)
                            line-height: 18px

        .line
            height: 16px
            background: #f3f5f7

        .rating
            .rating-item
                .rating-item-header
                    position: relative
                    margin: 18px 18px 6px 18px
                    .user
                        font-size: 0
                        .avatar
                            display: inline-block
                            vertical-align: top
                            height: 28px
                            width: 28px
                            border-radius: 50%
                            img
                                border-radius: 50%
                                width: 100%
                                height: 100%
                        .username
                            display: inline-block
                            font-size: 10px
                            color: rgb(7, 17, 27)
                            line-height: 12px
                            margin-left: 6px
                    .delivery
                        font-size: 0
                        position: absolute
                        left: 34px
                        top: 16px
                        .star-wrapper
                            display: inline-block
                            vertical-align: top
                        .text
                            display: inline-block
                            font-size: 10px
                            color: rgb(147, 153, 159)
                            line-height: 12px
                            margin-left: 6px
                    .time
                        position: absolute
                        top: 0
                        right: 0
                        color: rgb(147, 153, 159)
                        font-size: 10px

                .content
                    font-size: 12px
                    color: rgb(7, 17, 27)
                    line-height: 18px
                    margin-left: 40px
                .recommend
                    margin: 8px 0 18px 40px
                    font-size: 0
                    .icon
                        margin-right: 6px
                        display: inline-block
                        font-size: 12px
                        color: rgb(0, 160, 120)
                        line-height: 16px
                    .name
                        padding: 0 6px
                        border: 1px solid rgba(7, 17, 27, 0.1)
                        background: #fff
                        border-radius: 2px
                        margin-right: 8px
                        font-size: 9px
                        color: rgb(147, 153, 159)
                        line-height: 16px
                        &:last-child
                            margin-right: 0

</style>

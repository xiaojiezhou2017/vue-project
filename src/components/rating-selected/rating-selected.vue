<template>
    <div class="rating-selected">
        <h2 class="title border-1px">商品评价</h2>
        <div class="type">
            <p class="type-item" :class="{'on':
           item.type==currentType}" @click="choiced(item.type)" v-for="item in ratingType">{{item.text}}<span
                    class="num">{{length(ratings,item.type)}}</span>
            </p>
        </div>
        <div class="choice">
            <i class="icon icon-check_circle" :class="{'on':haveContent}" @click="filterContent"></i>
            <span class="text">只有内容的评价</span>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            ratingType: {
                type: Array,
                default () {
                    return [];
                }
            },
            ratings: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                currentType: -1,
                haveContent: false
            };
        },
        methods: {
            choiced (type) {
                this.currentType = type;
                this.$emit('choiced', type);
            },
            filterContent () {
                this.haveContent = !this.haveContent;
                this.$emit('onlyContent', this.haveContent);
            },
            length (ratings, type) {
                let length;
                if (type === -1) {
                    length = ratings.length;
                    return length;
                } else {
                    length = ratings.filter((item) => {
                        return item.rateType === type;
                    }).length;
                }
                return length;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .rating-selected
        .title
            font-size: 14px
            font-weight: 400
            color: #07111b
            margin-left: 18px
        .type
            margin: 18px 18px 0 18px
            padding-bottom: 18px
            font-size: 0
            border-1px(rgba(7, 17, 27, 0.1))
            .type-item
                display: inline-block
                height: 32px
                line-height: 32px
                padding: 0 12px 0 12px
                font-size: 12px
                margin-right: 8px
                border-radius: 2px;
                color: rgb(73, 85, 93)
                background: rgba(0, 160, 220, 0.2)
                &.on
                    color: rgb(225, 225, 225)
                    background: rgb(0, 160, 220)
                &:last-child
                    margin-left: 0
                    color: rgb(73, 85, 93)
                    background: rgba(77, 85, 93, 0.2)
                    &.on
                        color: #fff
                        background: rgb(77, 85, 93)
        .choice
            color: rgb(147, 153, 159)
            line-height: 24px
            padding: 12px 0 18px 12px
            font-size: 0
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            .icon
                display: inline-block
                font-size: 24px
                vertical-align: top
                margin-right: 4px
                &.on
                    color: #00c850
            .text
                font-size: 12px
</style>

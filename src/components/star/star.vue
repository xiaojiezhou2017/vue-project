<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasss" :class="itemClass" class="item-class"></span>
    </div>
</template>

<script>
    const LENGTH = 5;// 定义星星的个数
    const CLS_ON = 'on';// 定义全星的class
    const CLS_OFF = 'off';// 定义没有星星的class
    const CLS_HALF = 'half';// 定义半星的class

    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
            starType () {
                return 'star-' + this.size;
            },
            itemClasss () {
                let result = [];   // 存放最后结果的数组
                let score = Math.floor(this.score * 2) / 2;
                let integer = Math.floor(score);
                let hasDecimal = score % 1 === 0 ? 0 : 1;
                for (let i = 0; i < integer; i++) {
                     result.push(CLS_ON);
                }
                if (hasDecimal) {
                    result.push(CLS_HALF);
                }
                while (result.length < LENGTH) {
                    result.push(CLS_OFF);
                }
                return result;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .star
        .item-class
            display: inline-block
            background-repeat: no-repeat
        &.star-48
            .item-class
                height: 20px
                width: 20px
                margin-right: 22px
                background-size: 20px 20px
                &:last-child
                    margin-right: 0
                &.on
                    bg-img('star48_on')
                &.off
                    bg-img('star48_off')
                &.half
                    bg-img('star48_half')
        &.star-36
            .item-class
                height: 15px
                width: 15px
                margin-right: 6px
                background-size: 15px 15px
                &:last-child
                    margin-right: 0
                &.on
                    bg-img('star36_on')
                &.off
                    bg-img('star36_off')
                &.half
                    bg-img('star36_half')
        &.star-24
            .item-class
                height: 10px
                width: 10px
                background-size: 10px 10px
                margin-right: 3px
                &:last-child
                    margin-right: 0
                &.on
                    bg-img('star24_on')
                &.off
                    bg-img('star24_off')
                &.half
                    bg-img('star24_half')
</style>

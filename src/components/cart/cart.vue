<template>
    <div class="cart">
        <transition name="outline">
            <span class="decrease icon-remove_circle_outline" v-show="this.food.count>0"
                  @click="decreaseShop($event)"></span>
        </transition>
            <span class="count" v-show="this.food.count>0">{{this.food.count}}</span>
        <span class="add  icon-add_circle" @click.stop="addShop($event)"></span>
    </div>
</template>

<script>
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addShop () {
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    this.$set(this.food, 'count', 0);
                }
                this.food.count++;
            },
            decreaseShop () {
                if (!event._constructed) {
                    return;
                }
                this.food.count--;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cart
        font-size: 0
        .decrease, .count, .add
            display: inline-block
            vertical-align: top
            height: 24px
            width: 24px
            line-height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)
            text-align: center
        .count
            font-size: 10px
            color: rgb(147, 153, 159)
</style>


<template>
    <div class="line-title">
        <div class="line"></div>
        <div class="text">{{text}}</div>
        <div class="line"></div>
    </div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .line-title
        display: flex
        .line
            flex: 1
            position:relative
            top:-7px
            border-bottom:1px solid rgba(225,225,225,0.2)
        .text
            padding: 0 12px
            font-size:14px
            font-weight:700
            color:rgb(225,225,225)
</style>

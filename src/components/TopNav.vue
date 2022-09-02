<template>
    <div class="topNav">
        <div class="left">
            <button @click="jumpToRecommend(1)">推荐</button>
            <button @click="jumpToRecommend(2)">全部</button>
            <!-- <router-link to="/home/recommendView">推荐</router-link>
            <router-link to="/typeCourse">全部</router-link> -->
        </div>
        <div class="right" @click="$router.push('/search')">
            <svg class="icon" aria-hidden="true">
               <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        jumpToRecommend(index) {
            this.$emit('jumpView', index)
        }
    }
}

</script>

<style lang="less" scoped>
    .topNav {
        width: 100%;
        height: 1rem;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            width: 30%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    }
</style>
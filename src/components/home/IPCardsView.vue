<template>
    <div class="ipCards">
        <van-swipe :loop="false" :width="100" class="my-swipe" :show-indicators="false">
            <van-swipe-item v-for="ipCard in ipCards" :key="ipCard">
                <router-link to="/">
                    <img :src="ipCard.icon" alt="">
                    <span class="name"> {{ ipCard.name }}</span>
                </router-link>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
    setup(props) {
        console.log(props)
    },
    props:["ipCards"],
};
</script>

<style lang="less" scoped>
.ipCards {
    width: 100%;
    // height: 4rem;
    padding: 0.2rem;
    .van-swipe-item{
        padding-right: 0.2rem;
        .router-link-active {
            padding: .2rem 0;
            border-radius: 0.2rem;
            border: 1px solid rgb(241, 239, 239);
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
                width: 50%;
            }
            .name {
                padding-top: .2rem;
                border-bottom: 0px;
                color: black;
            }
        }  
    }
}
</style>
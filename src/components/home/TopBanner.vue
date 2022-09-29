<template>
    <div id="banner">
        <!-- <h1> 测试vant </h1>
         <van-button type="primary">主要按钮</van-button>
         <van-button type="success">成功按钮</van-button>
         <van-button type="default">默认按钮</van-button>
         <van-button type="warning">警告按钮</van-button>
         <van-button type="danger">危险按钮</van-button> -->
         <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="course in courses" :key="course" @click="gotoCourseDetail(course)">
                <img :src="course.image" />
            </van-swipe-item>
        </van-swipe>

    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup(props) {

    const router = useRouter();

    function gotoCourseDetail(course) {
        const jumpUrl = course.jumpUrl
        const str = jumpUrl.substr(jumpUrl.indexOf('?') + 1)
        const array = str.split('&')
        
        let albumId = ""
        for (const value of array) {
            const element = value.split('=');
            if (element[0] == "albumId") {
                albumId = element[1]
                break
            }
        }

        if (albumId.length) {
            router.push({path:'/courseDetail',query:{id:albumId}})
        }
    }
    return { gotoCourseDetail }
  },
  props:["courses"],
};
</script>

<style lang="less">
#banner {
    .van-swipe {
        width: 100%;
        height: 3rem;
        // background-color: red;
        .van-swipe-item {
            padding: 0 0.2rem;
            img {
                width: 100%;
                height: 100%;
                border-radius: 0.2rem;
            }
        }
        .van-swipe__indicator--active {
            background-color: red;
        }
}
}
</style>
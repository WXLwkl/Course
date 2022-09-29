<template>
    <div class="courseItem" @click="gotoCourseDetail(course.courseId ? course.courseId : course.id)">
        <!-- <router-link :to="{ path: '/courseDetail', query: { id: course.courseId ? course.courseId : course.id } }"> -->
            <img :src="course.coverImage" alt="">
            <div class="right">
                <span class="title ellipsis-2"> {{ course.title }} </span>
                <span class="subtitle ellipsis"> {{ course.subtitle }} {{ course.subTitle }} </span>
                <span class="author ellipsis" v-if="course.intro"> {{ course.author }} | {{ course.intro }} </span>
                <span class="author ellipsis" v-else-if="course.introduct"> {{ course.author }} | {{ course.introduct }} </span>
                <span class="author" v-else> {{ course.author }} </span>
                <span class="total"> 共{{ course.totalPublishNo }}节 </span>
            </div>
        <!-- </router-link> -->
    </div>
</template>
<script>
import { useRouter } from 'vue-router';

export default {

    setup(){
        const router = useRouter();
        const gotoCourseDetail = (id) =>{
            router.push({path:'/courseDetail',query:{id:id}})
        }
        return { gotoCourseDetail }
    },

    props: ["course"],
};
</script>

<style lang="less" scoped>
.courseItem {
    width: 100%;
    padding: .1rem 0;
    display: flex;

    img {
        border-radius: 5px;
        width: 25%;
    }

    .right {
        width: 75%;
        display: flex;
        flex-direction: column;
        padding-left: .3rem;
        position: relative;
        span {
            color: #ccc;
        }

        .title {
            color: black;
            font-size: 20px;
        }
        .total {
            position: absolute;
            bottom: 0;
        }
    }
}
</style>
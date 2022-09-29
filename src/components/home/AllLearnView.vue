<template>
    <div class="learn">
        <div class="top">
            <span>大家都在学</span>
        </div>
        <div class="courseList" v-for="course in recCourses" :key="course">
            <CourseItem :course="course" />
        </div>
    </div>
</template>
<script>
import CourseItem from '../CommonViews/CourseItem.vue';
export default {
    setup(props) {
        // const courseList = props.hotTopCourses.topCourse
        // return { courseList }
    },
    props: ["recCourses"],
    components: { CourseItem }
};
</script>

<style lang="less" scoped>
.learn {
    width: 100%;
    padding: .3rem;
    // .courseList {
    //     padding: .1rem 0;
    //     display: flex;
    // }
}
</style>
<template>
    <div class="recommend">
        <div class="top">
            <span>热销课程</span> | <span>热门课程</span>
        </div>
        <div class="courseList" v-for="course in hotTopCourses.topCourse" :key="course">
            <CourseItem :course="course" />
        </div>
    </div>
</template>
<script>
import CourseItem from '../CommonViews/CourseItem.vue';
export default {
    setup(props) {
        const courseList = props.hotTopCourses.topCourse
        console.log(props)

        return { courseList }
    },
    props:["hotTopCourses"],
    components: { CourseItem }
};
</script>

<style lang="less" scoped>
.recommend {
    width: 100%;
    padding: .3rem;
}
</style>
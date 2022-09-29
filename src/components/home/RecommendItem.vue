<template>
    <div class="recommend">
        <div class="top">
            <span :class="{ typeSelect: data.type == 0, typeNormal: data.type == 1 }" @click="selectTab(0)">热销课程</span> |
            <span :class="{ typeSelect: data.type == 1, typeNormal: data.type == 0 }" @click="selectTab(1)">热门课程</span>
        </div>
        <div class="courseList" v-for="course in data.list" :key="course">
            <CourseItem :course="course" />
        </div>
    </div>
</template>
<script>
import { onMounted, reactive, watch } from 'vue';
import CourseItem from '../CommonViews/CourseItem.vue';
export default {
    setup(props) {

        const data = reactive({
            list: [],
            type: 0
        });
        
        watch(props, (oldValue, newValue)=>{
            selectTab(0)
        });

        // onMounted(async () => {
        //     const hotTopCourses = props.hotTopCourses;
        //     data.list = hotTopCourses.topCourse;
        //     data.type = 0;
        // })

        function selectTab(num) {
            const hotTopCourses = props.hotTopCourses
            data.list = num == 0 ? hotTopCourses.topCourse : hotTopCourses.hotCourse
            data.type = num
        }
        return { data, selectTab }
    },
    props: ["hotTopCourses"],
    components: { CourseItem }
};
</script>

<style lang="less" scoped>
.recommend {
    width: 100%;
    padding: .1rem 0.3rem;

    .typeNormal {
        font-size: 20px;
        color: black;
    }

    .typeSelect {
        font-size: 25px;
        color: yellowgreen;
    }
}
</style>
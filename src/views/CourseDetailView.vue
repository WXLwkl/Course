<template>
    <div class="courseDetail">
        <CourseInfoTop :info="topInfo" v-if="topInfo" />
        <div class="courseProgramList">
            <div class="top">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-24gf-playlist"></use>
                </svg>
                <span>节目</span>
            </div>
            <div class="program">
                <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <!-- <CourseItem v-for="course in list" :key="course" :course="course" /> -->
                    <div class="content" v-for="(program, i) in list" :key="i">
                        <div @click="goNextPage(program, i)">
                            <div class="title">{{ program.seq }} {{ program.title }}</div>
                            <!-- <div class="subtitle">{{ program.duration }}| {{ program.readCount }}次播放</div> -->
                            <div class="subtitle">{{ formaterDuration(program.duration) }} | {{ formatNumber(program.readCount) }}次播放</div>
                            <div class="line" :class="{line_hidden:i == list.length - 1}"></div>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import CourseInfoTop from '@/components/CourseDetail/CourseInfoTop.vue';
import CourseProgramList from '../components/CourseDetail/CourseProgramList.vue';
import { getCourseDetailInfo, getCourseProgramList } from '@/request/api/home';

import { formaterDuration, formatNumber } from '@/Utils/Tools.js'
import { useKeepPage } from '@/Utils/Hooks.js'
import router from '@/router';
import { useStore } from 'vuex';

export default {
    setup() {
        // useKeepPage(["programView"])

        const courseId = useRoute().query.id;
        const router = useRouter();

        const topInfo = ref({});
        const loadTop = async () => {
            let res = await getCourseDetailInfo(courseId)
            topInfo.value = res.data
        }

        onMounted(() => {
            loadTop()
        })

        const list = ref([]);
        const loading = ref(false);
        const finished = ref(false);

        let index = 1

        const onLoad = async () => {
            let res = await getCourseProgramList(courseId, index)
            // console.log(res.data)
            index += 1
            res.data.forEach((item) => {
                list.value.push(item)
            })
            // 加载状态结束
            loading.value = false;
            // 数据全部加载完成
            if (res.data.length < 10) {
                finished.value = true;
            }
        };

        const reLoad = async () => {
            index = 1
            // onLoad();
            loadTop();
        };
        const store = useStore();

        const goNextPage = (program, index) => {
            router.push({ path: '/programView', query: { albumId: program.albumId, programId: program.id, fragmentId: program.fragmentId } })
            // console.log(index)
            const programObj = {
                songs:list.value,
                index: index
            }
            store.commit('player/updatePlayList', programObj)
        }

        

        return { topInfo, list, onLoad, loading, finished, reLoad, goNextPage, formaterDuration, formatNumber };
    },
    // beforeRouteEnter(to, from, next) {
    //     console.log(to.name, from.name, "--------")
    //     if (from.name === "home") {
    //         next(vm => {
    //             vm.reLoad()
    //         });
    //     } else {
    //         next()
    //     }
    // },
    components: {
        CourseInfoTop,
        CourseProgramList
    }
}
</script>

<style lang="less" scoped>
.courseDetail {

    .courseProgramList {
        width: 100%;
        padding: .2rem;

        .top {
            padding-bottom: 5px;
            height: 40px;
            display: flex;
            align-items: flex-end;

            span {
                font-size: .4rem;
                padding-left: 10px;
            }
        }

        .program {
            width: 100%;
            border-radius: 10px;
            background-color: rgb(246, 246, 246);

            .content {
                padding: 10px 15px 0px 15px;
                display: flex;
                flex-direction: column;

                .title {
                    color: black;
                    font-size: 20px;
                }

                .subtitle {
                    padding-top: 8px;
                    color: #ccc;
                }

                .line {
                    height: 1px;
                    margin-top: 10px;
                    background-color: #ccc;
                }

                .line_hidden {
                    height: 1px;
                    margin-top: 10px;
                    background-color: rgba(0, 0, 0, 0);
                }
            }
        }
    }
}
</style>
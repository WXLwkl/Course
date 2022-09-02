<template>
    <div class="courseDetail">
        <div class="detailTop">
            <img class="bgImg" :src="data.info.coverImage" alt="" />
            <div class="top">
                <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                    <use xlink:href="#icon-weibiaoti--"></use>
                </svg>
            </div>
            <div class="bottom">
                <span class="title">{{ data.info.title }}</span>
                <span>主讲人{{ data.info.author }} | 播放量:{{ data.info.readCountTotal }}</span>
                <span>共{{ data.info.totalPublishNo }}节/已更新{{ data.info.publishedCount }}节</span>
            </div>
        </div>
        <div class="detailProgram">
            <div class="top">
                <h2>节目</h2>
            </div>
            <div class="program">
                <div class="content" v-for="(program, i) in data.programs" :key="i">
                    <span class="title">{{ program.seq }} {{ program.title }}</span>
                    <span class="subtitle">{{ program.duration }}| {{ program.readCount }}次播放</span>
                    <div class="line" :class="{line_hidden:i == data.programs.length - 1}"></div>
                    <audio :src="program.audioUrl" controls></audio>
                </div>
            </div>
            <audio :src="`https://cdn-upyun-dest.dushu365.com/media/audio/16246109128ecfaf61fec74eeeb046260e5e743e10dfzdr8.mp3`" controls></audio>
            
        </div>
    </div>
</template>

<script>
import { getCourseDetailInfo, getCourseProgramInfo } from '@/request/api/home';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {

        const data = reactive({
            info: {},
            programs: []
        })

        onMounted(async () => {
            const courseId = useRoute().query.id
            console.log(courseId)
            let res = await getCourseDetailInfo(courseId)
            console.log(res)
            data.info = res.data.data

            let resProgram = await getCourseProgramInfo(courseId)
            console.log(resProgram.data.data)
            data.programs = resProgram.data.data

        })
        return { data }
    }

}
</script>

<style lang="less" scoped>
.courseDetail {
    width: 100%;

    .detailTop {
        .bgImg {
            width: 100%;
            position: absolute;
            z-index: -1;
        }

        .top {
            width: 100%;
            height: 1rem;
            padding-left: .2rem;
            display: flex;
            align-items: center;

            .icon {
                width: 30px;
                fill: white;
            }
        }

        .bottom {
            width: 100%;
            display: flex;
            flex-direction: column;

            span {
                font-size: .2rem;
                color: white;
            }

            .title {
                font-size: .3rem;
            }
        }
    }

    .detailProgram {
        width: 100%;
        padding: .2rem;

        .program {
            width: 100%;
            border-radius: 10px;
            background-color: beige;

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
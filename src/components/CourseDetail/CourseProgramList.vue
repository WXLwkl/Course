<template>
    <div class="courseProgramList">
        
    </div>
</template>

<script>
import { getCourseProgramList } from '@/request/api/home';
import { ref } from 'vue';

export default {
    setup(props) {

        const list = ref([]);
        const loading = ref(false);
        const finished = ref(false);

        let index = 1

        const onLoad = async () => {

            let res = await getCourseProgramList(props.courseId, index)
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
        return { list, onLoad, loading, finished };
    },
    props: ["courseId"],
}
</script>

<style lang="less" scoped>
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
</style>
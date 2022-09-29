<template>
    <div class="search">
        <div class="searchTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <input type="text" placeholder="易经" v-model="state.searchKey" @keydown.enter="enterKey">
        </div>
        <div class="searchHistory">
            <span class="searchSpan">历史</span>
            <span class="spanKey" v-for="item in state.keyworldList" :key="item" @click="searchHistory(item)">
                {{ item }}
            </span>
            <svg class="icon" aria-hidden="true" @click="delHistory">
                <use xlink:href="#icon-lajitong"></use>
            </svg>
        </div>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <CourseItem v-for="course in list" :key="course" :course="course" />
        </van-list>
    </div>
</template>

<script>
import { searchCourseBykeyWord } from '@/request/api/home';
import { onMounted, reactive, ref } from 'vue';

export default {
    setup() {
        const state = reactive({
            keyworldList: [],
            searchKey: "",
            searchList: []
        })

        const list = ref([]);
        const loading = ref(false);
        const finished = ref(false);
        let index = 1

        const onLoad = async () => {
            if (state.searchKey == "") { 
                loading.value = false;
                return 
            }
            let res = await searchCourseBykeyWord(state.searchKey, index)
            console.log(res.data)
            state.searchKey = ""
            index += 1
            res.data.knowledge.knowledgeRes.forEach((item) => {
                let tempItem = item
                tempItem.coverImage = item.picUrl
                list.value.push(tempItem)
            })
            // 加载状态结束
            loading.value = false;
            // 数据全部加载完成
            if (res.data.length < 10) {
                finished.value = true;
            }
        };
        const enterKey = async () => {

            if (state.searchKey == "") { return }
    
            index = 1
            list.value = []

            state.keyworldList.unshift(state.searchKey)
            state.keyworldList = [...new Set(state.keyworldList)]
            if (state.keyworldList.length > 10) {
                state.keyworldList.pop()
            }
            localStorage.setItem('keyworldList', JSON.stringify(state.keyworldList))

            onLoad();
        }
        const searchHistory = async (item) => {
            // let res = await searchCourseBykeyWord(state.searchKey, 1)
            // state.searchList = res.data.knowledge.knowledgeRes
            index = 1
            list.value = []

            state.searchKey = item
            onLoad();
        }
        const delHistory = () => {
            localStorage.removeItem('keyworldList')
            state.keyworldList = []
        }

        onMounted(() => {
            state.keyworldList = JSON.parse(localStorage.getItem('keyworldList')) ? JSON.parse(localStorage.getItem('keyworldList')) : []
        })

        return { state, enterKey, searchHistory, delHistory, list, onLoad, loading, finished }
    }
}
</script>

<style lang="less" scoped>
.search {
    .searchTop {
        width: 100%;
        height: 1rem;
        padding: 0.2rem;
        display: flex;
        align-items: center;

        input {
            width: 90%;
            margin-left: .2rem;
            border: none;
            border-bottom: 1px solid #999;
            padding: 0.1rem;
        }
    }

    .searchHistory {
        width: 100%;
        padding: .2rem;

        .searchSpan {
            font-weight: 700;
        }

        .spanKey {
            padding: .1rem .2rem;
            background-color: rgb(199, 191, 191);
            border-radius: .4rem;
            margin: .1rem .2rem;
            display: inline-block;
        }

        .icon {
            width: .5rem;
            height: .5rem;
            position: absolute;
            right: .2rem;
        }
    }
}
</style>

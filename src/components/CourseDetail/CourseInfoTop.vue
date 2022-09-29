<template>
    <div class="courseTop">
        <img class="bgImg" :src="info.coverImage" alt="" />
        <div class="top">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
        </div>
        <div class="bottom">
            <div class="title">{{ info.title }}</div>
            <div>主讲人:{{ info.author }} | 播放量: {{ formatNumber(info.readCountTotal) }}</div>
            <div v-if="info.additionCount > 0">
                共{{ info.totalPublishNo }}节/已更新{{ info.publishedCount }}节(含{{info.additionCount}}节加更)
            </div>
            <div v-else>共{{ info.totalPublishNo }}节/已更新{{ info.publishedCount }}节</div>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
    setup(props) {
        
        // onMounted(()=>{
        //     console.log("props=", props);
        // })

        function formatNumber(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + "亿";
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + "万";
            }
        }
        return { formatNumber }
    },
    props: ["info"]
}
</script>

<style lang="less" scoped>
.courseTop {
    width: 100%;
    height: 4.2rem;
    display: flex;
    position: relative;
    background-color: rgba(0.1, 0.1, 0.1, 0.2);

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
        position: absolute;
        bottom: 10px;
        padding-left: .2rem;

        div {
            padding-top: 5px;
            font-size: .2rem;
            color: white;
        }

        .title {
            font-size: .4rem;
        }
    }
}
</style>
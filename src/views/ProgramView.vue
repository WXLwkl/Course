<template>
  <div class="program">
    <div class="nav">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <span> {{ data.info.albumName }} </span>
    </div>
    <div class="top">
      <img :src="data.info.albumCoverUrl" alt="" />
      <div class="right">
        <span> {{ data.info.courseTitle }} </span>
        <span> {{ data.info.title }} </span>
        <span class="count"> 播放{{ data.info.programReadCount }} </span>
      </div>
    </div>
    <div class="center">
      <div class="prograss">
        <span ref="currentTime">{{ formaterDuration(playerInfo.currentTime) }}</span>
        <van-slider class="range" min="0" :max="playerInfo.duration" v-model="playerInfo.currentTime" @change="changeProgress" />
        <span ref="currentTime">{{ formaterDuration(playerInfo.duration) }}</span>
      </div>

      <div class="tools">
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishou"></use>
        </svg>
        <div @click="playPause">
          <svg class="icon" aria-hidden="true" v-if="playerInfo.isPlaying">
            <use xlink:href="#icon-playing"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-else>
            <use xlink:href="#icon-pause"></use>
          </svg>
        </div>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayishou"></use>
        </svg>
      </div>
      <div class="line"></div>
    </div>
    <div class="bottom" v-html="data.info.content"></div>
  </div>
</template>

<script>
import { getCourseProgramInfo } from "@/request/api/home";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from '@vue/reactivity';
import { mapMutations, useStore } from 'vuex';
import router from "@/router";

export default {
  setup() {
    const data = reactive({
      info: {},
    });
    onMounted(async () => {
      const param = useRoute().query;
      let res = await getCourseProgramInfo(param.albumId, param.programId, param.fragmentId);
      data.info = res.data;
      // console.log(res.data);
      console.log("onMounted---")
    });

    console.log("加载了 -------")

    const store = useStore();
    let playerInfo = computed(() => {
      return store.state.player
    })
  
    const router = useRouter();

    watch(()=>playerInfo.value.playListIndex, async ()=>{
      let program = playerInfo.value.playList[playerInfo.value.playListIndex]
      // console.log(program.albumId, program.id, program.fragmentId)
      router.replace({ path: '/programView', query: { albumId: program.albumId, programId: program.id, fragmentId: program.fragmentId } })      
      let res = await getCourseProgramInfo(program.albumId, program.id, program.fragmentId);
      data.info = res.data;
    })

    const formaterDuration = (value) => {
      let sec = value % 60;
      sec = Math.trunc(sec).toString().padStart(2, "0");
      let min = value / 60;
      if (min < 0) {
        min = "00";
      } else {
        min = Math.trunc(min).toString().padStart(2, "0");
      }
      let formater_uration = min + ":" + sec;
      return formater_uration;
    };

    const playPause = () => {
      store.commit('player/updatePlayStatus', !playerInfo.value.isPlaying)
    }

    const goPlay = async (number) => {
      
      let index = parseInt(playerInfo.value.playListIndex) + number
      let param = playerInfo.value.playList[index]
      
      store.commit('player/playNext', number)

      let res = await getCourseProgramInfo(param.albumId, param.id, param.fragmentId);
      data.info = res.data;
    }

    const changeProgress = (value) => {
      // console.log(value)
      store.commit('player/updateCurrentTime', value)
    }

    return {
      data,
      formaterDuration,
      playerInfo,
      playPause,
      goPlay,
      changeProgress
    };
  },
};
</script>

<style lang="less" scoped>
.program {
  width: 100%;

  .nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: 1rem;
    padding-left: 15px;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    background-color: white;
    z-index: 9;
  }

  .top {
    width: 100%;
    padding: 0.2rem 0.3rem;
    padding-top: 1.1rem;
    display: flex;

    img {
      width: 100px;
      border-radius: 5px;
    }

    .right {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      position: relative;

      .count {
        position: absolute;
        bottom: 0;
      }
    }
  }

  .center {
    .prograss {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      .range {
        width: 60%;
        height: 8px;
      }
    }

    .tools {
      width: 100%;
      display: flex;
      justify-content: space-around;
      // text-align: center;
      align-items: center;

      .icon {
        width: 1rem;
        height: 1rem;
        fill: rgb(245, 234, 234);
      }
    }

    .line {
      height: 0.2rem;
      background-color: #f9fafa;
    }
  }

  .bottom {
    a {
      pointer-events: none;
    }
  }
}
</style>
<style lang="less">
a {
  pointer-events: none;
}
</style>

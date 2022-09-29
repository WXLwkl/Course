<template>
  <div class="MusicItem">
    <div class="cdcover" ref="cdcover">
      <img :src="playList[playListIndex].titleImageUrl" alt="" />
    </div>

    <div class="left" @click="gotoProgramPage(playList[playListIndex])">
      <div class="info">
        <Vue3Marquee>{{ playList[playListIndex].title }}</Vue3Marquee>
      </div>
    </div>

    <div class="right">
      <svg aria-hidden="true" @click="playPause" v-show="!isPlaying">
        <use xlink:href="#icon-pause"></use>
      </svg>
      <svg aria-hidden="true" @click="playPause" v-show="isPlaying">
        <use xlink:href="#icon-playing"></use>
      </svg>
      <svg aria-hidden="true">
        <use xlink:href="#icon-24gf-playlist"></use>
      </svg>
    </div>
    <audio
      ref="myAudioPlayer"
      @canplay="onLoadedmetadata"
      @timeupdate="timeupdate"
      @ended="playNextProgram"
      :src="playList[playListIndex].audioUrl"
    ></audio>
    <!-- <audio ref="myAudioPlayer" @canplay="onLoadedmetadata" -->
    <!-- src="https://cdn-ali-dest.dushu365.com/media/audio/1626845926f68b8a8afa80f2fb468259b038309274mkng3o.mp3"></audio> -->
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
let lastSecond = 0;

export default {
  data() {
    return {
      currentTimer: 0,
    };
  },
  computed: {
    ...mapState({
      playList: (state) => state.player.playList,
      playListIndex: (state) => state.player.playListIndex,
      isPlaying: (state) => state.player.isPlaying,
      currentTime: (state) => state.player.currentTime,
    }),
  },
  methods: {
    ...mapMutations([
      "player/updatePlayStatus",
      "player/updateDuration",
      "player/updateCurrentTime",
      "player/playNext"
    ]),
    playPause() {
      if (this.$refs.myAudioPlayer.paused) {
        this.$refs.myAudioPlayer.play();
        // this.$refs.cdcover.style.animationPlayState = "running";
        // this.updatePlayStatus(true);
        this["player/updatePlayStatus"](true);
        // this['player/updateDuration'](this.$refs.myAudioPlayer.duration);

        this.updateTime();
      } else {
        this.$refs.myAudioPlayer.pause();
        // this.$refs.cdcover.style.animationPlayState = "paused";
        // this.updatePlayStatus(false);
        this["player/updatePlayStatus"](false);
        // 暂停清除定时器
        clearInterval(this.currentTimer);
      }
    },
    onLoadedmetadata(res) {
      this["player/updateDuration"](parseInt(res.target.duration));
    },
    timeupdate(res) {
      // let time = res.target.currentTime;
      // this['player/updateCurrentTime'](time);
      // time = Math.floor(time);
      // if (time !== lastSecond) {
      //     var myDate = new Date()
      //     console.log(time, myDate.getSeconds());
      //     lastSecond = time;
      // }
    },
    updateTime() {
      this.currentTimer = setInterval(() => {
        this["player/updateCurrentTime"](this.$refs.myAudioPlayer.currentTime);
      }, 1000);
    },
    gotoProgramPage(program) {
      this.$router.push({
        path: "/programView",
        query: {
          albumId: program.albumId,
          programId: program.id,
          fragmentId: program.fragmentId,
        },
      });
    },
    playNextProgram() {
        // console.log("结束了--------")
        this["player/playNext"](1);
    }
  },
  watch: {
    playList() {
      this.$refs.myAudioPlayer.autoplay = true;
      this.$refs.cdcover.style.animationPlayState = "running";
      // this.updatePlayStatus(true);
      this["player/updatePlayStatus"](true);
      this.updateTime();
    },
    playListIndex() {
      this.$refs.myAudioPlayer.autoplay = true;
      // this.updatePlayStatus(true);
      this["player/updatePlayStatus"](true);
      this.updateTime();
    },
    isPlaying(value) {
      if (
        (value && this.$refs.myAudioPlayer.paused) ||
        (!value && !this.$refs.myAudioPlayer.paused)
      ) {
        this.playPause();
      }
      this.$refs.cdcover.style.animationPlayState = value
        ? "running"
        : "paused";
    },
    currentTime(value) {
      if (Math.abs(value - this.$refs.myAudioPlayer.currentTime) > 3) {
        this.$refs.myAudioPlayer.currentTime = value;
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch("player/getLocalPlayList");
  },
  components: {
    Vue3Marquee,
  },
};
</script>

<style lang="less" scoped>
.MusicItem {
  width: 100%;
  height: 0.8rem;
  position: fixed;
  bottom: 0px;
  background-color: #fff;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 2px 2px 10px rgba(222, 222, blue, 0.5);
  border-top: 1px solid gray;
  // z-index: 5;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .cdcover {
    width: 0.9rem;
    height: 0.9rem;
    background: url("../../assets/cdcover.png");
    background-size: 0.9rem 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -0.1rem;
    left: 0.2rem;
    animation: cdroate 20s linear infinite;
    animation-play-state: paused;

    img {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
    }
  }

  .left {
    position: relative;
    display: flex;
    width: 70%;
    padding-left: 1.1rem;

    .info {
      display: flex;
      align-items: center;
      margin-left: 0.2rem;

      span {
        font-size: 0.2rem;
      }
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.2s ease;
  }

  .v-enter-from,
  .v-leave-to {
    bottom: -1000px;
    opacity: 0;
  }

  @keyframes cdroate {
    0% {
      transform: rotate(0deg);
    }

    25% {
      transform: rotate(90deg);
    }

    50% {
      transform: rotate(180deg);
    }

    75% {
      transform: rotate(270deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .right {
    width: 30%;
    display: flex;
    justify-content: space-around;
    padding-right: 0.2rem;

    svg {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
</style>

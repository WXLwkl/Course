<template>
  <!-- <nav> -->
  <!-- <router-link to="/">推荐</router-link> |
    <router-link to="/about">全部</router-link> -->
  <!-- <TopNav /> -->
  <!-- </nav> -->
  <!-- <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  <!-- <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view> -->
  <!-- <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
  </router-view> -->
  <router-view v-slot="{ Component }">
    <keep-alive :include="['HomeView']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <div style="height:40px" v-show="playerInfo.isShowMusicItem"></div>
  <MusicItem class="musicItem" v-show="playerInfo.isShowMusicItem"/>
</template>

<script>
import { reactive, watch, toRefs, onMounted } from 'vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import MusicItem from './components/AudioPlayer/MusicItem.vue';

export default {
  name: "App",
  setup() {
    const state = reactive({
      includeList: []
    })

    // onMounted(() => {

    //   const store = useStore();
    //   state.includeList = store.state.include.value.join(',')
    //   console.log(store.state.include)
    //   console.log(state.includeList)
    // })
    const store = useStore();
    let playerInfo = computed(() => {
      return store.state.player
    })


    return { state, playerInfo }
  }
}

</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.icon {
  width: .4rem;
  height: .4rem;
}
.musicItem {
  height: 50;
}
</style>

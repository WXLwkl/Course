<template>
  <div class="home">
    <!-- <TopNav @jumpView="tabsSelect"/>
    <div>
      <router-view></router-view>
    </div> -->
    <van-tabs v-model:active="active" swipeable>
      <!-- <van-tab v-for="index in 6" :title="'选项 ' + index"> -->
      <!-- 内容 {{ index }} -->
      <!-- <RecommendView v-if="index == 1" @getTabItems="getTabItems"></RecommendView>
        <TypeCourseView v-else /> -->
      <!-- </van-tab> -->
      <van-tab title="推荐">
        <RecommendView @getTabItems="getTabItems"></RecommendView>
      </van-tab>
      <van-tab v-for="item in state.items" :title="item.name">
        <TypeCourseView v-if="item" :item="item" />
      </van-tab>
    </van-tabs>
    
    <!-- <div class="userInfo">
      <p v-if="userInfo.token"> {{ userInfo.username }} </p>
      <p v-else> 未登录 </p>
    </div> -->

  </div>
</template>

<script>
// @ is an alias to /src
// import TopNav from '@/components/TopNav.vue';
import { computed } from '@vue/reactivity';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import RecommendView from './RecommendView.vue';
import TypeCourseView from './TypeCourseView.vue';

export default {
  name: 'HomeView',
  setup() {
    const state = reactive({
      items: []
    })

    const active = ref(0);

    function getTabItems(items) {
      state.items = items
      // console.log("xx====" + items)
      // items.forEach((item)=>{
      //   state.items.push(items)
      // })
      // console.log(state.items.length)
    }

    const store = useStore();
    let userInfo = computed(()=>{
      return store.state.user.userInfo;
    })


    return { state, active, getTabItems, userInfo }
  },
  components: {
    RecommendView,
    TypeCourseView
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/styles/mixins.less');

.home {
  .van-tabs {
    .van-tabs__wrap {
      .van-tabs__nav {
        width: 90%;
      }
    }
  }
  .userInfo {
    width: 100%;
    height: 100px;
  }
}
</style>
 
<template>
    <div class="recommend">
      <TopBanner :courses="data.banners"/>
      <IPCardsView :ipCards="data.ipCards"/>
      <RecommendView :hotTopCourses="data.hotTopCourses" />
      <!-- <AllLearnView :recCourses="data.recCourses" /> -->
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import TopBanner from '@/components/home/TopBanner.vue';
  import { getData } from '@/request/api/home.js'
  import { onMounted, reactive } from 'vue';
  import IPCardsView from '@/components/home/IPCardsView.vue';
  import RecommendView from '@/components/home/RecommendItem.vue';
  import AllLearnView from '@/components/home/AllLearnView.vue';
  
  export default {
    name: 'HomeView',
    setup(props, context) {
      const data = reactive({
        banners: [],
        ipCards: [],
        hotTopCourses: {},
        recCourses: []
      })
  
      onMounted(async ()=>{
        
        let res = await getData();
        data.banners = res.data.banners
        data.ipCards = res.data.ipCards
        data.hotTopCourses = res.data.hotTopCourses
        data.recCourses = res.data.recCourses

        context.emit("getTabItems", res.data.headCategories)
      })
  
      return { data }
    },
    components: {
      TopBanner,
      IPCardsView,
      RecommendView,
      AllLearnView
  }
  }
  </script>
   
   <style lang="less" scoped>
  .recommend {
    width: 100%;
    padding-top: 10px;
  }
   </style>
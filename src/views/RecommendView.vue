<template>
    <div class="recommend">
      <TopBanner :courses="data.banners"/>
      <IPCardsView :ipCards="data.ipCards"/>
      <RecommendView :hotTopCourses="data.hotTopCourses" />
      <AllLearnView :recCourses="data.recCourses" />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import TopBanner from '@/components/home/TopBanner.vue';
  import { getData } from '@/request/api/home.js'
  import { onMounted, reactive } from 'vue';
  import IPCardsView from '@/components/home/IPCardsView.vue';
  import RecommendView from '@/components/home/RecommendView.vue';
  import AllLearnView from '@/components/home/AllLearnView.vue';
  
  export default {
    name: 'HomeView',
    setup() {
  
      const data = reactive({
        banners: [],
        ipCards: [],
        hotTopCourses: {},
        recCourses: []
      })
  
      onMounted(async ()=>{
        let res = await getData();
        console.log(res.data.data)
        data.banners = res.data.data.banners
        data.ipCards = res.data.data.ipCards
        data.hotTopCourses = res.data.data.hotTopCourses
        data.recCourses = res.data.data.recCourses
        console.log(res.data.data.recCourses)
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
   
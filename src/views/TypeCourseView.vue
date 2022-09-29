<template>
  <div class="all">
    <h1> {{ item.name }} - {{ item.id }} </h1>
    <router-link to="/search">搜索</router-link>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <CourseItem v-for="course in list" :key="course" :course="course" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
  
<script>
import { ref } from 'vue';
import { getCourseListByType } from '@/request/api/home.js'
import CourseItem from '@/components/CommonViews/CourseItem.vue';

export default {
  setup(props) {

    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);

    let index = 1

    const onLoad = async () => {
      if (refreshing.value) {
        list.value = []
        refreshing.value = false
        index = 1
      }
      let res = await getCourseListByType(props.item.id, index.toString());
      index += 1
      res.data.forEach((item) => {
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
    const onRefresh = () => {
      // 清空列表数据
      finished.value = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();
    };

    return { list, onLoad, loading, finished, onRefresh, refreshing };
  },
  props: ["item"],
  components: { CourseItem }
}
</script>

<style lang="less" scoped>
.all {
  width: 100%;
  padding: 5px 15px;
}
</style>

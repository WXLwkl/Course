<template>
  <!-- <nav> -->
    <!-- <router-link to="/">推荐</router-link> |
    <router-link to="/about">全部</router-link> -->
    <!-- <TopNav /> -->
  <!-- </nav> -->
  <router-view/>
</template>

<script>
import TopNav from '@/components/TopNav.vue';

export default {
  name: 'HomeView',
  components: {
    TopNav,
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
</style>

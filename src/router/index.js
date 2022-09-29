import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RecommendView from "../views/RecommendView.vue";
import TypeCourseView from "../views/TypeCourseView.vue";
import store from '@/store/index.js'

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/courseDetail",
    name: "CourseDetailView",
    meta: {
      keepAlive: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/CourseDetailView.vue"),
  },
  {
    path: "/programView",
    name: "ProgramView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/ProgramView.vue"),
  },
  {
    path: "/search",
    name: "SearchView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/SearchView.vue"),
  },
  {
    path: "/about",
    name: "AboutView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/:path(.*)",
    name: "notFount",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
router.beforeEach((to,from)=>{
  store.state.player.isShowMusicItem = (to.path !='/programView')
})

// router.beforeEach((to, from, next) => {

//   console.log(to.name, from.name, "=========")

//   const toDepth = to.path.split("/").length;
//   const fromDepth = from.path.split("/").length;
// 
//   const isPush = toDepth > fromDepth || to.path === store.state.pushPath;
//   to.meta.transitionName =
//     toDepth > fromDepth ?
//       'slide-left' :
//       (to.path === store.state.pushPath ?
//         'slide-left' :
//         'slide-right');

//   if (to.meta.keepAlive) {
//     store.commit("addIncludes", to.name);
//   }

//   if (from.meta.keepAlive && !isPush) {
//     store.commit("minusIncludes", from.name);
//   }

//   next();
// });

export default router;

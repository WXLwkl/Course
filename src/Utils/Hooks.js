import { onBeforeRouteLeave, useRouter } from "vue-router";

// 这里把targetPages参数设置为数组，因为目标页面可能有多个，比如B -> C, B -> D
export function useKeepPage(targetPages) {
  const router = useRouter();

  /**
   * @description: 更新路由meta.keepAlive值
   * @param {name} string 需要修改的路由名称
   * @param {val} boolean 修改的值
   * @return {*}
   */
  const updateRouterKeepAlive = (name, val) => {
    router.options.routes.map((item) => {
      if (item.name === name) {
        item.meta.keepAlive = val;
      }
    });
  };

  /**
   * @description: 设置页面缓存
   * @param {toName} string 目标页面name
   * @param {formName} string 来源页面name
   * @return {*}
   */
  const setKeepPage = (toName, formName) => {
    // 判断是否进入目标页面
    if (!targetPages.includes(toName)) {
      updateRouterKeepAlive(formName, false);
    } else {
      updateRouterKeepAlive(formName, true);
    }
  };

  // 设置路由钩子
  onBeforeRouteLeave((to, from) => {
    setKeepPage(to.name, from.name);
  });

  return {
    setKeepPage,
    updateRouterKeepAlive,
  };
}

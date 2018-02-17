
import Vue from 'vue';
import { createApp } from './app';

import('./common/common.less')
// import('c3/c3.css');

const { app, router, store } = createApp();

// 同步服务端数据
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

// 处理 /user/1 -> /user/2的路由更新
Vue.mixin({
    beforeRouteUpdate (to, from, next) {
      const { asyncData } = this.$options
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to
        }).then(next).catch(next)
      } else {
        next()
      }
    }
})

router.onReady(() => {

    // 客户端数据预加载
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        // 我们只关心之前没有渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
          return diffed || (diffed = (prevMatched[i] !== c))
        })
        if (!activated.length) {
          return next()
        }
        // 这里如果有加载指示器(loading indicator)，就触发
        Promise.all(activated.map(c => {
          if (c.asyncData) {
            return c.asyncData({ store, route: to })
          }
        })).then(() => {
          // 停止加载指示器(loading indicator)
          next()
        }).catch(next)
      })

    app.$mount('#app')
});
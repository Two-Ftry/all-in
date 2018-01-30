/**
 * Created by jfhuang on 18/1/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

require('./style.css');
import('./common/init');

// 设置路由
Vue.use(VueRouter);
import routes from './router/';
const router = new VueRouter({
    routes
})

import App from './App.vue';
const _App = Vue.extend(App);

new _App({
    router
}).$mount('#app');
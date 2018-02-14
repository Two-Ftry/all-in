import Vue from 'vue';
import App from './App.vue';
import { sync } from 'vuex-router-sync'

import { createRouter } from './routers/router';
import { createStore } from './store/store';

export function createApp () {
    // const _App = Vue.extend(App);
    // const app = new _App();
    
    
    const router = createRouter();
    const store = createStore();

    // 同步路由状态(route state)到 store
    sync(store, router)

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return {
        app,
        router,
        store
    };
};
import Vue from 'vue';
import App from './App.vue';

import { createRouter } from './router/';

export function createApp () {
    // const _App = Vue.extend(App);
    // const app = new _App();
    const router = createRouter();

    const app = new Vue({
        router,
        render: h => h(App)
    })

    return {
        app,
        router
    };
};
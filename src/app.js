import Vue from 'vue';
import App from './App.vue';

export function createApp () {
    // const _App = Vue.extend(App);
    // const app = new _App();
    const app = new Vue({
        render: h => h(App)
    })

    return {
        app
    };
};
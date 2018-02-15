import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// import Foo from '../views/Foo.vue';
// import Bar from '../views/Bar.vue';
const Foo = () => import('../views/Foo.vue');
const Bar = () => import('../views/Bar.vue');

export function createRouter () {
    return new VueRouter({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: Foo
            },
            {
                name: 'foo',
                path: '/foo',
                component: Foo
            },
            {
                name: 'bar',
                path: '/bar',
                component: Bar
            }
        ]
    })
};

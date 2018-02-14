
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// import Foo from '../components/Foo.vue';
// import Bar from '../components/Bar.vue';
// import Baz from '../components/Baz.vue';
const Foo = () => import('../components/Foo.vue');
const Bar = () => import('../components/Bar.vue');
const Baz = () => import('../components/Baz.vue');

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
            },
            {
                name: 'baz',
                path: '/baz',
                component: Baz
            },
            { path: '/item/:id', component: () => import('../components/Item.vue') }
        ]
    })
};
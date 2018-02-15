import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// import Foo from '../views/Foo.vue';
// import Bar from '../views/Bar.vue';
// const Foo = () => import('../views/Foo.vue');
// const Bar = () => import('../views/Bar.vue');
const ListPage = () => import('../modules/cards/ListPage.vue');
const EditPage = () => import('../modules/cards/edit/EditPage.vue');

export function createRouter () {
    return new VueRouter({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: ListPage
            },
            {
                name: 'edit',
                path: '/edit',
                component: EditPage
            },
            {
                name: 'list',
                path: '/list',
                component: ListPage
            }
        ]
    })
};

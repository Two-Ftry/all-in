import Vue from 'vue';
import VueRouter from 'vue-router';

// import ListPage from '../modules/cards/list/ListPage.vue';
// import EditPage from '../modules/cards/edit/EditPage.vue';

Vue.use(VueRouter);

// 单独的chunkFilename
const ListPage = () => import(/* webpackChunkName: "list" */ '../modules/cards/list/ListPage.vue');
const EditPage = () => import(/* webpackChunkName: "edit" */ '../modules/cards/edit/EditPage.vue');
const InteractionPage = () => import(/* webpackChunkName: "mouse" */ '../modules/interaction/mouse.vue');

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
            },
            {
                name: 'interaction',
                path: '/interaction',
                component: InteractionPage
            }
        ]
    })
};

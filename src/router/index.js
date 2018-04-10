import Vue from 'vue';
import VueRouter from 'vue-router';

// import ListPage from '../modules/cards/list/ListPage.vue';
// import EditPage from '../modules/cards/edit/EditPage.vue';

Vue.use(VueRouter);

// 单独的chunkFilename
const ListPage = () => import(/* webpackChunkName: "list" */ '../modules/cards/list/ListPage.vue');
const EditPage = () => import(/* webpackChunkName: "edit" */ '../modules/cards/edit/EditPage.vue');
const InteractionPage = () => import(/* webpackChunkName: "interaction" */ '../modules/interaction/interaction.vue');
const MousePage = () => import(/* webpackChunkName: "interaction" */ '../modules/interaction/mouse.vue');
const TouchPage = () => import(/* webpackChunkName: "interaction" */ '../modules/interaction/touch.vue');
const ZoomPage = () => import(/* webpackChunkName: "interaction" */ '../modules/interaction/zoom.vue');
const DragPage = () => import(/* webpackChunkName: "interaction" */ '../modules/interaction/drag.vue');

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
                path: '/interaction',
                component: InteractionPage,
                children: [
                    {
                        path: '/',
                        component: MousePage
                    },
                    {
                        name: 'mouse',
                        path: 'mouse',
                        component: MousePage
                    },
                    {
                        name: 'touch',
                        path: 'touch',
                        component: TouchPage
                    },
                    {
                        name: 'zoom',
                        path: 'zoom',
                        component: ZoomPage
                    },
                    {
                        name: 'drag',
                        path: 'drag',
                        component: DragPage
                    }
                ]
            }
        ]
    })
};

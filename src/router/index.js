/**
 * Created by jfhuang on 18/1/20.
 */
// function xRequire(module) {
//     return new Promise((resolve) => {
//         require.ensure(['../_modules.js'], () => {
//             const modules = require('../_modules.js')
//             resolve(modules[module])
//         }, 'ensure-chunk')
//     });
// }
const List = () => import(/* webpackChunkName: "my-chunk" */ '../list/List.vue');
const Detail = () => import(/* webpackChunkName: "my-chunk" */ '../detail/Detail.vue');
const Edit = () => import(/* webpackChunkName: "my-chunk" */ '../edit/Edit.vue');
// const List = xRequire('list');
// const Detail = xRequire('detail');
// const Edit = xRequire('edit');

export default [
    {
        path: '/',
        component: List
    },
    {
        path: '/list',
        component: List
    },
    {
        path: '/detail',
        component: Detail
    },
    {
        path: '/edit',
        component: Edit
    }
]
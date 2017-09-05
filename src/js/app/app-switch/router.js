/**
 * @author rubyisapm
 */
import App from './component/app.vue';
import VueRouter from 'vue-router';
import Modal from './component/modal';
import Update from './component/update';
export default new VueRouter({
    routes: [
        // 动态路径参数 以冒号开头
        {
            path: '/', redirect: '/android'
        },
        {
            path: '/:os',
            component: App,
            children: [{
                path: 'modal',
                component: Modal,
                children: [{
                    path: 'update',
                    component: Update
                }]
            }]
        }
    ]
});

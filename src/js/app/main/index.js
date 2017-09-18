/**
 * @author rubyisapm
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router';
import store from './store';
import Const from 'common/const';
new Vue({
    el: '#app',
    router,
    store,
    data: {
        os: ''
    },
    computed: {
        href(){
            return this.os === 'android' ? '#/ios' : '#/android';
        }
    },
    created(){
        this.os = this.$route.params.os;
    },
    watch: {
        '$route.params.os': function(os) {
            this.os = os;
            this.$store.dispatch('switchOs', Const.getKey('os', os));
        }
    }
});

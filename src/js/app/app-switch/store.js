/**
 * @author rubyisapm
 */
import Vue from 'vue';
import Vuex from 'vuex';
import Const from 'common/const';
Vue.use(Vuex);
var targetInfoTemplate = {
    sourceAppType: Const.getKey('appType', '脚本化'),
    sourceAppCode: '',
    sourceAppName: '',
    sourcePackageName: '',
    targetAppId: ''
};

export default new Vuex.Store({
    state: {
        operateType: '',
        targetId: '',
        targetInfo: JSON.parse(JSON.stringify(targetInfoTemplate)),
        os: Const.getKey('os', 'android')
    },
    mutations: {
        update(state, id){
            state.operateType = 'update';
            state.targetId = id;
        },
        add(state){
            state.operateType = 'add';
        },
        syncTargetId(state, id){
            Object.assign(state.targetId, id);
        },
        syncTargetInfo(state, info){
            Object.assign(state.targetInfo, info);
        },
        resetTargetInfo(state){
            state.targetInfo = JSON.parse(JSON.stringify(targetInfoTemplate));
        },
        switchOs(state, os){
            state.os = os;
        }
    },
    actions: {
        update(context, id) {
            context.commit('update', id);
        },
        add(context, id) {
            context.commit('add', id);
            context.commit('resetTargetInfo');
        },
        syncTargetId(context, id){
            context.commit('syncTargetId', id);
        },
        syncTargetInfo(context, info){
            context.commit('syncTargetInfo', info);
        },
        switchOs(context, os){
            context.commit('switchOs', os);
        }
    }
});

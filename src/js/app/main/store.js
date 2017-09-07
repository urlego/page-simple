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
        operateType: '', // 操作类型
        targetId: '', // 操作目标Id
        targetInfo: JSON.parse(JSON.stringify(targetInfoTemplate)), // 操作目标的信息
        os: Const.getKey('os', 'android') // 操作系统
    },
    mutations: {
        update(state){
            state.operateType = 'update';
        },
        add(state){
            state.operateType = 'add';
        },
        syncTargetId(state, id){
            state.targetId = id;
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
            context.commit('update');
            context.commit('syncTargetId', id);
        },
        add(context, id) {
            context.commit('add', id);
            context.commit('resetTargetInfo');
        },
        syncTargetInfo(context, info){
            context.commit('syncTargetInfo', info);
        },
        switchOs(context, os){
            context.commit('switchOs', os);
        }
    }
});

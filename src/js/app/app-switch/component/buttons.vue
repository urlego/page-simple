<template>
    <div>
        <button type="button" class="btn btn-xs btn-primary" @click="edit">
            <i class="glyphicon glyphicon-edit"></i> 编辑
        </button>
        <button type="button" class="btn btn-xs btn-danger" @click="toggleStatus" v-if="getStatusText()==='已启用'">
            <i class="glyphicon glyphicon-ban-circle"></i> 禁用
        </button>
        <button type="button" class="btn btn-xs btn-success" @click="toggleStatus($event)" v-if="getStatusText()==='已禁用'">
            <i class="glyphicon glyphicon-ok-circle"></i> 启用
        </button>
    </div>
</template>
<script type="text/ecmascript-6">
    import router from '../router.js';
    import store from '../store.js';
    import Interface from 'common/interface';
    import utility from 'ct-utility';
    import Const from 'common/const';
    export default{
        name: 'buttons',
        store,
        props: {
            prop: {
                type: String,
                default: ''
            },
            item: {
                type: Object,
                default(){
                    return {};
                }
            },
            index: {
                type: Number,
                default(){
                    return -1;
                }
            },
            data: {
                type: Array,
                default(){
                    return [];
                }
            }
        },
        methods: {
            getStatusText(){
                return Const.getVal('switchStatus', this.item.disable);
            },
            edit(){
                this.$store.dispatch('update', this.item.id);
                router.push({path: 'modal/update', append: true});
            },
            toggleStatus(e){
                e.stopPropagation();
                var that = this;
                var text = this.getStatusText() === '已启用' ? '禁用' : '启用';

                popoverConfirm.init({
                    UID: this.item.id,
                    title: '确定' + text + this.item.sourceAppName + '吗？',
                    loadingContent: text + this.item.sourceAppName + '中...',
                    $trigger: $(e.currentTarget),
                    ajax: {
                        config: {
                            type: 'get',
                            url: Interface.appSwitch.updateStatus,
                            data: {
                                id: this.item.id,
                                disable: !this.item.disable
                            }
                        },
                        callback: function(res) {
                            res = utility.objTransfer.lowerKey(res);
                            if (res.status) {
                                popoverConfirm.setContent({
                                    title: '操作成功',
                                    content: '<span class="text-success">' + text + '成功</span>'
                                });
                                setTimeout(()=>{
                                    popoverConfirm.destroy();
                                    that.$parent.$emit('operate-success');
                                }, 2000);
                            } else {
                                popoverConfirm.setContent({
                                    title: '操作失败',
                                    content: '<span class="text-danger">' + res.message + '</span>'
                                });
                            }
                        },
                        error: function(xhr) {
                            var msg = '';

                            if (xhr.status === 401) {
                                msg = '您没有权限';
                            } else {
                                msg = '操作失败';
                            }
                            popoverConfirm.setContent({
                                title: '操作失败',
                                content: '<span class="text-danger">' + msg + '</span>'
                            });
                        }
                    }
                });
            }
        }
    };
</script>

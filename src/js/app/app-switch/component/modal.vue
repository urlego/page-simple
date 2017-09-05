<template>
    <div class="modal fade" data-backdrop="static" ref="modal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click="hide"><span>&times;</span></button>
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <div class="modal-body">
                    <div class="loading" style="height:100px;" v-if="loading"></div>
                    <div style="height:100px;" v-else-if="!loadStatus">{{loadMsg}}</div>
                    <template v-else>
                        <router-view ref="form"></router-view>
                        <div class="clearfix">
                            <div class="col-sm-12 text-danger alert alert-danger"
                                 v-if="!saveStatus">
                                {{saveMsg}}
                            </div>
                        </div>
                    </template>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary"
                            v-if="operateType === 'add' || operateType === 'update'" @click="save">
                        <i class="glyphicon glyphicon-refresh rotate" v-if="saving"></i>
                        <i class="glyphicon glyphicon-saved" v-if="!saving"></i>
                        保存
                    </button>
                    <button type="button" class="btn btn-default" @click="hide">
                        {{operateType==='view' ? '关闭' : '取消'}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import router from '../router';
    import store from '../store';
    import Interface from 'common/interface';
    import utility from 'ct-utility';
    export default{
        store,
        data(){
            return {
                loading: false,
                saving: false,
                loadStatus: true,
                loadMsg: '',
                saveStatus: true,
                saveMsg: ''
            };
        },
        computed: {
            operateType(){
                return this.$store.state.operateType;
            },
            title(){
                var titles = {
                    view: '查看',
                    update: '编辑',
                    add: '添加'
                };

                return titles[this.operateType];
            }
        },
        methods: {
            show(){
                $(this.$refs.modal).modal('show');
            },
            hide(){
                $(this.$refs.modal).modal('hide');
                router.go(-1);
            },
            getInfo(){
                Promise.resolve($.ajax({
                    url: Interface.appSwitch.getInfo,
                    type: 'get',
                    data: {
                        id: this.$store.state.targetId
                    }
                })).then(res=> {
                    res = utility.objTransfer.lowerKey(res);
                    if (res.status) {
                        this.loadStatus = true;
                        this.loadMsg = '';
                        this.$store.dispatch('syncTargetInfo', res.data);
                    } else {
                        return Promise.reject(res.message);
                    }
                }).catch(xhr=> {
                    let msg = '请求失败';

                    if (xhr.status === 401) {
                        msg = '您无权限';
                    } else if (typeof xhr === 'string') {
                        msg = xhr;
                    }
                    this.loadStatus = false;
                    this.loadMsg = msg;
                });
            },
            save(){
                this.$refs.form.touchAll();
                if (this.$refs.form.validation._pass) {
                    this.$refs.form.syncForm();
                    this.saving = true;
                    var reqData = utility.objTransfer.upperKey(Object.assign({}, this.$store.state.targetInfo, {
                        os: this.$store.state.os
                    }));

                    Promise.resolve($.ajax({
                        url: Interface.appSwitch.update,
                        data: reqData,
                        type: 'post'
                    })).then(res=> {
                        res = utility.objTransfer.lowerKey(res);
                        if (res.status) {
                            this.saveStatus = true;
                            this.saveMsg = '';
                            new MiniMsg({
                                content: '保存成功',
                                type: 'success'
                            }).animation(()=> {
                                this.hide();
                                this.$emit('success');
                            });
                        } else {
                            return Promise.reject(res.message);
                        }
                    }).catch(msg=> {
                        if (typeof msg !== 'string') {
                            if (msg.status === 401) {
                                msg = '您没有权限';
                            } else {
                                msg = '保存失败';
                            }
                        }
                        this.saveStatus = false;
                        this.saveMsg = msg;
                    }).then(()=> {
                        this.saving = false;
                    });
                }
            }
        },
        beforeRouteEnter(to, from, next){
            next(vm=> {
                vm.show();
                if (vm.$store.state.operateType === 'update' || vm.$store.state.operateType === 'view'){
                    vm.getInfo();
                }
            });
        }
    };
</script>

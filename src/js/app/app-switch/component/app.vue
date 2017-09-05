<template>
    <div>
        <search ref="search" @search="search"></search>
        <div class="mb10 clearfix">
            <button type="button" class="btn btn-sm btn-primary pull-right" @click="add">
                <span class="glyphicon glyphicon-plus"></span>
                添加
            </button>
        </div>
        <adc-table :data="list.data"
                   :status="list.status"
                   :msg="list.msg"
                   :loading="list.loading" @operate-success="getData">
            <adc-table-column prop="id" name="序号"></adc-table-column>
            <adc-table-column prop="sourceAppType" name="被转接应用类型" :mapper="list.source.appType"></adc-table-column>
            <adc-table-column prop="sourceAppCode" name="被转接应用缩写"></adc-table-column>
            <adc-table-column prop="sourceAppName" name="被转接应用名称"></adc-table-column>
            <adc-table-column prop="sourcePackageName" name="被转接应用包名"></adc-table-column>
            <adc-table-column prop="targetAppId" name="目标应用ID"></adc-table-column>
            <adc-table-column prop="targetAppCode" name="目标应用缩写"></adc-table-column>
            <adc-table-column prop="targetAppName" name="目标应用名称"></adc-table-column>
            <adc-table-column prop="disable" name="状态" :mapper="list.source.switchStatus" :class-name="list.className.switchStatus"></adc-table-column>
            <adc-table-column name="操作" :vm="list.vm.operation"></adc-table-column>
        </adc-table>
        <page form
              :curr-page="pageInfo.pageIndex"
              :page-length="pageInfo.pageSize"
              :total-num="pageInfo.count" @change-page="changePage"></page>
        <router-view @success="getData"></router-view>
    </div>
</template>
<script type="es6">
    import Const from 'common/const';
    import List from 'ct-adc-list';
    import Page from 'ct-adc-page';
    import Search from './search';
    import Interface from 'common/interface';
    import utility from 'ct-utility';
    import Modal from './modal';
    import Buttons from './buttons';
    import Vue from 'vue';
    import router from '../router';
    import store from '../store';
    Vue.component('appSwitchListButtons', Buttons);
    export default{
        router,
        store,
        components: {
            Search,
            List,
            Page,
            'adc-table': List['adc-table'],
            'adc-table-column': List['adc-table-column'],
            Modal
        },
        data(){
            return {
                os: '',
                form:{
                    sourceAppName: '',
                    sourceAppCode: '',
                    disable: Const.getKey('switchStatus', '不限')
                },
                list: {
                    data: [],
                    status: true,
                    msg: '',
                    loading: false,
                    vm: {
                        operation: {
                            name: 'appSwitchListButtons'
                        }
                    },
                    source: {
                        switchStatus: Const.getData('switchStatus', false),
                        appType: Const.getData('appType',false)
                    },
                    className: {
                        switchStatus(val){
                            if(val === '已启用'){
                                return 'text-success';
                            }else if(val === '已禁用'){
                                return 'text-danger';
                            }
                            return '';
                        }
                    }
                },
                pageInfo: {
                    pageIndex: 1,
                    count: 0,
                    pageSize: 10
                }
            }
        },
        created(){
            this.os = Const.getKey('os', this.$route.params.os);
            this.getData();
        },
        computed: {
            searchData(){
                return Object.assign({}, this.form, {
                    os: this.os,
                    pageIndex: this.pageInfo.pageIndex,
                    pageSize: this.pageInfo.pageSize
                })
            }
        },
        methods: {
            getData(){
                this.list.loading = true;
                Promise.resolve($.ajax({
                    url: Interface.appSwitch.getList,
                    type: 'get',
                    cache: false,
                    data: this.searchData
                })).then(res=>{
                    res = utility.objTransfer.lowerKey(res);
                    if(res.status){
                        this.list.data = res.data.rows;
                        this.pageInfo.count = res.data.totalCount;
                        this.pageInfo.pageIndex = res.data.actualPageIndex;
                    }else{
                        return Promise.resolve(res.message);
                    }
                }).catch(err=>{
                    let msg = '请求失败';
                    if(typeof err === 'string'){
                        msg = err;
                    }
                    this.list.status = false;
                    this.list.msg = msg;
                }).then(()=>{
                    this.list.loading = false;
                    this.$refs.search.stopSearching();
                })
            },
            search(form){
                Object.assign(this.form, form);
                this.getData();
            },
            changePage(page){
                this.pageInfo.pageIndex = page;
                this.getData();
            },
            add(){
                this.$store.dispatch('add');
                this.$router.push({path: 'modal/update', append: true});
            }
        },
        watch: {
            '$route.params.os': function(os) {
                this.os = Const.getKey('os', os);
                this.$store.dispatch('switchOs', Const.getKey('os', os));
                this.getData();
            }
        }
    }
</script>

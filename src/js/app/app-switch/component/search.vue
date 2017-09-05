<template>
    <div class="well well-sm clearfix">
        <form action="javascript:;" class="form-horizontal form-horizontal-sm">
            <div class="col-lg-11 col-sm-11 text-nowrap">
                <div class="col-lg-3 col-sm-4">
                   <div class="form-group form-group-sm">
                       <label class="col-sm-4 control-label">被转接应用名称</label>
                       <div class="col-sm-8">
                           <input type="text" class="form-control" maxlength="10" v-model="form.sourceAppName">
                       </div>
                   </div>
                </div>
                <div class="col-lg-3 col-sm-4">
                   <div class="form-group form-group-sm">
                       <label class="col-sm-4 control-label">被转接应用缩写</label>
                       <div class="col-sm-8">
                           <input type="text" class="form-control" maxlength="6" v-model="form.sourceAppCode">
                       </div>
                   </div>
                </div>
                <div class="col-lg-3 col-sm-4">
                    <div class="form-group form-group-sm">
                        <label class="col-sm-4 control-label">状态</label>
                        <div class="col-sm-8">
                            <select class="form-control" v-model="form.disable">
                                <option v-for="item in switchStatusList" :value="item.key">{{item.val}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-1 col-sm-1 text-right">
                <div class="form-group form-group-sm">
                    <button type="submit" class="btn btn-sm btn-primary" @click="goSearch">
                        <i class="glyphicon glyphicon-search" v-if="!searching"></i>
                        <i class="glyphicon glyphicon-refresh rotate" v-else></i>
                        搜索
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script type="text/ecmascript-6">
    import Const from 'common/const';
    export default {
        name: 'search',
        data(){
            return {
                searching: false,
                form: {
                    sourceAppName: '',
                    sourceAppCode: '',
                    disable: Const.getKey('switchStatus', '不限')
                },
                switchStatusList: Const.getData('switchStatus')
            };
        },
        methods: {
            stopSearching: function(){
                this.searching = false;
            },
            goSearch: function(){
                this.searching = true;
                this.$emit('search', JSON.parse(JSON.stringify(this.form)));
            }
        }
    };
</script>

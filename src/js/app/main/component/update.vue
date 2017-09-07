<template>
    <div>
        <form class="form-horizontal">
            <div class="page-header">
                <h4 class="col-offset-1 text-muted">被转接信息</h4>
            </div>
            <div class="form-group form-group-sm">
                <label class="control-label col-sm-3 form-control-static">
                    被转接应用类型
                </label>

                <div class="col-sm-6 form-control-static">
                    {{toAppTypeName(form.sourceAppType)}}
                </div>
            </div>
            <div class="form-group form-group-sm">
                <label class="control-label col-sm-3">
                    <i class="red">*</i> 被转接应用缩写
                </label>

                <div class="col-sm-3">
                    <input type="text"
                           class="form-control"
                           v-model="form.sourceAppCode"
                           @change="touch('sourceAppCode')"
                           maxlength="6"/>
                </div>
                <div class="col-sm-3 text-danger form-control-static"
                     v-if="formTouched.sourceAppCode && !validation.sourceAppCode.required">
                    请填写
                </div>
                <div class="col-sm-3 text-danger form-control-static"
                     v-else-if="formTouched.sourceAppCode && !validation.sourceAppCode.onlyLetter">
                    只能为英文字母
                </div>
            </div>
            <div class="form-group form-group-sm">
                <label class="control-label col-sm-3">
                    <i class="red">*</i> 被转接应用名称
                </label>
                <div class="col-sm-3">
                    <input type="text"
                           class="form-control"
                           v-model="form.sourceAppName"
                           @change="touch('sourceAppName')"
                           maxlength="10">
                </div>
                <div class="col-sm-3 text-danger form-control-static"
                     v-if="formTouched.sourceAppName && !validation.sourceAppName.required">
                    请填写
                </div>
            </div>
            <div class="form-group form-group-sm">
                <label class="control-label col-sm-3">
                    <i class="red">*</i> 被转接应用包名
                </label>
                <div class="col-sm-3">
                    <input type="text"
                           class="form-control"
                           v-model="form.sourcePackageName"
                           @change="touch('sourcePackageName')"
                           maxlength="100">
                </div>
                <div class="col-sm-3 text-danger form-control-static"
                     v-if="formTouched.sourcePackageName && !validation.sourcePackageName.required">
                    请填写
                </div>
            </div>
            <div class="page-header">
                <h4 class="col-offset-1 text-muted">目标应用信息</h4>
            </div>
            <div class="form-group form-group-sm">
                <label class="control-label col-sm-3">
                    <i class="red">*</i> 目标应用ID
                </label>
                <div class="col-sm-3">
                    <input type="text"
                           class="form-control"
                           v-model="form.targetAppId"
                           @change="touch('targetAppId')"
                           maxlength="10">
                </div>
                <div class="col-sm-3 text-danger form-control-static"
                     v-if="formTouched.targetAppId && !validation.targetAppId.required">
                    请填写
                </div>
                <div class="col-sm-3 text-danger form-control-static"
                     v-else-if="formTouched.targetAppId && !validation.targetAppId.isNumber">
                    只能为数字
                </div>
            </div>
        </form>
    </div>
</template>
<script type="text/ecmascript-6">
    import mixins from 'ct-adc-mixins';
    import Const from 'common/const';
    var Validator = mixins.Validator;

    export default{
        mixins: [new Validator({
            sourceAppCode: {
                rules: {
                    required: {
                        rule: /.+/
                    },
                    onlyLetter: {
                        rule: /^[a-zA-Z]+$/
                    }
                },
                form: 'form.sourceAppCode'
            },
            sourceAppName: {
                rules: {
                    required: {
                        rule: /.+/
                    }
                },
                form: 'form.sourceAppName'
            },
            sourcePackageName: {
                rules: {
                    required: {
                        rule: /.+/
                    }
                },
                form: 'form.sourcePackageName'
            },
            targetAppId: {
                rules: {
                    required: {
                        rule: /.+/
                    },
                    isNumber: {
                        rule: /^\d+$/
                    }
                },
                form: 'form.targetAppId'
            }
        })],
        data(){
            return {
                form: {}
            };
        },
        created(){
            this.$set(this, 'form', this.$store.state.targetInfo);
        },
        methods: {
            toAppTypeName(key){
                return Const.getVal('appType', key);
            },
            /**
             * 同步form表单内容到store,便于在modal中保存
             */
            syncForm(){
                this.$store.commit('syncTargetInfo', JSON.parse(JSON.stringify(this.form)));
            }
        }
    };
</script>

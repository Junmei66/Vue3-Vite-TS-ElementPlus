

<template>
<div class="container">
  <div class="login-box">
    <div class="title">用户登录</div>
    <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="65px" label-color="#ffffff">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password" />
      </el-form-item>
    </el-form>
    <div class="text">用户名admin或者guest，密码随便</div>
    <div class="btn-box">
      <el-button type="primary" @click="onSubmit(ruleFormRef)">登录</el-button>
    </div>
</div>
</div>

</template>

<script lang="ts" setup>

import { useUserStore } from "@/store";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const ruleFormRef = ref<FormInstance>()
const formData = reactive({
  username: "admin",
  password: "123",
});
const rules = reactive<FormRules>({
  username: [{required: true, message: '用户名不能为空'}],
  password: [{required: true, message: '密码不能为空'}]
})

const router = useRouter()

const userStore = useUserStore()

const onSubmit = async (formEl: FormInstance | undefined) => {
    if(!formEl) return
    await formEl.validate((valid)=>{
      if(valid){
        userStore.handleLogin({name: formData.username}).then(res=>{
          console.log(res,'res')
          if(res.status == 200){
            if(res.data.length > 0){
                ElMessage({
                message: "用户" + formData.username + "登录成功",
                type: "success",
              });
              setTimeout(() => {
                router.push({path: "/"})
              }, 200);
            }else{
              ElMessage({
                message: "用户不存在！",
                type: "warning",
              });
            }
          }
        })
      }else{
        return
      }
    })
  }

</script>

<style>
.el-form-item__label{
  color: #ffffff;
}
</style>

<style scoped lang="scss">
.container{
  background: #545c64;
  width: 100%;
  height: 100vh;
  text-align: center;
  color: #ffffff;
}
.login-box{
  max-width: 400px;
  width: 90%;
  margin: 0 auto;
  padding-top: 80px;
  .title{
    font-size: 22px;
    font-weight: 600;
    margin: 30px;
    letter-spacing: 2px;
  }
}
.text{
  font-size: 13px;
  color: #b3b3b4;
  text-align: left;
  padding-bottom: 20px;
  margin-left: 65px;
}
.btn-box{
  text-align: center;
}
</style>

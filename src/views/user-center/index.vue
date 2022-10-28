<template>

  <el-descriptions
    class="margin-top"
    :column="3"
    border
  >
    <template #title>
      <div class="title">用户信息</div>
    </template>
    <template #extra>
      <el-button type="primary" @click="handleEdit">Edit</el-button>
    </template>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          Name
        </div>
      </template>
      {{userData.name}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <female />
          </el-icon>
          Sex
        </div>
      </template>
      {{userData.sex}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Histogram />
          </el-icon>
          Age
        </div>
      </template>
      {{userData.age}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <iphone />
          </el-icon>
          Telephone
        </div>
      </template>
      {{userData.tel}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <location />
          </el-icon>
          Address
        </div>
      </template>
      {{userData.address}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <CollectionTag />
          </el-icon>
          Tags
        </div>
      </template>
      <el-tag size="small" v-for="tag in userData.tags" :key="tag">{{tag}}</el-tag>
    </el-descriptions-item>
  </el-descriptions>
  <el-dialog center v-model="dialogVisible" title="编辑信息">
    <el-form ref="ruleFormRef" :model="formData" label-width="80px">
      <el-form-item label="Name" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="Sex" prop="sex">
        <el-input v-model="formData.sex" />
      </el-form-item>
      <el-form-item label="Age" prop="age">
        <el-input v-model="formData.age" />
      </el-form-item>
      <el-form-item label="Telephone" prop="tel">
        <el-input v-model="formData.tel" />
      </el-form-item>
      <el-form-item class="tag-item" label="Tags" prop="tag">
        <el-input v-model="tag" />
        <el-button type="warning" size="small" @click="addTag">确定</el-button>
        <div class="tags"><el-tag @click="handleTag(tag)" size="small" v-for="tag in formData.tags" :key="tag">{{tag}}</el-tag></div>
        
      </el-form-item>
      <el-form-item label="Address" prop="address">
        <el-input v-model="formData.address" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">提交修改</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { putUser } from "@/api/index";
import { ElMessage, FormInstance } from 'element-plus';
import { useUserStore } from '@/store';
import { UserState } from '@/types/store';
import { deepClone, getChanged, updateRecord } from '@/utils';

const iconStyle = computed(() => {
  return {
    right: '4px',
    top: '2px'
  }
})

const tag = ref("")


let userData = ref({})

const formData = reactive({
  id: 0,
  name: "",
  sex: "",
  age: 0,
  tel: "",
  address: "",
  tags: [] as any,
  roles: [] as any,
})

const userStore = useUserStore()

const getData = ()=>{
  userStore.getInfo().then((data: UserState)=>{
      userData.value = data
  })
}
onMounted(()=>{
  getData()
})

const dialogVisible = ref(false)

const handleEdit = () => {
  const newRow = deepClone(userData.value)
  formData.roles = newRow.roles
  formData.id = newRow.id
  formData.name = newRow.name
  formData.sex = newRow.sex
  formData.age = newRow.age
  formData.tel = newRow.tel
  formData.address = newRow.address
  formData.tags = newRow.tags
  dialogVisible.value = true
}
const ruleFormRef = ref<FormInstance>()
const onSubmit = async (formEl: FormInstance | undefined) => {
    if(!formEl) return

    await formEl.validate((valid, fields)=>{
      if(valid){
        let resData = getChanged(userData.value, formData)
        if(resData?.keyArr?.length == 0){
          ElMessage({
            message: "您还没有修改任何数据",
            type: "warning",
          });
          return
        }
        putUser(formData, formData.id).then((res:any) => {
            if (res.status == 200) {
              ElMessage({
                message: "数据修改成功",
                type: "success",
              });
              dialogVisible.value = false
              getData()
              userStore.getInfo()
              updateRecordFun()
            }
          })
      }else{
        ElMessage({
          message: "error：" + fields,
          type: "warning",
        });
      }
    })
  }
  const updateRecordFun = () => {
      let keyArr = (getChanged(userData.value, formData)).keyArr
      if(keyArr?.length){
        let contStr = "将用户信息的"
        for(let k = 0; k < keyArr.length; k++){
          contStr += keyArr[k] + "由" + userData.value[keyArr[k]] + "修改为" + formData[keyArr[k]]
          if(k == keyArr.length){
            contStr += "。"
          }else{
            contStr += "；"
          }
        }
        const updateQuery = {
          name:"修改用户信息",
          content: contStr,
          type:'edit'
        }
        // console.log(keyArr, contStr)
        updateRecord(updateQuery).then((): void=>{ })
      }
      
  }
  const addTag = () => {
    if(formData.tags.includes(tag.value)){
      ElMessage({
         message: "请勿重复添加",
         type: "warning",
      })
    }else{
      if(editFlag.value){
        let index = formData.tags.findIndex((value:string) => {return value == oldTag.value})
        formData.tags[index] = tag.value
        editFlag.value = false
        oldTag.value = ""
        tag.value = ""
      }else{
        formData.tags.push(tag.value)
        tag.value = ""
      }
    }
  }
  const editFlag = ref(false)
  const oldTag = ref("")
  const handleTag = (val: string) => {
    tag.value = val
    oldTag.value = val
    editFlag.value = true
  }
</script>

<style>
.tag-item .el-form-item__content{
    justify-content: space-between;
}
</style>
<style scoped lang="scss">
.title{
    font-weight: 600;
    &::before {
      content: "";
      width: 4px;
      height: 16px;
      background: #3776fd;
      display: inline-flex;
      position: relative;
      top: 2px;
      margin-right: 6px;
    }
}
.box{
  line-height: 30px;
}
.tag-item{
  .el-input{
    width: unset;
  }
}

.tags{
  width: 100%;
}
.el-tag{
  margin-right: 4px;
}
</style>

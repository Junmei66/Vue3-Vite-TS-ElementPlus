<template>
  <div class="flex-box">
    <div class="title">表格</div>
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </div>
  <el-table :data="dataList">
    <el-table-column type="index" label="Index" width="70" fixed />
    <el-table-column prop="time" label="Time" min-width="100" />
    <el-table-column prop="author" label="Author" min-width="100" />
    <el-table-column prop="title" label="Title" min-width="100" show-overflow-tooltip />
    <el-table-column prop="description" label="Description" min-width="100" show-overflow-tooltip />
    <el-table-column label="Edit" width="140" fixed="right">
      <template #default="scope">
        <el-button size="small" type="success" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog center v-model="dialogVisible" :title="dialogTitle">
    <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="Time" prop="time">
        <el-input v-model="formData.time" />
      </el-form-item>
      <el-form-item label="Author" prop="author">
        <el-input v-model="formData.author" />
      </el-form-item>
      <el-form-item label="Title" prop="title">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input type="textarea" :rows="2" v-model="formData.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">提交{{dialogTitle.includes("新增")?"新增":"修改"}}</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { getPosts, postPosts, putPosts, deletePosts } from "@/api/index";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import { postData } from "@/types/request";
import { PostItem } from "@/types/response";

import { getChanged, updateRecord } from "@/utils/index";

  const dialogVisible = ref(false)
  let dialogTitle = ref("新增数据")

  const dataList = ref<PostItem[]>([])
  function getData() {
    getPosts().then((res: any) => {
      if(res.status == 200){
        dataList.value = res.data
      }
    })
  }

  onMounted(()=>{
    getData()
  })

  let prevRow = {} as any

  const ruleFormRef = ref<FormInstance>()
  let selectId = ref<number | undefined>() as any
  let formData = reactive({
    time: "",
    author: "",
    title: "",
    description: "",
  });
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }

  const handleAdd = ()=>{
    resetForm(ruleFormRef.value)
    selectId = ''
    formData.time = ''
    formData.author = ''
    formData.title = ''
    formData.description = ''
    dialogTitle.value = "新增数据"
    dialogVisible.value = true
  }
  
  const rules = reactive<FormRules>({
    time: [{required: true, message: "time can't be empty"}],
    author: [{required: true, message: "author can't be empty"}],
    title: [{required: true, message: "title can't be empty"}],
    description: [{required: true, message: "description can't be empty"}]
  })


  const onSubmit = async (formEl: FormInstance | undefined) => {
    console.log(formEl, 'formEl')
    if(!formEl) return
    let resData = getChanged(prevRow, formData)
    if(resData?.keyArr?.length == 0){
      ElMessage({
        message: "您还没有修改任何数据",
        type: "warning",
      });
      return
    }
    await formEl.validate((valid, fields)=>{
      if(valid){
        if(dialogTitle.value.includes("新增")){
          postPosts(formData).then((res) => {
            if (res.status == 201) {
              ElMessage({
                message: "数据新增成功",
                type: "success",
              });
              dialogVisible.value = false
              getData()
              const updateQuery = {
                name:"新增表格数据",
                content: "新增Title为" + formData.title + "这一条数据",
                type:'add'
              }
              updateRecord(updateQuery).then((): void=>{ })
            }
          })
        }else{
          putPosts(formData, selectId).then((res) => {
            if (res.status == 200) {
              ElMessage({
                message: "数据修改成功",
                type: "success",
              });
              dialogVisible.value = false
              getData()

              updateRecordFun()
            }
          })
        }
        
      }else{
        ElMessage({
          message: "error：" + fields,
          type: "warning",
        });
      }
    })
  }

  const updateRecordFun = () => {
    let keyArr = (getChanged(prevRow, formData)).keyArr
    if(keyArr?.length){
      let contStr = "将"
      for(let k = 0; k < keyArr.length; k++){
        contStr += keyArr[k] + "由" + prevRow[keyArr[k]] + "修改为" + formData[keyArr[k]]
        if(k == keyArr.length){
          contStr += "。"
        }else{
          contStr += "；"
        }
      }
      const updateQuery = {
        name:"修改表格数据",
        content: contStr,
        type:'edit'
      }
      updateRecord(updateQuery).then((): void=>{ })
    }
  }
  
  const handleEdit = (row: postData) => {
    prevRow = JSON.parse(JSON.stringify(row))
    
    dialogTitle.value = "修改数据"
    selectId = prevRow.id
    formData.time = prevRow.time
    formData.author = prevRow.author
    formData.title = prevRow.title
    formData.description = prevRow.description
    dialogVisible.value = true
  }

  
  const handleDelete = (row: postData) => {
    ElMessageBox.confirm(
      '是否确定删除这条记录？',
      'Warning',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(() => {
        deletePosts(row.id).then((res: any)=>{
          console.log(res.status == 200)
          if(res.status == 200){
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            getData()
            const updateQuery = {
              name:"删除表格数据",
              content: "删除Title为" + row.title + "这一条数据",
              type:'delete'
            }
            updateRecord(updateQuery).then((): void=>{ })
          }else{
            ElMessage({
              type: 'info',
              message: '删除失败',
            })
          }
        })
      })
  }
</script>

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
.item{
  line-height: 40px;
}
.flex-box{
  display: flex;
  justify-content: space-between;
}
</style>

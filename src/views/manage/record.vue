<template>
  <div class="title">更新记录</div>
  <el-timeline class="line-box">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :color="activity.color"
      :timestamp="activity.time"
      placement="top"
    >
      <el-card>
        <div class="flex-box">
          <div class="name">{{ activity.name }}</div>
          <div class="org">{{activity.author}}</div>
        </div>
        <div>{{ activity.content }}</div>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script lang="ts" setup>
import { getUpdateRecord } from '@/api'
import { Plus, SemiSelect, Edit, Delete, User } from '@element-plus/icons-vue'

import { markRaw, onMounted, ref } from 'vue'

interface RecordItem {
  id: number
  time: string
  name: string
  content: string
  type: string
  icon?: any
  color: string
}

const mIcon = markRaw(Plus)
const activities = ref<RecordItem[]>()

function getDate() {
  getUpdateRecord().then(res=>{
    if(res.status == 200){
      res.data.map((item: RecordItem)=>{
        if(item.type == 'add'){
          item.icon = markRaw(Plus)
          item.color = "#07d66d"
        }else if(item.type == 'remove'){
          item.icon = markRaw(SemiSelect)
          item.color = "#c6f887"
        } else if(item.type == 'edit'){
          item.icon = markRaw(Edit)
          item.color = "#04f7e5"
        } else if(item.type == 'delete'){
          item.icon = markRaw(Delete)
          item.color = "#f44336"
        }else{
          item.icon = markRaw(User)
          item.color = "#13bbf8"
        }
      })
      activities.value = res.data.reverse()
    }
  })
}
onMounted(()=>{
  getDate()
})
</script>

<style lang="scss" scoped>
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
.line-box{
  margin-top: 20px;
  padding: 10px;
  .flex-box{
    display: flex;
    justify-content: space-between;
  }
  .name{
    font-weight: 600;
    font-size: 15px;
    padding-bottom: 6px;
    &::before {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background: #f77336;
      display: inline-flex;
      position: relative;
      margin-right: 6px;
    }
  }
  .org{
    color: #c434f8;
  }
}
</style>

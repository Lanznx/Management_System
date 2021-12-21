<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="訂單" name="first"><TransactionTable /></el-tab-pane>
    <el-tab-pane label="工作" name="second"><TodoList /></el-tab-pane>
    <el-tab-pane label="倉庫" name="third">Role</el-tab-pane>
  </el-tabs>
</template>

<script>
import TransactionTable from './TransactionTable.vue'
import TodoList from './TodoList'

export default {
    components:{
        TodoList,
        TransactionTable,
    }, 
    data() {
        return {
            activeName: 'first',
        }
    },
    methods: {
        handleClick(tab, event) {
           console.log(tab, event)
        },
    },
}
</script>

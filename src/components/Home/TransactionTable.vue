<template>
  <el-table :data="list" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%;padding-top: 15px;">
    <el-table-column prop="date" sortable label="Date" min-width="150"></el-table-column>
    <el-table-column prop="operation" label="Operation" min-width="150"></el-table-column>
    <el-table-column prop="price" label="Price" width="100" align="center"></el-table-column>
    <el-table-column prop="status" label="Status" width="100" align="center">
        <template #default="scope">
        <el-tag
          :type="scope.row.status === 'success' ? 'success' : 'danger'"
          disable-transitions
          >{{ scope.row.status }}</el-tag
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
//import { transactionList } from '@/api/remote-search'

export default {
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      //transactionList().then(response => {
        //this.list = response.data.items.slice(0, 8)
        this.list = [
            {
                date: "2020-10-03", 
                operation: "Purchase",
                price: "12",
                status: "success"
            }, 
            {
                date: "2020-11-12",
                operation: "Sell",  
                price: "12",
                status: "pending"
            }
        ]
      //})
    }
  }
}
</script>
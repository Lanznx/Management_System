<template>
  <el-table :data="list" :height="tableHeight" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%;padding-top: 15px;">
    <el-table-column prop="date" sortable label="Date" width="150"></el-table-column>
    <el-table-column prop="id" label="Order_ID" align="center"></el-table-column>
    <el-table-column prop="operation" label="Operation" width="150"></el-table-column>
    <el-table-column prop="status" label="Status" width="150" align="center">
        <template #default="scope">
        <el-tag
          :type="scope.row.status === 'Success' ? 'success' : scope.row.status === 'Pending' ? 'warning' : 'danger'"
          disable-transitions
          >{{ scope.row.status }}</el-tag
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, limit } from 'firebase/firestore'

export default {
  props:{
    tableHeight: Number
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData(this.firebase_user.uid)
  },
  methods: {
    async fetchData(uid) {
      this.list = []

      const db = getFirestore()

      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("user", "==", uid), limit(10));

      console.log("getting docs from orders/" + "user" + "==" + uid)
      const querySnapshot = await getDocs(q)
      // intitailize tableData
      await querySnapshot.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`)
          console.log(doc.data().date.toDate().toISOString().substring(0, 10))

          this.list.push({
              id: doc.id,
              user: doc.data().user,
              amount: doc.data().amount,
              date: doc.data().date.toDate().toISOString().substring(0, 10),
              from: doc.data().from,
              operation: doc.data().operation,
              product: doc.data().product,
              status: doc.data().status,
              to: doc.data().to
          })
      });

      console.log(this.list)
    }
  }
}
</script>
<template>
  <el-table :data="list" :height="tableHeight" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%;padding-top: 15px;">
    <el-table-column prop="date" width="100" sortable label="Date"></el-table-column>
    <el-table-column prop="id" label="Order_ID" min-width="180" align="center"></el-table-column>
    <el-table-column prop="operation" label="Operation" width="100"></el-table-column>
    <el-table-column prop="status" label="Status" width="100" align="center">
        <template #default="scope">
        <el-tag
          :type="scope.row.status === 'Success' ? 'success' : 'danger'"
          disable-transitions
          >{{ scope.row.status }}</el-tag
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, orderBy, onSnapshot } from 'firebase/firestore'
import { useRoute } from 'vue-router'

export default {
  props:{
    tableHeight: Number
  },
  computed: {
      routeId: function(){
          return useRoute().params.id
      }
  },
  data() {
    return {
      list: [],
      list1: []
    }
  },
  created() {
    this.fetchData(this.routeId)
  },
  methods: {
    async fetchData(id) {
      const db = getFirestore()

      const ordersRef = collection(db, "orders");
      const q1 = query(ordersRef, where("from", "==", id), where("status", "==", "Success"), orderBy("date", "desc"));
      const q2 = query(ordersRef, where("to", "==", id), where("status", "==", "Success"), orderBy("date", "desc"));

      const querySnapshot1 = await getDocs(q1)
      // intitailize tableData
      await querySnapshot1.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`)
          console.log(doc.data().date.toDate().toISOString().substring(0, 10))

          this.list1.push({
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

      onSnapshot(q2, (snapshot) => {
        this.list = this.list1
        snapshot.forEach((doc) => {
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
      })

      console.log(this.list)
    }
  }
}
</script>
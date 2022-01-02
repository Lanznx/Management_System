<template>
  <el-table :data="list" :height="tableHeight" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%;padding-top: 15px;">
    <el-table-column prop="date" width="100" sortable label="Date"></el-table-column>
    <el-table-column label="Order_ID" min-width="180" align="center">
      <template #default="scope"> 
        <el-popover
            placement="top-start"
            title="詳細資料"
            :width="150"
            trigger="click"
            @show="orderDetail(scope.row.id)"
        >
        <template #reference>
            <el-button type="text"> {{ scope.row.id }} </el-button>
        </template>
        {{ popContent }}
        </el-popover> 
      </template>
    </el-table-column>
    <el-table-column prop="operation" label="行為" width="100"></el-table-column>
    <el-table-column prop="status" label="狀態" width="100" align="center">
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
import { getFirestore, doc, getDoc, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
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
      list1: [],
      list2: [],
      popContent: ''
    }
  },
  created() {
    this.fetchData(this.routeId)
  },
  methods: {
    async orderDetail(id){
      console.log(id)

      const db = getFirestore()
      
      const q = query(doc(db, "orders", id))
      const order = await getDoc(q)

      const pid = order.data().product
      console.log(pid + " " + this.firebase_user.uid)
      const q2 = query(doc(db, "users/" + this.firebase_user.uid + "/products", pid))
      const product = await getDoc(q2)

      console.log(product.data())

      this.popContent = (order.data().operation == "Sell" ? "輸出 " : "輸入 ") + product.data().name + " 共 " + order.data().amount + " 個"
  },
    async fetchData(id) {
      const db = getFirestore()

      const ordersRef = collection(db, "orders");
      const q1 = query(ordersRef, where("from", "==", id), where("status", "==", "Success"), orderBy("date", "desc"));
      const q2 = query(ordersRef, where("to", "==", id), where("status", "==", "Success"), orderBy("date", "desc"));

      onSnapshot(q1, (snapshot) => {
        this.list1 = []
        snapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`)
            console.log(doc.data().date.toDate().toISOString().substring(0, 10))

            this.list1.push({
                id: doc.id,
                user: doc.data().user,
                amount: doc.data().amount,
                date: doc.data().date.toDate().toISOString().substring(0, 10),
                from: doc.data().from,
                operation: (((doc.data().from==this.routeId && doc.data().operation == "Sell") || (doc.data().from!=this.routeId && doc.data().operation == "Purchase")) ? "輸出" : "輸入"), //輸出是我 sell 或是 你 purchase 為主的行為
                product: doc.data().product,
                status: doc.data().status,
                to: doc.data().to
            })
        });

        this.list = this.list1.concat(this.list2)
      })

      onSnapshot(q2, (snapshot) => {
        this.list2 = []
        snapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`)
            console.log(doc.data().date.toDate().toISOString().substring(0, 10))

            this.list2.push({
                id: doc.id,
                user: doc.data().user,
                amount: doc.data().amount,
                date: doc.data().date.toDate().toISOString().substring(0, 10),
                from: doc.data().from,
                operation: (((doc.data().from==this.routeId && doc.data().operation == "Sell") || (doc.data().from!=this.routeId && doc.data().operation == "Purchase")) ? "輸出" : "輸入"), //輸出是我 sell 或是 你 purchase 為主的行為
                product: doc.data().product,
                status: doc.data().status,
                to: doc.data().to
            })
        });

        this.list = this.list1.concat(this.list2)
      })

      console.log(this.list)
    }
  }
}
</script>
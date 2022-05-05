<template>
  <el-table
    :data="warehouseData"
    style="width: 100%"
  >
    <el-table-column property="data.name" label="名稱" width="120" />
    <el-table-column property="data.location" label="位置" />
    <el-table-column fixed="right" label="Operations" width="120">
    <template #default="prop">
        <el-button type="text" size="small" @click="handleDetail(prop.row.id)"
          >Detail</el-button
        >
        <el-button type="text" size="small" :disabled="true">Edit</el-button>
    </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {getFirestore, getDocs, collection, query, where } from 'firebase/firestore'

export default {
  data() {
    return {
      warehouseData: [
      ]
    }
  },

  methods: {
    async buildTable(uid) {
        this.warehouseData = []

        const db = getFirestore()

        const citiesRef = collection(db, "warehouse");
        const q = query(citiesRef, where("owner", "==", uid));

        console.log("getting docs from warehouse/" + "owner" + "==" + uid)
        const querySnapshot = await getDocs(q)
        // intitailize tableData
        await querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`)
            this.warehouseData.push({
              id: doc.id,
              data: doc.data()
            })
        });

        console.log(this.warehouseData)
    },
    handleDetail(id){
        this.$router.push({ path: '/sys/ware-house/' + id })
    }
  },
  created(){
      console.log(this.firebase_user.uid)
      this.buildTable(this.firebase_user.uid)
  }
}
</script>

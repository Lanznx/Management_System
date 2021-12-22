<template>
    <el-breadcrumb separator=">" style="padding: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">asd</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row v-if="inited">
        <span> {{ warehouseData.length }} </span>
        <el-col
        v-for="(warehouse, index) in warehouseData"
        :key="index"
        :span="8"
        >
        <el-card :body-style="{ padding: '0px' }">
            <img
            :src="warehouse.photo"
            class="image"
            />
            <div style="padding: 14px">
            <span> {{ warehouse.name }} </span>
            <div class="bottom">
                <time class="time">{{ warehouse.location }}</time>
                <el-button type="text" class="button">Operating</el-button>
            </div>
            </div>
        </el-card>
        </el-col>
    </el-row>
</template>

<script>
import {getFirestore, getDocs, collection, query, where } from 'firebase/firestore'

export default {
  data() {
    return {
      inited: false,
      warehouseData: [
        // {
        //     location: "116台北市文山區指南路三段40巷6號",
        //     name: "貓空倉庫",
        //     owner: "UnKxh75XreckUTf1ef1FVp0XV963",
        //     photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cargowise.com%2Fzh-hant%2Fsolutions%2Fcargowise-warehouse%2F&psig=AOvVaw0V6QARBXRWreb2AJ5TxDUN&ust=1640270970185000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOjFrtbT9_QCFQAAAAAdAAAAABAD"
        // }
      ]
    }
  },

  methods: {
    async buildCard(uid) {
        this.warehouseData = []

        const db = getFirestore()

        const citiesRef = collection(db, "warehouse");
        const q = query(citiesRef, where("owner", "==", uid));

        console.log("getting docs from warehouse/" + "owner" + "==" + uid)
        const querySnapshot = await getDocs(q)
        // intitailize tableData
        await querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`)
            this.warehouseData.push(doc.data())
        });

        console.log(this.warehouseData)

        this.inited = true
    },
    handleDetail(name){
        console.log("Goto " + name)
    }
  },
  created(){
      console.log(this.firebase_user.uid)
      this.buildCard(this.firebase_user.uid)
  }
}
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
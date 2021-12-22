<template>
    <el-row :gutter="20">
        <el-col
        v-for="(warehouse, index) in warehouseData"
        :key="index"
        :span="8"
        >
        <el-card :body-style="{ padding: '0px' }">
            <img
            :src="warehouse.data.photo"
            class="image"
            />
            <div style="padding: 14px">
            <span> {{ warehouse.data.name }} </span>
            <div class="bottom">
                <time class="time">{{ warehouse.data.location }}</time>
                <el-button type="text" class="button" @click="handleDetail(warehouse.id)">詳細資料</el-button>
            </div>
            </div>
        </el-card>
        </el-col>
        <el-col
        :span="8"
        >
        <el-card :body-style="{ padding: '0px', height: '100%' }" shadow="hover" style="height: 100%;">
           <el-button style="height: 100%; width: 100%"><el-icon><plus /></el-icon></el-button>
        </el-card>
        </el-col>
    </el-row>
</template>

<script>
import {
  Plus,
} from '@element-plus/icons'
import {getFirestore, getDocs, collection, query, where } from 'firebase/firestore'

export default {
    components: {
        Plus
    },
    data() {
        return {
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
                this.warehouseData.push({
                    id: doc.id,
                    data: doc.data()
                })
            });

            console.log(this.warehouseData)
        },
        handleDetail(ID){
            console.log("Goto " + ID)

            this.$router.push({ path: '/sys/ware-house/' + ID })
        }
    },
    created(){
        console.log(this.firebase_user.uid)
        this.buildCard(this.firebase_user.uid)
    }
}
</script>

<style scoped>
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

.el-icon{
    height: 5em;
    width: 5em;
}

.el-icon svg{
    height: 100%;
    width: 100%;
}
</style>
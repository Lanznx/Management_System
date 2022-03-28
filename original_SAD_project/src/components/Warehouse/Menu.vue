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
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
           <el-button style="height: 306px; width: 100%" @click="dialogOfAddVisible = true"><el-icon style="height: 5em; width: 5em"><plus /></el-icon></el-button>
        </el-card>
        </el-col>
    </el-row>
      <!-- 新增產品彈出視窗 -->
    <el-dialog
        v-model="dialogOfAddVisible"
        title="新增倉庫"
        width="50%"
    >
        <el-form>
        <el-form-item label="位置">
            <el-input v-model="newWarehouse.location"></el-input>
        </el-form-item>
        <el-form-item label="名稱">
            <el-input v-model="newWarehouse.name"></el-input>
        </el-form-item>
        <el-form-item label="圖片">
            <el-input v-model="newWarehouse.photo">
                <template #append>
                    <el-button type="success"><el-icon><upload /></el-icon></el-button>
                </template>
            </el-input>
        </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogOfAddVisible = false">取消</el-button>
            <el-button type="primary" @click="addWarehouse(user); dialogOfAddVisible = false"
            >確認</el-button
            >
        </span>
        </template>
    </el-dialog>

</template>

<script>
import {
  Plus,
  Upload
} from '@element-plus/icons'
import {getFirestore, getDocs, addDoc, collection, query, where } from 'firebase/firestore'

export default {
    components: {
        Plus,
        Upload
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
            ],
            newWarehouse: {
                location: '',
                name: '',
                owner: '',
                photo: ''
            },
            dialogOfAddVisible: false
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
        },
        async addWarehouse(user) {
            const db = getFirestore()

            this.newWarehouse.owner = user.uid
            console.log("add warehouse: " + this.newWarehouse)

            const docRef = await addDoc(collection(db, "warehouse"), this.newWarehouse);
            console.log("Document written with ID: ", docRef.id);
            
            this.buildCard(user.uid)
        },
    },
    created(){
        console.log(this.user.uid)
        this.buildCard(this.user.uid)
    },
    computed: {
        user: function(){
        return this.firebase_user
        }
    },
}
</script>

<style scoped>
.el-card {
    margin-top: 10px
}

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
.el-icon svg{
    height: 100%;
    width: 100%;
}
</style>
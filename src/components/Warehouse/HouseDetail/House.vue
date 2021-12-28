<template>
    <el-row :gutter="20">
        <el-col :span="14">
            <el-table :data="warehouseData" style="width: 100%">
                <el-table-column type="expand">
                    <template #default="props">
                        <InventoryDetail :inv_id="props.row.serial_num"/>
                    </template>
                </el-table-column>
                <el-table-column label="Serial_Num" width="175" prop="serial_num" />
                <el-table-column label="名稱" prop="name" />
                <el-table-column label="數量" width="105" prop="amount" />
                <el-table-column label="價值" width="105" prop="value" />
            </el-table>
        </el-col>
        <el-col :span="10">
            <el-divider content-position="left">待審核</el-divider>
            <el-row>
            <PendingOrder :tableHeight="350" />
            </el-row>
            <el-divider content-position="left">紀錄</el-divider>
            <el-row>
            <HistoryOrder :tableHeight="350" />
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import InventoryDetail from './StockDetail.vue'
//import TransactionTable from '../../Home/TransactionTable.vue'
import PendingOrder from './PendingOrder.vue'
import HistoryOrder from './HistoryOrder.vue'
import { useRoute } from 'vue-router' 
import { 
getFirestore,
//addDoc,
//doc,
//deleteDoc,
collection,
getDocs } from 'firebase/firestore'

export default {
    components: {
        InventoryDetail, 
        PendingOrder,
        HistoryOrder,
        //TransactionTable
    },
    computed:{
        routeId: function(){
            return useRoute().params.id
        },
        user: function(){
            return this.firebase_user
        }
    },
    methods: {
        async createWarehouseTable(ware_id){
            this.warehouseData = []

            const db = getFirestore()

            console.log("getting docs from warehouse/" + ware_id + "/inventory")
            const querySnapshot = await getDocs(collection(db, "warehouse/" + ware_id + "/inventory"))
            // intitailize tableData
            await querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${doc.data()}`)
                this.warehouseData.push(
                    doc.data()
                )
            });
        }
    },
    data(){
        return {
            warehouseData: [],
        }
    },
    created(){
        this.createWarehouseTable(this.routeId)
    },

}
</script>

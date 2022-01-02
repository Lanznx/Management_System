<template>
    <el-row :gutter="20">
        <el-col :span="12">
        <CreateNewOrder :routeId="routeId"/>
        <el-divider content-position="left">倉儲</el-divider>
            <el-table :data="warehouseData" style="width: 100%">
                <el-table-column type="expand">
                    <template #default="props">
                        <InventoryDetail :inv_id="props.row.serial_num"/>
                    </template>
                </el-table-column>
                <el-table-column label="Serial_Num" width="205" prop="serial_num" />
                <el-table-column label="名稱" prop="name" />
                <el-table-column label="數量" width="155" prop="amount" />
                <!--<el-table-column label="價值" width="105" prop="value" />-->
            </el-table>
        </el-col>
        <el-col :span="12">
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
import CreateNewOrder from './CreateNewOrder.vue'
import PendingOrder from './PendingOrder.vue'
import HistoryOrder from './HistoryOrder.vue'
import { useRoute } from 'vue-router' 
import { 
getFirestore,
//addDoc,
//doc,
//deleteDoc,
collection,
//getDocs,
query,
limit,
onSnapshot} from 'firebase/firestore'

export default {
    components: {
        InventoryDetail, 
        CreateNewOrder,
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
            const db = getFirestore()

            console.log("getting docs from warehouse/" + ware_id + "/inventory")
            const q = query(collection(db, "warehouse/" + ware_id + "/inventory"), limit(10))
            
            onSnapshot(q, (snapshot)=>{
                this.warehouseData = []
                snapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data()}`)
                    this.warehouseData.push(
                        doc.data()
                    )
                });
            })
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

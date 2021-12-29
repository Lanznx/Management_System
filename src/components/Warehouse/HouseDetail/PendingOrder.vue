<template>
    <el-alert v-if="op_success" title="success alert" type="success" center show-icon> </el-alert>
  <el-table :data="list" :height="tableHeight" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%;">
    <el-table-column fixed prop="date" width="150" sortable label="Date"></el-table-column>
    <el-table-column prop="id" label="Order_ID" align="center"></el-table-column>
    <el-table-column prop="operation" label="Operation" width="100"></el-table-column>
    <el-table-column label="Approve" fixed="right" width="150" align="center">
        <template #default="scope">
            <el-popconfirm 
            title="Are you sure to approve this?"
            @confirm="handleApprove(scope.row)"
            >
                <template #reference>
                    <el-button type="success" circle><el-icon><Check /></el-icon></el-button>
                </template>
            </el-popconfirm>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getFirestore, collection, query, where, 
getDocs, 
doc, 
//getDoc, 
onSnapshot,
setDoc,
//limit,
orderBy 
} from 'firebase/firestore'
import {
  Check
} from '@element-plus/icons'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'

export default {
    components: {
        Check
    },
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
            list: null,
            op_success: false
        }
    },
    created() {
        this.fetchData(this.routeId)
    },
    methods: {
        async fetchData(id) {
            console.log(id)

            const db = getFirestore()

            const ordersRef = collection(db, "orders");
            const q = query(ordersRef, where("to", "==", id), where("status", "==", "Pending"), orderBy("date", "desc"));

            console.log("getting docs from orders/" + "to" + "==" + id)
            onSnapshot(q, (snapshot) => {
                this.list = []
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
                console.log(this.list)
            })

        },
        handleApprove(row){
            console.log(row)
            
            this.approve(row)

            ElMessage({
                message: '同意 ' + row.id,
                type: 'success',
            })
        },
        async approve(order){
            const id = order.id

            // 設定減少者跟增加者
            let purchaser, seller
            if(order.operation == "Sell"){
                seller = order.from
                purchaser = order.to
            }else if(order.operation == "Purchase"){
                purchaser = order.from
                seller = order.to
            }else{
                console.log("invaild operation")
                return ;
            }

            const product = order.product
            console.log(purchaser + " buy " + product + " from " + seller)

            const db = getFirestore()
            // seller 東西減少
            let getDocRef = collection(db, "warehouse/" + seller + "/inventory");
            const sellerQuery = query(getDocRef, where("serial_num", "==", product))
            let docSnap = await getDocs(sellerQuery);
            console.log(docSnap)

            let newSelledProduct, newSelledProductId
            docSnap.forEach((doc)=>{
                newSelledProduct = doc.data()
                newSelledProductId = doc.id
            })
            newSelledProduct.amount -= order.amount

            console.log(newSelledProduct)
            
            await setDoc(doc(db, "warehouse/" + seller + "/inventory", newSelledProductId), newSelledProduct);
            console.log("seller -");

            // buyer 東西增加
            getDocRef = collection(db, "warehouse/" + purchaser + "/inventory");
            const purchaserQuery = query(getDocRef, where("serial_num", "==", product))
            docSnap = await getDocs(purchaserQuery);
            console.log(docSnap)

            let newPurchasedProduct, newPurchasedProductId
            docSnap.forEach((doc)=>{
                newPurchasedProduct = doc.data()
                newPurchasedProductId = doc.id
            })

            if(newPurchasedProduct == null){
                newPurchasedProductId = newSelledProductId
                newPurchasedProduct = newSelledProduct
                newPurchasedProduct.amount = order.amount
            }else 
                newPurchasedProduct.amount += order.amount

            console.log(newPurchasedProduct)
            
            await setDoc(doc(db, "warehouse/" + purchaser + "/inventory", newPurchasedProductId), newPurchasedProduct);
            console.log("purchaser +");


            // 將狀態改為 Success
            const orderRef = doc(db, 'orders', id);
            await setDoc(orderRef, { status: "Success" }, { merge: true });
            console.log("set doc success")
        }
    }
}
</script>
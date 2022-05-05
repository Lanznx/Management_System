<template>
    <el-alert v-if="op_success" title="success alert" type="success" center show-icon> </el-alert>
  <el-table :data="list" :height="tableHeight" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%;">
    <el-table-column fixed prop="date" width="150" sortable label="Date"></el-table-column>
    <el-table-column  label="Order_ID" align="center">
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
    <el-table-column label="批准" fixed="right" width="150" align="center">
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
getDoc, 
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
        },
    },
    data() {
        return {
            list: null,
            op_success: false,
            popContent: ""
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


            let pname
            const pid = order.data().product
            console.log(pid + " " + this.firebase_user.uid)
            const q2 = query(doc(db, "users/" + this.firebase_user.uid + "/products", pid))
            const product = await getDoc(q2)

            if( product.data() == null ){
                const q2 = query(collection(db, "warehouse/" + order.data().from + "/inventory"), where("serial_num", "==", pid))
                const product = await getDocs(q2)
                product.forEach((docu) => { pname = docu.data().name })
            }else{
                pname = product.data().name
            }

            this.popContent = (order.data().operation == "Sell" ? "輸入 " : "輸出 ") + pname + " 共 " + order.data().amount + " 個"
        },
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
                        operation: (doc.data().operation == "Sell" ? "輸入" : "輸出"), // 同意方反過來
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
        },
        async approve(order){
            const id = order.id

            console.log(order)

            // 設定減少者跟增加者
            let purchaser, seller
            if(order.operation == "輸出"){
                seller = this.routeId
                purchaser = order.to == this.routeId ? order.from : order.to
            }else if(order.operation == "輸入"){
                purchaser = this.routeId
                seller = order.to == this.routeId ? order.from : order.to
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

            let newSelledProduct, newSelledProductId
            docSnap.forEach((docu)=>{
                newSelledProduct = docu.data()
                newSelledProductId = docu.id
            })

            console.log(newSelledProductId)
            if(newSelledProduct == null){
                ElMessage({
                    message: '失敗 請檢查兩邊貨物是否正確',
                    type: 'error',
                })
                return
            }

            newSelledProduct.amount -= order.amount
            
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

            console.log(newPurchasedProductId)
            console.log(newPurchasedProduct)
            
            await setDoc(doc(db, "warehouse/" + purchaser + "/inventory", newPurchasedProductId), newPurchasedProduct);
            console.log("purchaser +");


            // 將狀態改為 Success
            const orderRef = doc(db, 'orders', id);
            await setDoc(orderRef, { status: "Success" }, { merge: true });
            console.log("set doc success")



            ElMessage({
                message: '同意',
                type: 'success',
            })
        }
    }
}
</script>
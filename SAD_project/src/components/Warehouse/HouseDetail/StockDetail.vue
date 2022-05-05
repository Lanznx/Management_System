<template>
    <div style="padding-left: 30px;padding-right: 20px;">
        <el-descriptions :column="5">
            <el-descriptions-item label="ID:"> {{ data.id }} </el-descriptions-item>
            <el-descriptions-item label="名稱:"> {{ data.name }} </el-descriptions-item>
            <el-descriptions-item label="價格:"> $ {{ data.price }} </el-descriptions-item>
            <el-descriptions-item label="分類:">
            <el-tag size="small">{{ data.category }}</el-tag>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export default{
    props: {
        inv_id: String
    },
    data(){
        return {
            data: {}
        }
    },
    methods: {
        async getStockDetail(){
            console.log("get product: " + this.inv_id + " data")

            const db = getFirestore()
            const docRef = doc(db, "users/" + this.firebase_user.uid + "/products/" + this.inv_id);
            const docSnap = await getDoc(docRef);

            this.data = docSnap.data()
            console.log(this.data)
        }
    },
    created(){
        this.getStockDetail()
    }
}
</script>

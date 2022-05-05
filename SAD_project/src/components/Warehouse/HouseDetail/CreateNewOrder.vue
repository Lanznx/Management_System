<template>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="日期"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col :span="5">
          <el-select v-model="form.to" placeholder="倉庫" style="width: 100%">
            <el-option
              v-for="item in providerOptions"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="form.product" placeholder="產品" style="width: 100%">
            <el-option
              v-for="item in productOptions"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-input v-model="form.amount"/>
        </el-col>
        <el-col :span="5">
          <el-radio-group v-model="form.operation">
            <el-radio label="Purchase">輸入</el-radio>
            <el-radio label="Sell">輸出</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="createOrder" :disabled="!(isCompleted)" v-loading.fullscreen.lock="loading">送出</el-button>
        </el-col>
      </el-row>
</template>

<script>
import { ElMessage } from 'element-plus'
import { Timestamp, getFirestore, doc, addDoc, query, collection, getDocs, orderBy, increment, where, updateDoc } from 'firebase/firestore'

export default {
  props: {
    routeId: String
  },
  created(){
    console.log(this.routeId)
    this.initProductOption()
  },
  data() {
    return {
      providerOptions: [
        {name: "無", id: ''}, {name: "貓空倉庫", id: "yVnMkHm9iwykmRqw7mGV"}, {name: "貓貓倉庫", id: "iLTPfRW5UPXCwwn9DzKp"},
      ],
      productOptions:[
        
      ],
      form: {
        date: null,
        user: this.firebase_user.auth.currentUser.uid,
        product: '',
        amount: 0,
        operation: '',
        from: this.routeId,
        to: '',
        status: 'Pending',
        description: '',
      },
      isCompleted: false,
      loading: false,
    }
  },
  methods: {
    async createOrder() {
      setTimeout(() => {
        this.loading=false
        ElMessage({
          message: '成功新增！',
          type: 'success',
        })
      }, 1000)

      const db = getFirestore()

      this.loading = true

      // 轉成 timesatamp
      this.form.date = Timestamp.fromDate(this.form.date)
      this.form.date.seconds += 50000 
      console.log(this.form.date)
      console.log(this.form)

      // 如果沒有 to 了話直接 success
      if(this.form.to == ""){
        this.form.status = "Success"
        await this.noTargetOrder()
      }

      const docRef = await addDoc(collection(db, "orders"), this.form);
      console.log("Order written with ID: ", docRef.id);

      console.log(this.form)
      this.form.date = null
      this.form.user = this.firebase_user.auth.currentUser.uid
      this.form.status = "Pending"
      this.form.product = ''
      this.form.amount = 0
      this.form.operation = ''
      this.form.from = this.routeId
      this.form.to = '' 
    },
    async noTargetOrder(){
      const db = getFirestore()
      const docRef = collection(db, "warehouse/" + this.routeId + "/inventory")
      const q = query(docRef,  where("serial_num", "==", this.form.product))

      let addToAmount
      if(this.form.operation == "Sell"){
        addToAmount = this.form.amount * -1
      }else if(this.form.operation == "Purchase"){
        addToAmount = this.form.amount * 1
      }

      const querySnapshot = await getDocs(q)
      var isUpdate = false
      querySnapshot.forEach((inv) => {
        console.log("update")
        isUpdate = true

        updateDoc(doc(db, "warehouse/" + this.routeId + "/inventory", inv.id), {
          amount: increment(addToAmount)
        })
      })

      if(!isUpdate){
        console.log("add new thing")
        if(addToAmount < 0){
          addToAmount = 0
        }

        await addDoc(collection(db, "warehouse/" + this.routeId + "/inventory"), {
          serial_num: this.form.product, 
          name: this.productOptions.find(o => o.id == this.form.product).name,
          amount: addToAmount
        })
      }

    },
    async initProductOption(){
      const db = getFirestore()

      console.log("getting docs from users/" + this.firebase_user.uid + "/products")
      const q = query(collection(db, "users/" + this.firebase_user.uid + "/products"), orderBy("id"))
      const querySnapshot = await getDocs(q)

      // intitailize tableData
      await querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`)
        this.productOptions.push({
          id: doc.id,
          name: doc.data().name
        })
      });
    }
  },
  watch: {
    'form.date': function(){
      if(this.form.date==null || this.form.product=='' || !(this.form.amount > 0) || this.form.operation==''){
        this.isCompleted = false
      }else{
        this.isCompleted = true
      }
    },
    'form.product': function(){
      if(this.form.date==null || this.form.product=='' || !(this.form.amount > 0) || this.form.operation==''){
        this.isCompleted = false
      }else{
        this.isCompleted = true
      }
    },
    'form.operation': function(){
      if(this.form.date==null || this.form.product=='' || !(this.form.amount > 0) || this.form.operation==''){
        this.isCompleted = false
      }else{
        this.isCompleted = true
      }
    },
    'form.to': function(){
      if(this.form.date==null || this.form.product=='' || !(this.form.amount > 0) || this.form.operation==''){
        this.isCompleted = false
      }else{
        this.isCompleted = true
      }
    },
    'form.amount': function(){
      this.form.amount = parseInt(this.form.amount)
      if(this.form.date==null || this.form.product=='' || !(this.form.amount > 0) || this.form.operation==''){
        this.isCompleted = false
        if (!Number.isInteger(this.form.amount)){
          console.log("change " + this.form.amount + " to 0 ")
          this.form.amount = 0
        }
      }else{
        this.isCompleted = true
      }
    },
  }
}
</script>

<template>
  <!--編輯產品按鈕 Container -->
  <el-container style="padding: 10px">
    <el-button type="primary" @click="dialogOfAddVisible = true"><el-icon><plus /></el-icon></el-button>
    <el-button type="danger"  @click="deleteProduct(user)"><el-icon><Delete /></el-icon></el-button>
  </el-container>
  <!--產品 Table -->
  <el-table 
    :data="tableData" 
    :default-sort="{ prop: 'data.id', order: 'ascending' }"
    @selection-change="handleSelectionChange"
    style="width: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column label="ID" prop="data.id" />
    <el-table-column label="Name" prop="data.name" />
    <el-table-column label="Price" prop="data.price" />
    <el-table-column label="Category" prop="data.category" />
  </el-table>
  <el-button-group style="padding: 10px">
    <el-button>
      <el-icon class="el-icon--left"><ArrowLeft /></el-icon>上一頁
    </el-button>
    <el-button>
      下一頁<el-icon class="el-icon--right"><ArrowRight /></el-icon>
    </el-button>
  </el-button-group>

  <!-- 新增產品彈出視窗 -->
  <el-dialog
    v-model="dialogOfAddVisible"
    title="新增產品"
    width="50%"
  >
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="newProduct.id" placeholder="ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="newProduct.name" placeholder="Name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="newProduct.price" placeholder="Price"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="newProduct.category" placeholder="Category"></el-input>
      </el-form-item>
      <el-form-item>
        <!--<el-button type="primary" @click="onSubmit">新增</el-button>-->
      </el-form-item>
      <el-divider > or </el-divider>
      <el-form-item>
        <el-button type="success"><el-icon><upload /></el-icon> 上傳 JSON</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogOfAddVisible = false">取消</el-button>
        <el-button type="primary" @click="addProduct(user); dialogOfAddVisible = false"
          >確認</el-button
        >
      </span>
    </template>
  </el-dialog>

</template>

<script>
import {
  Plus,
  Delete,
  ArrowLeft,
  ArrowRight,
  Upload
} from '@element-plus/icons'
import { getFirestore, addDoc, doc, deleteDoc, collection, getDocs } from 'firebase/firestore'

export default {
  components:{
    Plus,
    Delete,
    ArrowLeft,
    ArrowRight,
    Upload
  },
  data() {
    return {
      tableData: [],
      dialogOfAddVisible: false, 
      multipleSelection: [], 
      newProduct: {
        id: '', 
        name: '',
        price: '',
        category: ''
      }, 
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    async buildTable(user) {
      this.tableData = []

      const db = getFirestore()

      console.log("getting docs from users/" + user.uid + "/products")
      const querySnapshot = await getDocs(collection(db, "users/" + user.uid + "/products"))
      // intitailize tableData
      await querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`)
        this.tableData.push({
          id: doc.id,
          data: doc.data()
        })
      });
    },
    async addProduct(user) {
      const db = getFirestore()

      console.log("add product: " + user.uid)
      const docRef = await addDoc(collection(db, "users/" + user.uid + "/products"), this.newProduct);
      console.log("Document written with ID: ", docRef.id);
      
      this.buildTable(this.user)
    },
    async deleteProduct(user){
      const db = getFirestore()

      var targets = this.multipleSelection
      for(var i=0; i<targets.length; i++){
        var targetId = targets[i].id
        console.log("delete: " + targetId)

        await deleteDoc(doc(db, "users/" + user.uid + "/products", targetId))
      }

      this.buildTable(this.user)
    }
  },
  created(){
    this.buildTable(this.user)
  },
  computed: {
    user: function(){
      return this.firebase_user
    }
  },
  
}
</script>
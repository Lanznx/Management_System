<template>
  <el-card style="margin-bottom:20px; min-width: 300px">
    <template #header>
        <div class="card-header">
        <span>用戶資訊</span>
        </div>
    </template>

    <div v-for="(info, index) in UserInfo" :key="index" class="text item">
        <div class="user-bio-section user-bio-section-header">{{index}}</div>
        <div class="user-bio-section">{{info}}</div>
    </div>
  </el-card>
</template>

<script>
import { getFirestore, getDoc, doc } from 'firebase/firestore'
export default {
    data(){
        return {
            UserInfo:{
                Name: "", 
                Company: "", 
                Position: "",
                Mail: ""
            }
        }
    },
    methods:{
      async buildUserInfo(user) {
        const db = getFirestore()

        const userInformation = await getDoc(doc(db, "users", user.uid))

        this.UserInfo.Name = userInformation.data().name
        this.UserInfo.Company = userInformation.data().company
        this.UserInfo.Position = userInformation.data().position
        this.UserInfo.Mail = userInformation.data().email
      },
    },
    created(){
      this.buildUserInfo(this.firebase_user)
    }
}
</script>


<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-bio-section-header {
    border-bottom: 1px solid #dfe6ec;
    padding-bottom: 10px;
    margin-bottom: 10px;
    font-weight: bold;
}

.user-bio-section {
    font-size: 14px;
    color: #606266;
    text-align: left;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
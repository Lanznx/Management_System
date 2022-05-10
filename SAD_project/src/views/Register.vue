<template>
  <div class="login">
    <el-card>
      <h2>註冊使用者</h2>
      <el-form
        class="login-form"
        ref="form"
      >
        <el-form-item>
          <el-input v-model="name" placeholder="名稱">
            <template #prepend>
              <el-icon><Avatar /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="company" placeholder="公司">
            <template #prepend>
              <el-icon><House /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="email" placeholder="信箱">
            <template #prepend>
              <el-icon><Message /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" placeholder="密碼" type="password">
            <template #prepend>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="checkpassword" placeholder="確認密碼" type="password">
            <template #prepend>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-button"
            type="primary"
            @click="register"
          >註冊</el-button>
        </el-form-item>
        <el-button type="text" class="forgot-password"><router-link to="/sign-in">回登入頁面</router-link></el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  Avatar,
  Lock,
  House,
  Message
} from '@element-plus/icons'
export default {
  components: {
    Avatar,
    Lock,
    House,
    Message
  }
}
</script>
<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore,
  setDoc,
  doc 
} from 'firebase/firestore'
import { useRouter } from 'vue-router'

const name = ref(''), company = ref(''), email = ref(''), password = ref(''), checkpassword = ref('')
const router = useRouter() // get a reference to our vue router
const auth = getAuth()
const db = getFirestore()

const register = () => {
  if(password.value == checkpassword.value){
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid
        console.log(uid)
        await setDoc(doc(db, "users", uid), {
          email: email.value,
          name: name.value,
          company: company.value,
          position: "Owner"
        })
        
        router.push('/sys/home')
        console.log('Successfully registered!')
      })
      .catch((error) => {
        console.log(error.code)
        alert(error);
      });
  }else{
    alert('checkpassword wrong')
  }
}
</script>

<style scoped>

.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #102a43;
  
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 25vw;
  max-width: 400px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
<style lang="scss">
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 33vw;
  max-width: 450px;
  display: flex;
  justify-content: center;
}
</style>
<template>
  <div class="login">
    <el-card>
      <h2>登入系統</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
      >
        <el-form-item>
          <el-input v-model="model.email" placeholder="信箱">
            <template #prepend>
              <el-icon><Message /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="model.password" placeholder="密碼" type="password">
            <template #prepend>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <p v-if="errMsg">{{ errMsg }}</p>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            @click="login"
          >登入</el-button>
        </el-form-item>
        <el-button type="text" class="forgot-password"><router-link to="/register">註冊</router-link></el-button>
      </el-form>
    </el-card>
  </div>
</template>


<script>
import {
  Message,
  Lock
} from '@element-plus/icons'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//import { useRouter } from 'vue-router' // import router

export default {
  components: {
    Message, Lock
  },
  name: "login",
  data() {
    return {
      model: {
        email: "",
        password: ""
      },
      errMsg: '',
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Email is required",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Email length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    simulateLogin() {
      return new Promise(resolve => {
        setTimeout(resolve, 800);
      });
    },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLogin();
      this.loading = false;

      const auth = getAuth()
      //const router = useRouter()
      console.log(this.model.email + " " + this.model.password)
      signInWithEmailAndPassword(auth, this.model.email, this.model.password) // THIS LINE CHANGED
        .then(() => {
            console.log('Successfully logged in!')
            console.log(auth)
            this.$router.push('/sys/home')
        })
        .catch(error => {
            switch (error.code) {
                case 'auth/invalid-email':
                    this.errMsg = 'Invalid email'
                    break
                case 'auth/user-not-found':
                    this.errMsg = 'No account with that email was found'
                    break
                case 'auth/wrong-password':
                    this.errMsg = 'Incorrect password'
                    break
                default:
                    this.errMsg = 'Email or password was incorrect'
                    break
            }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
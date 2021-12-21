<template>
  <el-row justify="space-between">
    <el-col :span="21">
    </el-col>
    <el-col :span="3">
      <el-button round @click="logOut" size="small" style="margin: 4px">LogOut</el-button>
    </el-col>
  </el-row>
</template>

<script>
//import { ref, watch } from 'vue'
//import { useRoute } from 'vue-router'
import { getAuth, signOut } from "firebase/auth"
export default {
    setup(){

      const logOut = () => {
        signOut(getAuth()).then(() => {
          console.log("Logout success")
        }).catch((error) => {
            console.log(error)
        });
      }

      return {
        //route_name, 
        logOut
      }
    },
}
</script>

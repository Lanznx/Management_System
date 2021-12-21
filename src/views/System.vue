<template>
  <el-container>
    <AsideBar />
    <el-container>
      <el-header>
        <Navbar />
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import AsideBar from '../components/AsideBar.vue'

//check logged in 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { 
  //userRoute, 
  useRouter 
} from 'vue-router'
import { onBeforeUnmount } from 'vue'

export default {
  components: {
    Navbar,
    AsideBar
  },
  setup(){
    const router = useRouter();
    const auth = getAuth();
    
    const authListener = onAuthStateChanged(auth, (u) => {
        if (!u) { // not logged in
            alert('you must be logged in to view this. redirecting to the home page')
            router.push('/sign-in')
        }
    })
    
    onBeforeUnmount(() => {
      // clear up listener
      authListener()
    })
  },
  created(){
    //this.route_arr.push(userRoute().name)
  }
}

</script>

<style scoped>
  .el-header {
    background-color: white;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    height: 5vh;
  }
</style>
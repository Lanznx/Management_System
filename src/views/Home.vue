<template>
  <el-container>
    <el-aside width="200px">
      <AsideBar />
    </el-aside>
    <el-container>
      <el-header>
        <Navbar />
      </el-header>
      <el-main>
        <Carousel />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Carousel from '../components/Carousel.vue'
import AsideBar from '../components/AsideBar.vue'

export default {
  // 2. 在 vue 宣告使用
  components: {
    Navbar,
    Carousel,
    AsideBar
  },
}

// @ is an alias to /src

</script>

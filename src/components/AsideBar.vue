<template>
    <el-menu
    :collapse="isCollapse"
    active-text-color="rgb(64, 158, 255)"
    background-color="rgb(48, 65, 86)"
    class="el-menu-vertical-demo"
    :default-active="currentPath"
    text-color="rgb(191, 203, 217)"
    @select="handleSelect"
    style="max-width: 250px; height: 100vh; --el-menu-hover-background-color:rgb(58, 75, 96);"
    >
        <!--
        <el-button @click="isCollapse = !(isCollapse)">
            <el-icon><expand /></el-icon>
        </el-button>-->
        <el-menu-item index="home">
            <el-icon><home-filled /></el-icon>
            <span>主頁</span>
        </el-menu-item>
        <el-menu-item index="product">
            <el-icon><Menu /></el-icon>
            <span>產品</span>
        </el-menu-item>
        <el-menu-item index="ware-house/menu">
            <el-icon><house /></el-icon>
            <span>倉庫管理</span>
        </el-menu-item>
        <el-menu-item index="data-anaylsis">
            <el-icon><data-analysis /></el-icon>
            <span>資料分析</span>
        </el-menu-item>
        <el-menu-item index="customer">
            <el-icon><avatar /></el-icon>
            <span>客戶管理</span>
        </el-menu-item>
        <el-menu-item index="setting">
            <el-icon><setting /></el-icon>
            <span>設定</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
import { ref } from 'vue'
import { //Expand, 
         HomeFilled, Menu, House, DataAnalysis, Avatar, Setting } from '@element-plus/icons'
import router from '../router'
import {useRoute} from 'vue-router'
 
export default {
    components: {
        //Expand, 
        HomeFilled, Menu, House, DataAnalysis, Avatar, Setting
    },
    setup() {
        const route=useRoute();
        const currentPath = ref(route.path.slice(5))
        console.log("aside current path: " + currentPath.value)

        const isCollapse = ref(false)
        
        const handleSelect = (key, keyPath) => {
            console.log(key, keyPath)
            router.push( { path: "/sys/" + keyPath } )
        }

        return {
            currentPath,
            isCollapse,
            handleSelect
        }
    },
}

</script>


<style scoped>
.el-menu-item{
    width: 200px
}
</style>
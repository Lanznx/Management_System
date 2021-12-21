<template>
    <el-menu
    active-text-color="rgb(64, 158, 255)"
    background-color="rgb(48, 65, 86)"
    class="el-menu-vertical-demo"
    default-active="1"
    text-color="rgb(191, 203, 217)"
    @open="handleOpen"
    @close="handleClose"
    style="--el-menu-hover-background-color:rgb(58, 75, 96);"
    >
    <el-menu-item index="1">
        <el-icon><home-filled /></el-icon>
        <span>Navigator One</span>
    </el-menu-item>
    <el-menu-item index="2">
        <el-icon><Menu /></el-icon>
        <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
        <el-icon><Document /></el-icon>
        <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="4">
        <el-icon><Setting /></el-icon>
        <span>Navigator Four</span>
    </el-menu-item>
    </el-menu>
</template>

<script>
import { HomeFilled, Menu, Document, Setting } from '@element-plus/icons'
 
export default {
    components: {
        HomeFilled, Menu, Document, Setting
    }
}
</script>


<style scoped>
</style>
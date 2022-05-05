
<template>
    <el-breadcrumb separator="/" style="padding: 10px">
        <el-breadcrumb-item :to="{ path: '/sys/ware-house' }">倉庫管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="routePath != '/sys/ware-house/menu'"> 倉庫 ID: {{ routeId }}</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view />
</template>

<script>
//import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useRoute } from 'vue-router'
export default{
    data(){
        return {
        }
    },
    created(){
        console.log(this.routePath)
    },
    computed:{
        routePath: function(){
            return useRoute().path
        },
        routeId: function(){
            return useRoute().params.id
        },
    },
    methods: {
    }
}
</script>

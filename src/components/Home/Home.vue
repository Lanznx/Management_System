<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <UserInfo />
        </el-col>
        <el-col :span="16">
            <el-card>
                <Navtab />
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import Navtab from './Navtab.vue'
import UserInfo from './UserInfo.vue'

export default {
    components: {
        Navtab,
        UserInfo
    }
}
</script>


<style scoped>
.el-row {
  margin-left: 30px !important;
  margin-right: 30px !important;
  margin-bottom: 30px !important;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}
</style>
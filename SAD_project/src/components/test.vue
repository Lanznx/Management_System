<template>
  <el-button
    type="primary"
    @click="openFullScreen1"
    v-loading.fullscreen.lock="fullscreenLoading">
    指令方式
  </el-button>
  <el-button
    type="primary"
    @click="openFullScreen2">
    服务方式
  </el-button>
</template>

<script>
  export default {
    data() {
      return {
        fullscreenLoading: false
      }
    },
    methods: {
      openFullScreen1() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
      },
      openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      },
      notuser(){
        //   const pid = order.data().product
        //     console.log(pid)
        //     const q2 = query(collection(db, "warehouse/" + order.data().from + "/inventory"), where("serial_num", "==", pid))
        //     const product = await getDocs(q2)
        //     let pname
        //     product.forEach((docu) => { pname = docu.data().name })
        //     this.popContent = (order.data().operation == "Sell" ? "輸出 " : "輸入 ") + pname + " 共 " + order.data().amount + " 個"
      }
    }
  }
</script>
<template>
  <div class="header_contain">
    <div class="header_left">
      <img src="../../../assets/img/logo.jpg" alt class="img" />
      <div class="name">KOOBOO</div>
    </div>
    <div class="header_right">
      <i class="el-icon-chat-line-round" @click="btnchat"></i>
      <i class="el-icon-circle-close" @click="goout"></i>
      <!-- <el-button @click="goout" type="primary">退出</el-button> -->
      <el-avatar icon="el-icon-user-solid"></el-avatar>

      <!-- <span class="username">
        欢迎光临，wuwei
      <i class="el-icon-caret-bottom" @click="btn"></i>-->
      <el-dropdown>
        <span class="el-dropdown-link">
          欢迎你，吴伟
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
          <el-dropdown-item>返回</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- </span> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  methods: {
    goout() {
      window.localStorage.removeItem("oa-token");
      this.$router.replace("/login");
      this.$message({
          message: '退出成功',
          type: 'warning'
        });
    },
    btn() {
      console.log(2222);
    },
    btnchat(){
        console.log("你点击了图标！");
    }
  }
};
</script>
<style  scoped>
.header_contain {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header_left {
  display: flex;
  align-items: center;
  height: 54px;
}
.header_left .img {
  width: 50px;
  height: 50px;
}
.header_left .name {
  padding-left: 16px;
  font-size: 24px;
  color: #fff;
  font-family: "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
    sans-serif;
}
.header_right {
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.header_right i {
  padding-right: 10px;
  font-size: 20px;
}
.header_right .username {
  /* text-decoration: underline; */
}

.el-avatar {
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  margin-right: 5px;
}
</style>

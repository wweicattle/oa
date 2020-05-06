<template>
  <div class="header_contain">
    <div class="header_left">
      <img src="../../../assets/img/logo.jpg" alt class="img" />
      <div class="name">KOOBOO</div>
    </div>
    <div class="header_right">
      <!-- <i class="el-icon-circle-close" @click="goout"></i> -->
      <el-badge is-dot class="item">
        <i class="el-icon-chat-line-round" @click="btnchat"></i>
      </el-badge>
      <el-avatar icon="el-icon-user-solid"></el-avatar>
      <el-dropdown>
        <span class="el-dropdown-link">
          欢迎你，{{username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="goout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="goouticon">
        <i class="el-icon-s-unfold" @click="goout"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      username: window.localStorage.getItem("username")
    };
  },
  methods: {
    goout() {
      //  清除分类的索引（公告，技术）清除上次点击分类的历史记录
      window.localStorage.removeItem("params");
      // 清除token与用户名
      window.localStorage.removeItem("oa_token");
      window.localStorage.removeItem("username");
      this.$router.replace("/login");
      this.$message({
        message: "退出成功",
        type: "warning"
      });
    },
    btn() {
      console.log(2222);
    },
    btnchat() {
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
.el-badge {
  margin-right: 10px;
  font-size: 20px;
}

.el-avatar {
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  margin-right: 5px;
}
.header_right .goouticon {
  margin-left: 10px;
}
</style>

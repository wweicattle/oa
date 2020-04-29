<template>
  <el-aside :width="isCollapse?'64px':'200px'">
    <div class="toggle" @click="handleToggle">| | |</div>
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      default-active="1-1"
      router
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    //   是否收起菜单栏
    handleToggle() {
      this.isCollapse = !this.isCollapse;
    },

    handleOpen() {},
    handleClose() {}
  }
};
</script>
<style  scoped>
.el-menu{
    border: 0;

}
.el-aside {
  background-color: #333744;
}
.toggle {
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  background: #4a5064;
}
</style>
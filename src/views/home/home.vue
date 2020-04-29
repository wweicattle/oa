<template>
  <!-- 布局区域 -->
  <el-container class="home_contain">
    <!-- 区域头部 -->
    <el-header>
      <home-header></home-header>
    </el-header>
    <!--主要区域-->
    <el-container>
      <!-- 侧边栏区域 -->
        <home-aside />
      <el-main>
        <home-main></home-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import HomeHeader from "./childComponent/Header";
import HomeAside from "./childComponent/Aside";
import HomeMain from "./childComponent/Main";

export default {
  name: "App",
  data() {
    return {
      isCollapse: false
    };
  },
  components: {
    HomeHeader,
    HomeAside,
    HomeMain
  },
  methods: {
   
  }
};

</script>
<style  scoped>
.home_contain {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-main {
  background-color: #eaedf1;
}
</style>
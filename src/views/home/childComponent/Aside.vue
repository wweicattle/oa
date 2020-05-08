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
      default-active="/forum"
      router
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- 第1个功能-日程-->
      <el-submenu index="1" class="icon">
        <template slot="title">
          <i class="icon" :class="leftFunctionicon[0]"></i>
          <span class="name">{{leftFunctionname[0]}}</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
      <!-- 第2个功能-预约 -->
      <el-submenu index="2" class="icon">
        <template slot="title">
          <i class="icon" :class="leftFunctionicon[1]"></i>
          <span class="name">{{leftFunctionname[1]}}</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>

      <!-- 第3个功能-资料-->
      <el-submenu index="3" class="icon">
        <template slot="title">
          <i class="icon" :class="leftFunctionicon[2]"></i>
          <span class="name">{{leftFunctionname[2]}}</span>
        </template>
        <el-menu-item index="/data">
          <div class="subcategory">
            <span>分类详情</span> 
          </div>
        </el-menu-item>
        <!-- <el-submenu index="222" v-for="(val,index) in categorys" :key="index">
          <el-menu-item  v-if="val.chilren">{{val.displayText}}</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <!-- 第4个功能 -论坛-->
      <el-submenu index="4" class="icon">
        <template slot="title">
          <i class="icon" :class="leftFunctionicon[3]"></i>
          <span class="name">{{leftFunctionname[3]}}</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
      <!-- 第5个功能-点餐-->
      <el-submenu index="5" class="icon">
        <template slot="title">
          <i class="icon" :class="leftFunctionicon[4]"></i>
          <span class="name">{{leftFunctionname[4]}}</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
import {lineToTree} from "./../../../common/lineToTree";
export default {
  name: "Aside",
  data() {
    return {
      categorys: [],
      indexa: ["a", "b", "c"],
      isCollapse: false,
      leftFunctionname: ["日程", "预约", "资料", "论坛", "点餐"],
      leftFunctionicon: [
        "el-icon-date",
        "el-icon-menu",
        "el-icon-folder-opened",
        "el-icon-star-off",
        "el-icon-dish"
      ]
    };
  },
  methods: {
    //   是否收起菜单栏
    handleToggle() {
      this.isCollapse = !this.isCollapse;
    },
    async getList() {
      let { data } = await this.axios.get("/api/getCategory/get");
      var f = data.model.categorys;
      let categorys = lineToTree(f);
      this.categorys = categorys;
    },
    handleOpen() {},
    handleClose() {}
  },
  created() {
    this.getList();
  }
};
</script>
<style  scoped>
.el-menu {
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
.el-menu {
  font-family: "Courier New", Courier, monospace;
}
.el-submenu .icon {
  font-size: 19px;
}
.el-submenu .name {
  padding-left: 10px;
  font-size: 19px;
}
.el-menu-item .subcategory{
  /* padding-left: 50px; */
}
</style>
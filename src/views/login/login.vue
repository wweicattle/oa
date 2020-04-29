<template>
  <div class="contain">
    <div class="login_contain">
      <div class="loginLogoContain">
        <div class="loginLogo">
          <img src="../../assets/img/logo.jpg" alt class="img" />
        </div>
      </div>
      <div class="login-title">用户登录</div>
      <el-form :model="loginForm" :rules="loginrules" ref="ruleLoginRef" class="loginForm">
        <el-form-item prop="username">
          <el-input
            class="input"
            v-model="loginForm.username"
            placeholder="请填写用户名"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="input"
            v-model="loginForm.password"
            type="password"
            placeholder="请填写密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="el_btn">
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button type="info" @click="resetBtn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from "./../../network/index";
export default {
  name: "App",
  data() {
    return {
      // 登录数据绑定
      loginForm: {
        username: "",
        password: ""
      },
      // 用户框规则
      loginrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetBtn() {
      this.$refs.ruleLoginRef.resetFields();
    },
    handleLogin() {
      this.$refs.ruleLoginRef.validate(bool => {
        if (!bool) return;
        this.axios.post("/api/user/login", this.loginForm).then(res => {
          if (res.data.success) {
            // 将token进行保存
            window.localStorage.setItem("oa_token", res.data.token);
            // 将过期时间保存
            window.localStorage.setItem("oa_date", res.data.data);
            this.$message({
              message: "登录成功！",
              type: "success"
            });
            // 登录成功进行跳转
            this.$router.replace("/home");
          } else {
            this.$message.error("用户名或密码错误！");
          }
        });
      });
    }
  }
};
</script>
<style scoped>
.contain {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/back.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}
.login-title {
  margin: 20px 0 30px 0;
  text-align: center;
  font-size: 20px;
}

@media screen and (max-width: 1200px) {
  .login_contain {
    width: 75%;
  }
}

@media screen and (min-width: 1200px) {
  .login_contain {
    width: 35%;
  }
}

.login_contain {
  padding: 0 30px;
  box-sizing: border-box;
  background: #fff;
  opacity: 0.8;
  /* width: 40%; */
  height: 300px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}
.loginLogoContain {
  display: flex;
  justify-content: center;
  margin-top: -50px;
}
.loginLogoContain .loginLogo {
  box-shadow: 0px 0px 10px #ddd;
  width: 100px;
  height: 100px;
  background: #eee;
  border: 10px solid #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 100px;
}
.loginLogoContain .loginLogo .img {
  padding-top: 5px;
  width: 80%;
}
.login_contain .el_btn {
  display: flex;
  justify-content: flex-end;
}
</style>
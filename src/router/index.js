import Vue from 'vue'
import VueRouter from 'vue-router'
const login = () => import("./../views/login/login");
const home = () => import("./../views/home/home");



Vue.use(VueRouter)
const routes = [
  {
    path: "",
    redirect: "/login"
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/home",
    component: home,
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// // 该判断进行对用户的验证进行，在一个路由跳转到另一个路由前进行触发！
router.beforeEach((to, from, next) => {
  if (to.path == "/login") return next();
  // 获取token值与用户的状态时间
  let istoken = window.localStorage.getItem("oa-token");
  let date=window.localStorage.getItem("date");
  if (!istoken||Date.now()>=date) return next("/login");
  next();
})
export default router

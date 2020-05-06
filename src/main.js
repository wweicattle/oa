import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 进行全局安装富文本组件
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
window.addEventListener("beforeunload", function (event) {
  window.localStorage.removeItem("params");
});
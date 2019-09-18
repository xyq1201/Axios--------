import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入Http
import Http from './service/http'

Vue.config.productionTip = false

// 将Http挂载到vue的实例上,实现全局调用
Vue.prototype.$Http = Http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

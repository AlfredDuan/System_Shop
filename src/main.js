import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'

import axios from 'axios'

// $用于所有实例都可以用的变量名，直接调用$http，即可调用axios
Vue.prototype.$http = axios


axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'

axios.interceptors.request.use(config=>{
  // 保存在token里面的
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

axios.interceptors.request.use(config=>{
  console.log('config+++++++++++')
  console.log(config)
  return config
})
// axios.interceptors.request.use(config => {
//   console.log(config)
//   config.hearders.Authorization = window.sessionStorage.getItem('token')
//   return config
// })

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

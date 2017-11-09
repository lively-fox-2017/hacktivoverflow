// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import swal from 'sweetalert2'
import store from './vuex/store'
import axios from 'axios'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'sweetalert2/dist/sweetalert2.min.js'

Vue.config.productionTip = false
Vue.prototype.$swal = swal
Vue.prototype.$http = axios.create({
  // baseURL: 'https://hacktivoverflow-api.lokilokostudio.tk/api',
  baseURL: 'http://hacktivoverflow-api.ianwinanto.cf/api',
  headers: {
    'token': localStorage.getItem('token')
  }
})

Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'purple',
  accent: 'lime',
  warn: 'red',
  background: 'white'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  swal,
  store,
  template: '<App/>',
  components: { App }
})

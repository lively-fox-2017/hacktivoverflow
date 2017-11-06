// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './vuex/store'

import axios from 'axios'
import SweetAlert from 'sweetalert'

import lodash from 'lodash'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.prototype.$_ = _

Vue.prototype.$swal = swal

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

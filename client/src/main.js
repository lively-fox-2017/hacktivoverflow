// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// buat import store
import store from './vuex/store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // masukan store yang sudah diimport diatas
  store,
  router,
  template: '<App/>',
  components: { App }
})

// lalu buat folder vuex, dengan isi file store.js

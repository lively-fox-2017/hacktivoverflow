import Vue from 'vue'
import Router from 'vue-router'
import HacktivOverflowMain from '@/components/HacktivOverflowMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: HacktivOverflowMain
    }
  ]
})

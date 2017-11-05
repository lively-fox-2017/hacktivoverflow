import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import detailQuestion from '@/components/detailQuestion'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:id',
      name: 'detailQuestion',
      component: detailQuestion,
      props: true
    }
  ]
})

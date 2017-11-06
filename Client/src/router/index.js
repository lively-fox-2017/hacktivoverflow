import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import detailQuestion from '@/components/detailQuestion'
import myQuestion from '@/components/myQuestion'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detailQuestion/:id',
      name: 'detailQuestion',
      component: detailQuestion,
      props: true
    },
    {
      path: '/myQuestion',
      name: 'myQuestion',
      component: myQuestion,
      beforeEnter: (to, from, next) => {
        // console.log(from)
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
})

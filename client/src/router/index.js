import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
// import Login from '@/components/Login'
import Signup from '@/components/Signup'
// import QuestionAdd from '@/components/QuestionAdd'
import Answer from '@/components/Answer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '/answers/:id',
      component: Answer,
      props: true
    }
  ]
})

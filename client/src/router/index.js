import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Questions from '@/components/Questions'
import PostQuestion from '@/components/PostQuestion'
import QuestionContent from '@/components/QuestionContent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('access_token'))
          next('/')
        else
          next()
      },
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('access_token'))
          next('/')
        else
          next()
      },
      component: Login
    },
    {
      path: '/questions',
      component: Questions
    },
    {
      path: '/post-question',
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('access_token'))
          next()
        else
          next('/')
      },
      component: PostQuestion
    },
    {
      path: '/questions/:slug',
      name: 'QuestionContent',
      component: QuestionContent,
      props: true
    }
  ]
})

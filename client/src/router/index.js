import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Questions from '@/components/Questions'
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
      path: '/questions',
      component: Questions
    },
    {
      path: '/questions/:slug',
      name: 'QuestionContent',
      component: QuestionContent,
      props: true
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Question from '@/components/Question'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/question/:id',
      name: 'Question',
      component: Question,
      props: true
    }
  ]
})

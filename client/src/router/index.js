import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Question from '@/components/Question'
import Allquestion from '@/components/Allquestion'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      // component: Allquestion,
      children: [
        {
          path: '',
          component: Allquestion
        },
        {
          path: ':id',
          component: Question
          // props: true
        }
      ]
    }
  ]
})

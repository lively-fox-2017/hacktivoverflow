import Vue from 'vue'
import Router from 'vue-router'
import HacktivOverflowMain from '@/components/HacktivOverflowMain'
import QuestionDetail from '@/components/QuestionDetail'
import QuestionList from '@/components/QuestionList'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HacktivOverflowMain,
      children: [{
        path: '/questions/:question_id',
        name: 'QuestionDetail',
        props: true,
        component: QuestionDetail
      }, {
        path: '',
        name: 'Main',
        component: QuestionList
      }, {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      }]
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Page from '@/components/Page'
import ContentPage from '@/components/ContentPage'
import ContentDetail from '@/components/ContentDetail'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/',
      name: 'Forms',
      component: Page,
      children: [
        {
          path: '',
          component: ContentPage
        },
        {
          path: ':id',
          component: ContentDetail,
          props: true
        }
      ]
    }
  ]
})

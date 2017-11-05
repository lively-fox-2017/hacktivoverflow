import Vue from 'vue';
import Router from 'vue-router';
import auth from '@/components/auth';
import index from '@/components/index';
import postQuestion from '@/components/post-question';
import recentQuestions from '@/components/recent-questions';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/auth',
      name: 'auth',
      component: auth,
    },
    {
      path: '/post-question',
      name: 'post-question',
      component: postQuestion,
    },
    {
      path: '/recent-questions',
      name: 'recent-questions',
      component: recentQuestions,
    },
  ],
});

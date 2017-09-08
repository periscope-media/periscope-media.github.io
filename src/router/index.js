import Vue from 'vue'
import Router from 'vue-router'
import SomeResources from '@/components/SomeResources'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/some-resources',
      name: 'SomeResources',
      component: SomeResources
    },
    {
      path: '/',
      redirect: '/some-resources'
    }
  ]
})

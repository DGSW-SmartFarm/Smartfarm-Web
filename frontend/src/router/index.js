import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Show from 'components/ShowPage'
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'show',
      component: Show
    },
    {
      path: '/:id',
      name: 'show',
      component: Show
    }
  ]
})

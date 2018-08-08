import Vue from 'vue'
import Router from 'vue-router'

// Importing Vue-components
import List from '@/components/List'
import Room from '@/components/Room'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: "List",
      component: List
    },
    {
      path: '/room/:id',
      name: 'Room',
      component: Room
    }
  ]
})

/*
 - route example

 {
   path: '/',
   name: 'HelloWorld',
   component: HelloWorld
 }

*/

import Vue from 'vue'
import Router from 'vue-router'

// Importing Vue-components
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: "Home",
      component: Home
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

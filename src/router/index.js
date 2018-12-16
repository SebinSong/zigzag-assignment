import Vue from 'vue'
import Router from 'vue-router'

// Importing Vue-components
import List from '@/components/List'
import Room from '@/components/Room'

Vue.use(Router)

export let router = new Router({
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
});

router.beforeEach((to, from, next) => {

  if(to.matched.length === 0) next(false);
  else next();

});

/*
 - route example

 {
   path: '/',
   name: 'HelloWorld',
   component: HelloWorld
 }

*/

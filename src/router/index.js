import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
                ishome: true
            }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
  ,
  {
    path: '/products',
    name: 'Products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Products_list.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/orders',
    name: 'Orders',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Orders_list.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/order/:url',
    name: 'Order',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Order.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/logout',
    name: 'Logout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Logout.vue'),
    beforeEnter: checkAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.ishome) && IsAuthenticated()) {
      if (IsAuthenticated()) next('/products');
      else next("/");
    }else{
      next();
    }

  })
function checkAuth(to, from, next) 
{   
   
    if (IsAuthenticated()) next();
    else next("/");
  
}

function IsAuthenticated(){
  if(localStorage.getItem("user_id")){
   return true;
  }else{
    return false;
  }
}

export default router

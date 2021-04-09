import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      redirect: '/home'
   },
   {
      path: '/explain',
      name: 'About',
      component: () => import('../views/Pages/Explain.vue')
   },
   {
      path: '/home',
      name: 'home',
      component: Home
   },
   {
      path: '/login',
      name: 'login',
      component: () => import('../views/Features/Login.vue')
   },
   {
      path: '/sign-up',
      name: 'signup',
      component: () => import('../views/Features/SignUp.vue')
   },
   {
      path: '/not-found',
      name: 'notfound',
      component: () => import('../views/Features/NotFound.vue')
   },
   {
      path: '/product-grid',
      name: 'productgrid',
      component: () => import('../views/Shop/ProductGrid.vue')
   },
   {
      path: '/product-detail',
      name: 'productdetail',
      component: () => import('../views/Shop/ProductDetail.vue')
   },
   {
      path: '/product-add',
      name: 'productadd',
      component: () => import('../views/Shop/ProductAdd.vue')
   },
   {
      path: '/my-wishlist',
      name: 'WishList',
      component: () => import('../views/Shop/WishList.vue')
   },
   {
      path: '/my-page',
      name: 'Mypage',
      component: () => import('../views/Features/Mypage.vue')
   },
   {
      path: '/my-chat',
      name: 'Mychat',
      component: () => import('../views/Features/Mychat.vue')
   },
   {
      path: '/manage-user',
      name: 'ManagerUser',
      component: () => import('../views/Admin/ManageUser.vue')
   },
   {
      path: '/cart',
      name: 'Cart',
      component: () => import('../views/Features/Cart.vue')
   },
   {
      path: '/my-sell',
      name: 'Sell Page',
      component: () => import('../views/Features/mySell.vue')
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router

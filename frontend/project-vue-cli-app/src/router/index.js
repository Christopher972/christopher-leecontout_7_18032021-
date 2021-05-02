import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/Signup.vue'


Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },

  {
    path: '/posts',
    name: 'posts',
    component: () => import('../views/Posts.vue')
  },

  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },

  {
    path: '/createPost',
    name: 'createPost',
    component: () => import('../views/CreatePost.vue')
  },

  {
    path: '/post/:id',
    name: 'post',
    component: () => import('../views/Post.vue')
  },

  {
    path: '/modifyPost/:id',
    name: 'modifyPost',
    component: () => import('../views/ModifyPost.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
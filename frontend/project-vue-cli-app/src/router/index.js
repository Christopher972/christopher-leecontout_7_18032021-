import Vue from 'vue';
import VueRouter from 'vue-router';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Posts from '../views/Posts.vue';
import Profile from '../views/Profile.vue';
import CreatePost from '../views/CreatePost.vue';
import Post from '../views/Post.vue';
import ModifyPost from '../views/ModifyPost.vue';

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  
  {
    path: '/',
    name: 'signup',
    component: Signup
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts
  },

  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },

  {
    path: '/createPost',
    name: 'createPost',
    component: CreatePost
  },

  {
    path: '/post/:id',
    name: 'post',
    component: Post
  },

  {
    path: '/modifyPost/:id',
    name: 'modifyPost',
    component: ModifyPost
  },
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
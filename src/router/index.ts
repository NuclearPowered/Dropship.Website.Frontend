import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import LoginSignup from '@/views/LoginSignup.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginSignup,
    props: route => ({ redirectURL: route.query.redirectURL })
  },
  {
    path: '/signup',
    name: 'Signup',
    component: LoginSignup,
    props: route => ({ redirectURL: route.query.redirectURL })
  },
  {
    path: '/mods/page/:id',
    name: 'Mods',
    component: () => import(/* webpackChunkName: "modsview" */ '../views/Mods.vue')
  },
  {
    path: '/mod/:id',
    name: 'ModPage',
    component: () => import(/* webpackChunkName: "modsview" */ '../views/ModPage.vue')
  },
  {
    path: '/mods',
    redirect: '/mods/page/1'
  },
  {
    path: '/plugins/page/:id',
    name: 'Plugins',
    component: () => import(/* webpackChunkName: "pluginsview" */ '../views/Plugins.vue')
  },
  {
    path: '/plugin/:id',
    name: 'PluginPage',
    component: () => import(/* webpackChunkName: "pluginsview" */ '../views/PluginPage.vue')
  },
  {
    path: '/plugins',
    redirect: '/plugins/page/1'
  },
  {
    path: '/servers/page/:id',
    name: 'Servers',
    component: () => import(/* webpackChunkName: "serversview" */ '../views/Servers.vue')
  },
  {
    path: '/server/:id',
    name: 'ServerPage',
    component: () => import(/* webpackChunkName: "modsview" */ '../views/ServerPage.vue')
  },
  {
    path: '/servers',
    redirect: '/servers/page/1'
  },
  {
    path: '/me',
    name: 'UserHome',
    component: () => import(/* webpackChunkName: "userhome" */ '../views/UserHome.vue')
  },
  {
    path: '/me/settings',
    name: 'UserSettings',
    component: () => import(/* webpackChunkName: "userhome" */ '../views/UserSettings.vue')
  },
  {
    path: '/me/editmod/:id',
    name: 'EditMod',
    component: () => import(/* webpackChunkName: "userhome" */ '../views/EditMod.vue')
  },
  {
    path: '/me/editplugin/:id',
    name: 'EditPlugin',
    component: () => import(/* webpackChunkName: "userhome" */ '../views/EditPlugin.vue')
  },
  {
    path: '/me/editserver/:id',
    name: 'EditServer',
    component: () => import(/* webpackChunkName: "userhome" */ '../views/EditServer.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.loggedIn) {
    if (to.path === '/me') {
      next({ path: '/login', query: { redirectURL: to.path } })
    } else {
      next()
    }
  }
  next()
})

export default router

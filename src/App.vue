<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-md navbar-dark" :class="{ ['bg-dark']: $route.path !== '/' }">
        <router-link class="navbar-brand d-flex flex-row align-items-center" to="/">
          <img src="@/assets/logo.png" class="px-3" height="40">
          <span>reactor.gg</span>
        </router-link>

        <button class="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#mainNavbarCollapsable">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="mainNavbarCollapsable">
          <ul class="navbar-nav align-items-center">
            <li class="nav-item p-2">
              <router-link class="btn btn-outline-primary rounded-pill" to="/mods">
                <i class="fas fa-wrench" aria-hidden="true"></i> Mods
              </router-link>
            </li>
            <li class="nav-item p-2">
              <router-link class="btn btn-outline-warning rounded-pill" to="/plugins">
                <i class="fas fa-plug" aria-hidden="true"></i> Plugins
              </router-link>
            </li>
            <li class="nav-item p-2">
              <router-link class="btn btn-outline-info rounded-pill" to="/servers">
                <i class="fas fa-globe" aria-hidden="true"></i> Servers
              </router-link>
            </li>
            <li class="nav-item p-2">
              <a class="btn btn-outline-danger rounded-pill" href="https://docs.reactor.gg">
                <i class="fas fa-book" aria-hidden="true"></i> Docs
              </a>
            </li>
            <li class="nav-item p-2">
              <router-link class="btn btn-outline-success rounde`d-pill" to="/me">
                <i class="fas fa-user" aria-hidden="true"></i> Account
              </router-link>
            </li>
            <li class="nav-item p-2" v-if="$store.state.loggedIn">
              <a class="btn btn-outline-primary" @click="signOut()">
                <i class="fas fa-sign-out" aria-hidden="true"></i> Sign Out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <router-view />
  </div>
</template>
<script lang="ts">

import { Vue } from 'vue-property-decorator'
import AuthService from '@/services/authService'

export default class App extends Vue {
  signOut () {
    AuthService.logout()
    this.$router.push('/')
  }
}
</script>
<style lang="stylus">
#app
  font-family Ubuntu, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
.vh-except-header
  height calc(100vh - 70px)
.min-vh-except-header
  min-height calc(100vh - 70px)
.bg-nicedark
  background-color #262c33

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  position absolute
  opacity: 0;
}

.slide-right-enter-active, .slide-right-leave-active
  transition all .3s ease
.slide-right-enter
  transform translateX(100vw)
.slide-right-leave-to
  position absolute
  width 100%
  transform translateX(-100vw)

.slide-left-enter-active, .slide-left-leave-active
  transition all .3s ease
.slide-left-enter
  transform translateX(-100vw)
.slide-left-leave-to
  position absolute
  width 100%
  transform translateX(100vw)
</style>

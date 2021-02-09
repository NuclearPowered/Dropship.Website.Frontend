<template>
  <section class="text-light">
    <div class="row">
      <div class="col-xxl-4 col-sm-6 col-12 pt-3">
        <div class="card bg-dark p-3 h-100">
          <h1 class="card-title fw-bold">Welcome to Dropship Online!</h1>
          <div class="card-body d-flex flex-column justify-content-between">
            <div style="min-height: 145px">
              <h4>Your place</h4>
              <transition name="wordcycle">
                <h3 :key="wordIndex">{{ wordCycle[wordIndex] }}</h3>
              </transition>
            </div>
            <div class="text-center">
              <h6>Download the launcher here</h6>
              <a class="btn btn-primary"
                 :href="dropshipDownloadUrl"
                 :disabled="dropshipDownloadUrl === ''">Download latest Dropship</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xxl-4 d-none d-xxl-block pt-3">
        <div class="card bg-dark p-3 h-100" style="min-height: 225px">
          <h1 class="card-title fw-bold">Featured Mods</h1>
          <div class="list-group" v-if="featuredMods.length > 0">
            <VLargeModItem v-for="(mod, i) in featuredMods" :key="i" :mod="mod" />
          </div>
          <div v-else>
            <SkeletonCard class="my-2"/>
            <SkeletonCard class="my-2"/>
          </div>
        </div>
      </div>
      <div class="col-xxl-4 col-sm-6 col-12 pt-3">
        <div class="card bg-dark p-3" v-if="!$store.state.loggedIn">
          <h5 class="card-title text-center">Sign In</h5>
          <LoginForm @login="loginAttempt($event)"/>
          <router-link to="/signup" class="text-center pt-3">Sign up instead</router-link>
          <transition name="fade">
              <div class="alert alert-danger mt-3" role="alert" v-if="errorText !== ''">
                Error in username/password combination.
              </div>
          </transition>
        </div>
        <div class="card bg-dark p-3" v-else>
          <h4>Signed in as <strong>{{ $store.state.username }}</strong>!</h4>
          <small>Not you? <a href="#" @click="logout()">Click here to log out.</a></small>
          <hr>
          <h5>Get started by downloading client mods or server plugins, or upload your own!</h5>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AuthService from '@/services/authService'
import LoginForm from '@/components/LoginSignup/LoginForm.vue'
import VLargeModItem from '@/components/Home/VLargeModItem.vue'
import { ModResponse } from '@/services/responses/modResponse'
import ModService from '@/services/modService'
import consts from '@/consts'
import SkeletonCard from '@/components/SkeletonCard.vue'

@Component({
  components: { SkeletonCard, VLargeModItem, LoginForm }
})
export default class HomeHeader extends Vue {
  dropshipDownloadUrl = consts.DROPSHIP_DL_URL;
  featuredMods: ModResponse[] = [];

  wordCycle = ['to install mods', 'to download plugins', 'to find servers']
  wordIndex = 0;
  interval!: number;

  async mounted () {
    this.interval = setInterval(() => {
      if (this.wordIndex >= this.wordCycle.length - 1) {
        this.wordIndex = -1
      }
      this.wordIndex++
    }, 1300)

    const response = await ModService.getModListPaginated(1)
    if (response) {
      this.featuredMods = response.slice(0, 1)
    }
  }

  beforeDestroy () {
    clearInterval(this.interval)
  }

  async loginAttempt (event: { username: string; password: string }) {
    const response = await AuthService.login(event.username, event.password)
    if (!response) {
      this.badLogin()
    }
  }

  errorText = ''
  badLogin () {
    this.errorText = 'Error logging in'
    setTimeout(() => {
      this.errorText = ''
    }, 1000)
  }

  logout () {
    AuthService.logout()
  }
}
</script>
<style scoped lang="stylus">
.wordcycle-enter-active, .wordcycle-leave-active
  transition all .3s ease-in-out
.wordcycle-enter
  opacity 0
.wordcycle-leave-to
  position absolute
  transform translateY(30px)
  opacity 0
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

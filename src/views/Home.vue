<template>
  <div class="position-relative">
    <SpaceBackground class="space-background"/>
    <div class="container text-start">
      <HomeHeader />
      <div style="height: 50px"></div>
      <section>
        <div class="row justify-content-center text-center text-white">
          <div class="col-xl col-sm-6 py-3">
            <router-link to="/mods" tag="div" class="router-link mod-hover">
              <div class="card bg-dark pt-4">
                <i class="large-icon fas fa-wrench"></i>
                <div class="card-body">
                  <h5>Mods</h5>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-xl col-sm-6 py-3">
            <router-link to="/plugins" tag="div" class="router-link plugin-hover">
              <div class="card bg-dark pt-4">
                <i class="large-icon fas fa-plug"></i>
                <div class="card-body">
                  <h5>Plugins</h5>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-xl col-sm-6 py-3">
            <router-link to="/servers" tag="div" class="router-link server-hover">
              <div class="card bg-dark pt-4">
                <i class="large-icon fas fa-globe"></i>
                <div class="card-body">
                  <h5>Servers</h5>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-xl col-sm-6 py-3">
            <a href="https://docs.reactor.gg" class="router-link developer-hover">
              <div class="card bg-dark pt-4">
                <i class="large-icon fas fa-hammer"></i>
                <div class="card-body">
                  <h5>Developers</h5>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SpaceBackground from '@/components/Home/SpaceBackground.vue'
import HomeHeader from '@/components/Home/HomeHeader.vue'

@Component({
  components: { SpaceBackground, HomeHeader }
})
export default class Home extends Vue {
}
</script>
<style scoped lang="stylus">

.space-background
  position absolute
  top -70px
  width 100vw
  min-height 100vh
  height calc(100% + 70px)
  z-index -1
.large-icon
  font-size 50px
.router-link
  transition color 0.1s ease-in-out
  text-decoration none
  color white
  &:visited
    color white
  &:hover
    cursor pointer
    font-weight bold
.mod-hover:hover
  color #0d6efd
.plugin-hover:hover
  color #ff8f07
.server-hover:hover
  color #0dcaf0
.developer-hover:hover
  color #dc3545
</style>

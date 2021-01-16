<template>
  <div class="container-fluid bg-nicedark min-vh-except-header text-white">
    <div class="container bg-dark">
  </div>
    <section class="p-3">
      <h3 class="text-center">Browse Mods</h3>
    </section>
    <div class="row justify-content-around">
      <main class="col-md-8">
        <section class="row p-3">
          <div class="col-9">
            <input class="form-control form-control-lg" type="text" placeholder="Search..."
                   v-model="searchText" @input="searchEvent()">
          </div>
          <div class="col-3 d-flex flex-row justify-content-around align-items-center">
            <router-link :to="`/mods/page/${this.pageNum > 1 ? this.pageNum - 1 : 1}`">
              <i class="fs-4 fas fa-arrow-circle-left"></i>
            </router-link>
            <strong><span class="d-none d-sm-inline">Page:</span> {{ this.pageNum }}</strong>
            <router-link :to="`/mods/page/${this.pageNum + 1}`">
              <i class="fs-4 fas fa-arrow-circle-right"></i>
            </router-link>
          </div>
        </section>
        <ul class="list-group" v-if="searchText.length > 0">
          <VModItem v-for="(server, i) in searchData" :key="i" :server="server" :edit="false" />
        </ul>
        <ul class="list-group" v-else-if="modData.length > 0">
          <VModItem v-for="(server, i) in modData" :key="i" :server="server" :edit="false" />
        </ul>
        <div v-else>
          <SkeletonCard class="my-2"/>
          <SkeletonCard class="my-2"/>
        </div>
      </main>
      <aside class="col-md-3 d-none d-md-block">
        <div class="card bg-dark py-3">
          <h3 class="card-title fw-bold text-center">How to</h3>
          <div class="card-body">
            <ul style="margin-left: -10px">
              <li>You can browse mods by using the page navigation buttons.</li>
              <li>Search for mods using the search bar.</li>
            </ul>
          </div>
          <hr>
          <h3 class="card-title fw-bold text-center">Uploading Mods</h3>
          <div class="card-body">
            <ul style="margin-left: -10px">
              <li>First, you need to have an account.
                <router-link to="/login">Click here to login</router-link> or
                <router-link to="/signup"> signup.</router-link></li>
              <li>Then, go to your profile, or click the button below, to be taken to the mod uploading page.</li>
            </ul>
            <router-link to="/me/editmod/new" class="btn btn-primary">
              Upload a Mod <i class="fas fa-upload"></i>
            </router-link>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import ModService from '@/services/modService'
import { ModResponse } from '@/services/responses/modResponse'
import VModItem from '@/components/VModItem.vue'
import { Route } from 'vue-router'
import SkeletonCard from '@/components/SkeletonCard.vue'

@Component({
  components: { SkeletonCard, VModItem }
})
export default class Mods extends Vue {
  get pageNum () {
    return parseInt(this.$route.params.id)
  }

  modData: ModResponse[] = []

  refresh (pageNum: number) {
    ModService.getModListPaginated(pageNum).then(response => {
      if (response) { this.modData = response }
    })
  }

  mounted () { this.refresh(this.pageNum) }

  beforeRouteUpdate (to: Route, from: Route, next: () => void) {
    next()
    this.searchText = ''
    this.refresh(this.pageNum)
  }

  searchText = ''
  searchData: ModResponse[] = []

  searchEvent () { this.throttleSearch() }

  throttleSearch = _.throttle(this.search, 1000, { leading: false });
  async search () {
    const response = await ModService.searchModList(this.searchText)
    if (response) { this.searchData = response }
  }
}
</script>
<style scoped lang="stylus">
</style>

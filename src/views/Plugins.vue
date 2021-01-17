<template>
  <div class="container-fluid bg-nicedark min-vh-except-header text-white">
    <div class="container bg-dark">
    </div>
    <section class="p-3">
      <h3 class="text-center">Browse Plugins</h3>
    </section>
    <div class="row justify-content-around">
      <main class="col-md-8">
        <section class="row p-3">
          <div class="col-9">
            <input class="form-control form-control-lg" type="text" placeholder="Search..."
                   v-model="searchText" @input="searchEvent()">
          </div>
          <div class="col-3 d-flex flex-row justify-content-around align-items-center">
            <router-link :to="`/plugins/page/${this.pageNum > 1 ? this.pageNum - 1 : 1}`">
              <i class="fs-4 fas fa-arrow-circle-left"></i>
            </router-link>
            <strong><span class="d-none d-sm-inline">Page:</span> {{ this.pageNum }}</strong>
            <router-link :to="`/plugins/page/${this.pageNum + 1}`">
              <i class="fs-4 fas fa-arrow-circle-right"></i>
            </router-link>
          </div>
        </section>
        <ul class="list-group" v-if="searchText.length > 0">
          <VPluginItem v-for="(plugin, i) in searchData" :key="i" :plugin="plugin" :edit="false" />
        </ul>
        <ul class="list-group" v-else-if="pluginData.length > 0">
          <VPluginItem v-for="(plugin, i) in pluginData" :key="i" :plugin="plugin" :edit="false" />
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
              <li>You can browse plugins by using the page navigation buttons.</li>
              <li>Search for plugins using the search bar.</li>
            </ul>
          </div>
          <hr>
          <h3 class="card-title fw-bold text-center">Uploading Plugins</h3>
          <div class="card-body">
            <ul style="margin-left: -10px">
              <li>First, you need to have an account.
                <router-link to="/login">Click here to login</router-link> or
                <router-link to="/signup"> signup.</router-link></li>
              <li>Then, go to your profile, or click the button below, to be taken to the plugin uploading page.</li>
            </ul>
            <router-link to="/me/editplugin/new" class="btn btn-primary">
              Upload a Plugin <i class="fas fa-upload"></i>
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
import { Route } from 'vue-router'
import { PluginResponse } from '@/services/responses/pluginResponse'
import PluginService from '@/services/pluginService'
import VPluginItem from '@/components/VPluginItem.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'

@Component({
  components: { VPluginItem, SkeletonCard }
})
export default class Plugins extends Vue {
  get pageNum () {
    return parseInt(this.$route.params.id)
  }

  pluginData: PluginResponse[] = []

  refresh (pageNum: number) {
    PluginService.getPluginListPaginated(pageNum).then(response => {
      if (response) { this.pluginData = response }
    })
  }

  mounted () { this.refresh(this.pageNum) }

  beforeRouteUpdate (to: Route, from: Route, next: () => void) {
    next()
    this.searchText = ''
    this.refresh(this.pageNum)
  }

  searchText = ''
  searchData: PluginResponse[] = []

  searchEvent () { this.throttleSearch() }

  throttleSearch = _.throttle(this.search, 1000, { leading: false });
  async search () {
    const response = await PluginService.searchPluginList(this.searchText)
    if (response) { this.searchData = response }
  }
}
</script>
<style scoped lang="stylus">
</style>

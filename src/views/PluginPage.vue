<template>
  <div class="container-fluid bg-nicedark min-vh-except-header text-white">
    <div class="container" v-if="pluginData.id !== -1">
      <section class="p-3">
        <h3 class="text-center">{{ pluginData.name }}</h3>
      </section>
      <section class="row justify-content-around">
        <main class="col-lg-8">
          <div class="card main-card bg-dark mb-3">
            <div class="row g-0">
              <div class="col-4">
                <img :src="pluginData.imageUrl" ref="img">
              </div>
              <div class="col-8">
                <div class="card-body text-start" ref="body">
                  <p class="card-text overflow-hidden">{{ pluginData.description }}</p>
                  <hr>
                  <div class="d-flex justify-content-between align-items-center flex-wrap">
                    <span>
                      <i class="fas fa-user-alt pe-2"></i>
                      <span class="d-none d-md-inline">Created by</span>
                      {{ pluginData.creator.username }}
                    </span>
                    <span>
                      <i class="fas fa-globe pe-1"></i>
                      <span class="d-none d-sm-inline">For</span>
                      {{ serverDistroName }}
                    </span>
                    <small class="d-none d-sm-inline text-muted">{{ pluginData.guid }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <h3>Download</h3>
          <ul class="list-group">
            <VBuildItem v-for="(pluginBuild, i) in pluginBuildData" :key="i"
                        :build="pluginBuild" :edit="false" @dlstart="addStar($event)"/>
          </ul>
        </main>
        <aside class="col-lg-3 d-none d-lg-block">
          <div class="card bg-dark py-3">
            <h3 class="card-title fw-bold text-center">How to</h3>
            <div class="card-body text-start">
              <ul style="margin-left: -10px">
                <li>You can browse this page to find the version of the plugin you want to download.</li>
                <li>The latest version of the plugin is on top</li>
              </ul>
            </div>
            <div v-if="amOwner">
              <hr>
              <h3 class="card-title fw-bold text-center">Updating your plugin</h3>
              <div class="card-body">
                <ul style="margin-left: -10px" class="text-start">
                  <li>You can update plugin information or upload a new version of your plugin</li>
                  <li>Go to your profile and click the plugin you want to update, or click the button below, to update the plugin.</li>
                </ul>
                <router-link :to="`/me/editplugin/${pluginId}`" class="btn btn-primary">
                  Edit <i class="fas fa-edit"></i>
                </router-link>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Route } from 'vue-router'
import VBuildItem from '@/components/VBuildItem.vue'
import { PluginBuildResponse, PluginResponse, ServerDistro } from '@/services/responses/pluginResponse'
import PluginService from '@/services/pluginService'

@Component({
  components: { VBuildItem }
})
export default class PluginPage extends Vue {
  get pluginId () {
    return parseInt(this.$route.params.id)
  }

  get serverDistroName () {
    return ServerDistro[this.pluginData.serverDistroId ?? 0]
  }

  pluginData: Partial<PluginResponse> = { id: -1 }

  pageNum = 1
  pluginBuildData: PluginBuildResponse[] = []

  async addStar (pluginId: number) {
    await PluginService.updateStarForPlugin(pluginId)
  }

  refresh (pluginId: number, pageNum: number) {
    PluginService.getPluginById(pluginId).then(response => {
      if (response) { this.pluginData = response }
    })
    PluginService.getPluginBuildsPaginatedFor(pluginId, pageNum).then(response => {
      if (response) { this.pluginBuildData.push(...response) }
    })
  }

  mounted () {
    this.pageNum = 1
    this.pluginBuildData = []
    this.refresh(this.pluginId, this.pageNum)
    requestAnimationFrame(this.cardHeight)
  }

  cardHeight () {
    if (this.$refs.img) {
      (this.$refs.img as HTMLElement).style.height =
      `${(this.$refs.body as HTMLElement).clientHeight}px`
    }
    requestAnimationFrame(this.cardHeight)
  }

  beforeRouteUpdate (to: Route, from: Route, next: () => void) {
    next()
    this.mounted()
  }

  get amOwner () {
    return this.pluginData.creator?.username === this.$store.state.username
  }
}
</script>
<style scoped lang="stylus">
.main-card
  min-height 175px
  p
    min-height 125px
    margin-bottom 0
  hr
    margin 0.5rem 0
  img
    object-fit cover
    width 100%
    height 100%
</style>

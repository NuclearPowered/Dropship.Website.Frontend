<template>
  <div class="container-fluid bg-nicedark min-vh-except-header text-white">
    <div class="container" v-if="pluginData.id !== -1">
      <section class="p-3">
        <h3 class="text-center">{{ pluginData.name }}</h3>
      </section>
      <section class="row justify-content-around">
        <main class="col-lg-8">
          <PluginPageCard :plugin="pluginData" />
          <hr>
          <MarkdownRenderer :markdown="pluginData.markdownDescription" class="mb-3 p-2" />
          <h3>Download</h3>
          <PluginBuildTable :builds="pluginBuildData" />
        </main>
        <aside class="col-lg-3 d-none d-lg-block">
          <PluginPageSidebarInfo :plugin="pluginData" :latestBuild="pluginBuildData[0]" class="mb-3" />
          <PluginPageHowTo :owner="amOwner" :pluginId="pluginData.id" />
        </aside>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Route } from 'vue-router'
import VBuildItem from '@/components/VBuildItem.vue'
import { PluginBuildResponse, PluginResponse } from '@/services/responses/pluginResponse'
import PluginService from '@/services/pluginService'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import PluginPageCard from '@/components/PluginPage/PluginPageCard.vue'
import PluginPageHowTo from '@/components/PluginPage/PluginPageHowTo.vue'
import PluginPageSidebarInfo from '@/components/PluginPage/PluginPageSidebarInfo.vue'
import PluginBuildTable from '@/components/PluginPage/PluginBuildTable.vue'

@Component({
  components: { VBuildItem, PluginPageHowTo, PluginPageCard, MarkdownRenderer, PluginPageSidebarInfo, PluginBuildTable }
})
export default class PluginPage extends Vue {
  get pluginId () {
    return parseInt(this.$route.params.id)
  }

  get amOwner () {
    return this.pluginData.creator?.username === this.$store.state.username
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
  }

  beforeRouteUpdate (to: Route, from: Route, next: () => void) {
    next()
    this.mounted()
  }
}
</script>
<style scoped lang="stylus">
</style>

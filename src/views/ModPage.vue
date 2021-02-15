<template>
  <div class="container-fluid bg-nicedark min-vh-except-header text-white">
    <div v-if="modData.id !== -1">
      <section class="p-3">
        <h3 class="text-center">{{ modData.name }}</h3>
      </section>
      <section class="row justify-content-around">
        <main class="col-lg-8">
          <ModPageCard :modData="modData" />
          <hr>
          <MarkdownRenderer :markdown="modData.markdownDescription" class="mb-3 p-3" />
          <h5>Download</h5>
          <ModBuildTable :builds="modBuildData" />
        </main>
        <aside class="col-lg-4 mt-lg-0 mt-5 mb-3">
          <ModPageSidebarInfo :modData="modData" :latestBuild="modBuildData[0]" v-if="modBuildData.length > 0" class="mb-3"/>
          <ModPageHowTo :owner="amOwner" :modId="modData.id" />
        </aside>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ModService from '@/services/modService'
import { ModBuildResponse, ModResponse } from '@/services/responses/modResponse'
import { Route } from 'vue-router'
import VBuildItem from '@/components/VBuildItem.vue'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import ModPageCard from '@/components/ModPage/ModPageCard.vue'
import ModPageHowTo from '@/components/ModPage/ModPageHowTo.vue'
import ModPageSidebarInfo from '@/components/ModPage/ModPageSidebarInfo.vue'
import ModBuildTable from '@/components/ModPage/ModBuildTable.vue'

@Component({
  components: { VBuildItem, MarkdownRenderer, ModPageCard, ModPageHowTo, ModPageSidebarInfo, ModBuildTable }
})
export default class ModPage extends Vue {
  get modId () {
    return parseInt(this.$route.params.id)
  }

  get amOwner () {
    return this.modData.creator?.username === this.$store.state.username
  }

  modData: Partial<ModResponse> = { id: -1 }

  pageNum = 1
  modBuildData: ModBuildResponse[] = []

  async addStar (modId: number) {
    await ModService.updateStarForMod(modId)
  }

  refresh (modId: number, pageNum: number) {
    ModService.getModById(modId).then(response => {
      if (response) { this.modData = response }
    })
    ModService.getModBuildsPaginatedFor(modId, pageNum).then(response => {
      if (response) { this.modBuildData.push(...response) }
    })
  }

  mounted () {
    this.pageNum = 1
    this.modBuildData = []
    this.refresh(this.modId, this.pageNum)
  }

  beforeRouteUpdate (to: Route, from: Route, next: () => void) {
    next()
    this.mounted()
  }
}
</script>
<style lang="stylus" scoped>
</style>

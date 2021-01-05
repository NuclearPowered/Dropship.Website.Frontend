<template>
  <div class="container-fluid bg-nicedark min-vh-except-header text-white">
    <div class="container" v-if="modData.id !== -1">
      <section class="p-3">
        <h3 class="text-center">{{ modData.name }}</h3>
      </section>
      <section class="row justify-content-around">
        <main class="col-md-8">
          <div class="card main-card bg-dark mb-3">
            <div class="row g-0">
              <div class="w-25">
                <img :src="modData.imageUrl" ref="cardimage">
              </div>
              <div class="w-75">
                <div class="card-body text-start" ref="cardbody">
                  <p class="card-text overflow-hidden">{{ modData.description }}</p>
                  <hr>
                  <div class="d-flex justify-content-between align-items-center">
                    <span><i class="fas fa-user-alt"></i> Created by {{ modData.creator.username }}</span>
                    <small class="text-muted">{{ modData.guid }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <h3>Download</h3>
          <ul class="list-group">
            <VBuildItem v-for="(modBuild, i) in modBuildData" :key="i"
                        :build="modBuild" :edit="false" @dlstart="addStar($event)"/>
          </ul>
        </main>
        <aside class="col-md-3 d-none d-md-block">
          <div class="card bg-dark py-3">
            <h3 class="card-title fw-bold text-center">How to</h3>
            <div class="card-body">
              <ul style="margin-left: -10px">
                <li>You can browse this page to find the version of the mod you want to download.</li>
                <li>The latest version of the mod is on top</li>
              </ul>
            </div>
            <div v-if="amOwner">
              <hr>
              <h3 class="card-title fw-bold text-center">Updating your mod</h3>
              <div class="card-body">
                <ul style="margin-left: -10px">
                  <li>You can update mod information or upload a new version of your mod</li>
                  <li>Go to your profile and click the mod you want to update, or click the button below, to update the mod.</li>
                </ul>
                <router-link :to="`/me/editmod/${modId}`" class="btn btn-primary">
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
import ModService from '@/services/modService'
import { ModBuildResponse, ModResponse } from '@/services/responses/modResponse'
import { Route } from 'vue-router'
import VBuildItem from '@/components/VBuildItem.vue'

@Component({
  components: { VBuildItem }
})
export default class ModPage extends Vue {
  get modId () {
    return parseInt(this.$route.params.id)
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
    requestAnimationFrame(this.cardHeight)
  }

  cardHeight () {
    if (this.$refs.cardimage) {
      (this.$refs.cardimage as HTMLElement).style.height =
      `${(this.$refs.cardbody as HTMLElement).clientHeight}px`
    }
    requestAnimationFrame(this.cardHeight)
  }

  beforeRouteUpdate (to: Route, from: Route, next: () => void) {
    next()
    this.mounted()
  }

  get amOwner () {
    return this.modData.creator?.username === this.$store.state.username
  }
}
</script>
<style scoped lang="stylus">
.main-card
  p
    margin-bottom 0px
  hr
    margin 0.5rem 0
  img
    width 100%
</style>

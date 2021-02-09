<template>
  <div class="card main-card bg-dark mb-3">
    <div class="row g-0">
      <div class="col-4">
        <img :src="plugin.imageUrl" ref="img">
      </div>
      <div class="col-8">
        <div class="card-body text-start" ref="body">
          <p class="card-text overflow-hidden">{{ plugin.description }}</p>
          <hr>
          <div class="d-flex justify-content-between align-items-center flex-wrap">
            <span>
              <i class="fas fa-user-alt pe-2"></i>
              <span class="d-none d-md-inline">Created by</span>
              {{ plugin.creator.username }}
            </span>
            <span>
              <i class="fas fa-globe pe-1"></i>
              <span class="d-none d-sm-inline">For</span>
              {{ serverDistroName }}
            </span>
            <small class="d-none d-sm-inline text-muted">{{ plugin.guid }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PluginResponse, ServerDistro } from '@/services/responses/pluginResponse'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class PluginPageCard extends Vue {
  @Prop()
  plugin!: PluginResponse

  get serverDistroName () {
    return ServerDistro[this.plugin.serverDistroId ?? 0]
  }

  cardHeight () {
    if (this.$refs.img) {
      (this.$refs.img as HTMLElement).style.height =
      `${(this.$refs.body as HTMLElement).clientHeight}px`
    }
    requestAnimationFrame(this.cardHeight)
  }

  mounted () {
    requestAnimationFrame(this.cardHeight)
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

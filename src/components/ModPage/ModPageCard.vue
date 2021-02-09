<template>
  <div class="card main-card bg-dark mb-3">
    <div class="row g-0">
      <div class="col-4">
        <img :src="modData.imageUrl" ref="img">
      </div>
      <div class="col-8">
        <div class="card-body text-start" ref="body">
          <p class="card-text overflow-hidden">{{ modData.description }}</p>
          <hr>
          <div class="d-flex justify-content-between align-items-center flex-wrap">
            <span>
              <i class="fas fa-user-alt pe-2"></i>
              <span class="d-none d-sm-inline">Created by</span>
              {{ modData.creator.username }}
            </span>
            <small class="d-none d-sm-inline  text-muted">{{ modData.guid }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ModResponse } from '@/services/responses/modResponse'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class ModPageCard extends Vue {
  @Prop()
  modData!: ModResponse

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

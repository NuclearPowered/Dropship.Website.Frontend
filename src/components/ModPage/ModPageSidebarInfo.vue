<template>
  <div class="card bg-dark py-3">
    <h4 class="card-title fw-bold text-center">Mod info</h4>
    <div class="px-3 text-start">
      <p class="info-list-item"><small>Updated:</small> {{ updatedDate }}</p>
      <p class="info-list-item"><small>Created:</small> {{ createdDate }}</p>
      <p class="info-list-item"><small>Game Platform:</small> {{ gamePlatformString }}</p>
      <p class="info-list-item"><small>Stars:</small> {{ modData.starCount }}</p>
    </div>
    <div v-if="latestBuild" class="px-2">
      <hr>
      <h4 class="card-title fw-bold">Latest file</h4>
      <VBuildItem :build="latestBuild"/>
    </div>
  </div>
</template>

<script lang="ts">
import { ModBuildResponse, ModResponse } from '@/services/responses/modResponse'
import { Component, Prop, Vue } from 'vue-property-decorator'
import VBuildItem from '@/components/VBuildItem.vue'
import { GamePlatform } from '@/models/gameVersionPlatform'

@Component({
  components: { VBuildItem }
})
export default class ModPageHowTo extends Vue {
  @Prop({ default: false })
  modData!: ModResponse

  @Prop({ default: 0 })
  gamePlatform!: GamePlatform

  @Prop()
  latestBuild!: ModBuildResponse

  splitDateTimeOffset (dateString: string): { date: string; time: string } {
    const [date, timeString] = dateString.split('T')
    const [time, ..._] = timeString.split('.')
    return { date, time }
  }

  get updatedDate () {
    const { date, time } = this.splitDateTimeOffset(this.modData.updatedAt)
    return `${date} ${time}`
  }

  get createdDate () {
    const { date, time } = this.splitDateTimeOffset(this.modData.createdAt)
    return `${date} ${time}`
  }

  get gamePlatformString () {
    return GamePlatform[this.gamePlatform]
  }
}
</script>

<style scoped lang="stylus">
.info-list-item
  display flex
  flex-direction row
  justify-content space-between
  align-items center
</style>

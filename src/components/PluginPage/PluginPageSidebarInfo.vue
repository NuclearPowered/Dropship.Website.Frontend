<template>
  <div class="card bg-dark py-3">
    <h4 class="card-title fw-bold text-center">Mod info</h4>
    <div class="px-3 text-start">
      <p class="info-list-item"><small>Updated:</small> {{ updatedDate }}</p>
      <p class="info-list-item"><small>Created:</small> {{ createdDate }}</p>
      <p class="info-list-item"><small>Server Distro:</small> {{ serverDistroString }}</p>
      <p class="info-list-item"><small>Stars:</small> {{ plugin.starCount }}</p>
    </div>
    <div class="px-2">
      <hr>
      <h4 class="card-title fw-bold">Latest file</h4>
      <VBuildItem :build="latestBuild"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VBuildItem from '@/components/VBuildItem.vue'
import { PluginBuildResponse, PluginResponse, ServerDistro } from '@/services/responses/pluginResponse'

@Component({
  components: { VBuildItem }
})
export default class PluginPageSidebarInfo extends Vue {
  @Prop({ default: false })
  plugin!: PluginResponse

  @Prop()
  latestBuild!: PluginBuildResponse

  splitDateTimeOffset (dateString: string): { date: string; time: string } {
    const [date, timeString] = dateString.split('T')
    const [time, ..._] = timeString.split('.')
    return { date, time }
  }

  get updatedDate () {
    const { date, time } = this.splitDateTimeOffset(this.plugin.updatedAt)
    return `${date} ${time}`
  }

  get createdDate () {
    const { date, time } = this.splitDateTimeOffset(this.plugin.createdAt)
    return `${date} ${time}`
  }

  get serverDistroString () {
    return ServerDistro[this.plugin.serverDistroId ?? 0]
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

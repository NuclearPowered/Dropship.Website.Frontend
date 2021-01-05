<template>
  <li class="bg-dark text-light list-group-item flex-column align-items-start my-1 custom-border shadow-sm">
    <div class="d-flex w-100 justify-content-between align-items-center">
      <h5 class="mb-1">{{ build.version }}</h5>
      <a class="btn btn-info" :href="build.downloadUrl" @click="$emit('dlstart', parentId)">Download <i class="fas fa-download"></i></a>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ModBuildResponse } from '@/services/responses/modResponse'
import { PluginBuildResponse } from '@/services/responses/pluginResponse'

@Component({})
export default class VBuildItem extends Vue {
  @Prop()
  build!: ModBuildResponse | PluginBuildResponse

  get parentId () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return this.build.modId ?? this.build.pluginId
  }
}
</script>
<style scoped lang="stylus">
li.custom-border
  border gray 1px solid
  border-top gray 1px solid
  transition border-color 0.05s ease-in-out
  &:hover
    cursor pointer
    border-color white
</style>

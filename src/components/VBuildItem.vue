<template>
  <div class="bg-dark text-light custom-border p-2">
    <div class="d-flex justify-content-between align-items-center">
      <div class="col-8 text-start text-nowrap text-ellipsis">
        <p class="mb-1">{{ build.version }}</p>
        <small class="mb-1 fst-italic">{{ build.fileName }}</small>
      </div>
      <a class="btn btn-info" :href="build.downloadUrl" @click="$emit('dlstart', parentId)"><i class="fas fa-download"></i></a>
    </div>
  </div>
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
.custom-border
  border gray 1px solid
  border-radius 5px
  border-top gray 1px solid
  transition border-color 0.05s ease-in-out
  &:hover
    cursor pointer
    border-color white
</style>

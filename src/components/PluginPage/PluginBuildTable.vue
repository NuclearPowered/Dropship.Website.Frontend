<template>
  <div class="card bg-dark py-3">
  </div>
</template>

<script lang="ts">
import { PluginBuildResponse } from '@/services/responses/pluginResponse'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class PluginBuildTable extends Vue {
  @Prop({ default: [] })
  builds!: PluginBuildResponse[]
}
</script>

<style lang="stylus">
</style>

<template>
  <div class="card bg-dark py-3">
  </div>
</template>

<script lang="ts">
import { ModBuildResponse } from '@/services/responses/modResponse'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class ModBuildTable extends Vue {
  @Prop({ default: [] })
  builds!: ModBuildResponse[]
}
</script>

<style lang="stylus">
</style>

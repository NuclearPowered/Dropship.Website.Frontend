<template>
  <slot></slot>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class VPaginatedList extends Vue {
  @Prop({ default: 1 })
  page!: number;
}
</script>
<style scoped lang="stylus">
</style>

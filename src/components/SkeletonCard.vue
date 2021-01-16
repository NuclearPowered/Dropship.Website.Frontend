<template>
  <div class="row">
    <div class="col-4">
      <SkeletonLoader height="68px" width="100%"/>
    </div>
    <div class="col-8 text-start">
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SkeletonLoader from '@/components/SkeletonLoader.vue'

@Component({
  components: { SkeletonLoader }
})
export default class SkeletonCard extends Vue {
}
</script>
<style scoped lang="stylus">
</style>

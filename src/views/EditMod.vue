<template>
  <div class="container-fluid bg-nicedark min-vh-except-header text-white">
    <div class="container">
      <section class="p-3">
        <h3 class="text-center" v-if="newEdit">Create a new Mod</h3>
        <h3 class="text-center" v-else>Upload a new build</h3>
      </section>
      <section class="row justify-content-around">
        <main class="col-md-8">
          <EditNewMod v-if="newEdit" />
          <EditExistingMod v-else :modId="modId"/>
        </main>
        <aside class="col-md-4 col-12">
          <EditModHowTo :modId="modId" :newEdit="newEdit" />
        </aside>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditNewMod from '@/components/EditAssets/EditMod/EditNewMod.vue'
import EditModHowTo from '@/components/EditAssets/EditMod/EditModHowTo.vue'
import EditExistingMod from '@/components/EditAssets/EditMod/EditExistingMod.vue'

@Component({
  components: { EditNewMod, EditModHowTo, EditExistingMod }
})
export default class EditMod extends Vue {
  get newEdit () {
    return this.$route.params.id === 'new'
  }

  get modId () {
    return parseInt(this.$route.params.id)
  }
}
</script>
<style scoped lang="stylus">

</style>

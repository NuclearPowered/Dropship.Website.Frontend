<template>
  <section>
    <div class="card bg-dark py-3 my-3">
      <h3 class="card-title fw-bold text-center">How to</h3>
      <div class="card-body text-start">
        <ul style="margin-left: -10px" v-if="newEdit">
          <li>Here, you can create a new mod and add the .dll</li>
          <li>We automatically fetch the mod build artifact by the GitHub repo's releases</li>
          <li>To make your GitHub repo compatible, just release a build, and tag the release with the current version of the mod.</li>
          <li>Alternatively, you can manually upload a mod build artifact.</li>
        </ul>
        <ul style="margin-left: -10px" v-else>
          <li>Here, you upload a new build release for your existing mod.</li>
          <li>We automatically fetch the mod build artifact by the GitHub repo's releases</li>
          <li>Create a new GitHub release for the next version of your mod.</li>
          <li>You can also edit all information about your mod, except the GUID.</li>
        </ul>
      </div>
    </div>
    <div class="card bg-dark py-3 my-3" v-if="!newEdit">
      <h3 class="card-title fw-bold text-center">Delete Mod</h3>
      <div class="card-body">
        <p>Are you sure you want to delete your mod? This action cannot be reverted. Click below to confirm.</p>
        <button class="btn btn-danger" @click="deleteMod()">Delete <i class="fas fa-book-dead"></i></button>
        <transition name="fade">
          <div class="alert alert-info mt-3" role="alert" v-if="deleteSuccess">
            Deleted Mod.
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import ModService from '@/services/modService'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: { }
})
export default class EditModHowTo extends Vue {
  @Prop({ default: 0 })
  modId!: number

  @Prop({ default: false })
  newEdit!: boolean

  deleteSuccess = false
  deleteMod () {
    if (ModService.deleteMod(this.modId)) {
      this.deleteSuccess = true
      setTimeout(() => {
        this.deleteSuccess = false
        this.$router.push('/me')
      }, 1000)
    }
  }
}
</script>
<style scoped lang="stylus">
</style>

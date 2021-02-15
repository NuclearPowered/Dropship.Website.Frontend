<template>
  <div class="card bg-dark py-3">
    <h3 class="card-title fw-bold text-center">How to</h3>
    <div class="px-3 text-start">
      <ul style="margin-left: -10px">
        <li>You can browse this page to find the version of the plugin you want to download.</li>
        <li>The latest version of the plugin is on top</li>
      </ul>
    </div>
    <div v-if="owner">
      <hr class="mx-2">
      <h3 class="card-title fw-bold text-center">Updating your plugin</h3>
      <div class="card-body">
        <ul style="margin-left: -10px" class="text-start">
          <li>You can update plugin information or upload a new version of your plugin</li>
          <li>Go to your profile and click the plugin you want to update, or click the button below, to update the plugin.</li>
        </ul>
        <router-link :to="`/me/editplugin/${pluginId}`" class="btn btn-primary">
          Edit <i class="fas fa-edit"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class PluginPageHowTo extends Vue {
  @Prop({ default: false })
  owner!: boolean

  @Prop({ default: 0 })
  pluginId!: number
}
</script>

<style scoped lang="stylus">
</style>

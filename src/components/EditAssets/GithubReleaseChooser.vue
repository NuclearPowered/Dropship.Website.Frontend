<template>
  <div class="d-flex flex-column">
    <div class="mb-3">
      <ValidationProvider rules="required" v-slot="v">
        <label for="githubRepo" class="form-label">Github Repo</label>
        <input type="text" class="form-control" id="githubRepo" placeholder="nuclearpowered/dropship"
                @input="throttleCheckGithub($event)">
        <small>
        Format this in <span class="font-monospace">username/repo</span> format.
        Remember to publish a release.
        </small>
        <small class="form-text text-danger">{{ v.errors[0] }}</small>
      </ValidationProvider>
    </div>
    <div class="mb-3">
      <ul class="list-group">
        <li v-if="displaySpinner" class="list-group-item bg-dark custom-border d-flex align-items-center justify-content-center">
          <div class="spinner-border text-info" role="status"></div>
          <span class="ps-3">No items found!</span>
        </li>
        <label class="list-group-item custom-border" v-for="(asset, i) in assets" :key="i" :class="{ active: pickedAsset === asset }">
          <input type="radio" v-model="pickedAsset" :value="asset" @change="chooseRelease">
          {{ asset.name }}
        </label>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { ValidationProvider } from 'vee-validate'
import { Component, Vue } from 'vue-property-decorator'
import _ from 'lodash'

@Component({
  components: { ValidationProvider }
})
export default class GithubReleaseChooser extends Vue {
  githubRepo = ''
  assets: {
    name: string;
    downloadUrl: string;
    version: string;
  }[] = []

  pickedAsset = {}

  get displaySpinner () {
    return this.githubRepo !== '' && this.assets.length === 0
  }

  async checkGithubRepo (event: InputEvent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.githubRepo = event.target!.value
    const [username, repo] = this.githubRepo.split('/')
    try {
      const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/releases/latest`)
      if (response) {
        this.assets = response.data.assets
          .map((a: any) => (
            {
              name: a.name,
              downloadUrl: a.browser_download_url,
              version: response.data.tag_name
            }))
      }
    } catch (e) { this.assets = [] }
  }

  throttleCheckGithub = _.throttle(this.checkGithubRepo, 1000, { leading: false, trailing: true })

  chooseRelease () {
    this.$emit('change', this.pickedAsset)
  }
}
</script>
<style scoped lang="stylus">
.custom-border
  border gray 1px solid
  overflow hidden
  transition border-color 0.05s ease-in-out
  &:hover
    cursor pointer
    border-color white
.list-group-item
  background-color #212529
.list-group-item.active
  background-color #1b75b5
</style>

<template>
  <div class="container-fluid bg-nicedark min-vh-except-header text-white">
    <div class="container">
      <section class="p-3">
        <h3 class="text-center" v-if="newEdit">Create a new Plugin</h3>
        <h3 class="text-center" v-else>Upload a new build</h3>
      </section>
      <section class="row justify-content-around">
        <main class="col-md-8">
          <div class="card bg-dark p-3">
            <h5 class="card-title text-center">Basic Info</h5>
            <hr>
            <form @submit.prevent="submit()" class="text-start" enctype="multipart/form-data">
              <ValidationObserver v-slot="{ invalid }">
                <div class="mb-3">
                  <ValidationProvider rules="alpha_spaces|required" v-slot="v">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Floor is Lava"
                           v-model="name">
                    <small class="form-text text-danger">{{ v.errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="mb-3">
                  <ValidationProvider rules="minmax:1,128" v-slot="v">
                    <label for="guid" class="form-label">GUID/Namespace</label>
                    <input type="text" class="form-control" id="guid" placeholder="com.cydon.floorislava"
                           v-model="guid" :disabled="!newEdit" :class="{ disabled: !newEdit }">
                    <small class="form-text text-danger">{{ v.errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="mb-3">
                  <ValidationProvider rules="required" v-slot="v">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" placeholder="cydon"
                              v-model="description"></textarea>
                    <small class="form-text text-danger">{{ v.errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="mb-3">
                  <label for="serverDistroId" class="form-label">What server implementation is the plugin for?</label>
                  <select id="serverDistroId" class="form-select" v-model="serverDistroId">
                    <option :value="1" selected>Impostor</option>
                    <option :value="2">NodePolus</option>
                  </select>
                </div>
                <div class="mb-3">
                  <ValidationProvider rules="image" v-slot="{ errors, validate }">
                    <label for="image" class="form-label">Image</label>
                    <input class="form-control" type="file" id="image" @change="validate($event); handlePayload()" ref="imageUpload">
                    <span class="form-text text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <ValidationProvider rules="required" v-slot="v">
                      <label for="githubRepo" class="form-label">Github Repo</label>
                      <input type="text" class="form-control" id="githubRepo" placeholder="nuclearpowered/dropship"
                             v-model="githubRepo">
                      <small>
                        Format this in <span class="font-monospace">username/repo</span> format.
                        Remember to publish a release.
                      </small>
                      <small class="form-text text-danger">{{ v.errors[0] }}</small>
                    </ValidationProvider>
                  </div>
                  <div class="col">
                    <ValidationProvider rules="required" v-slot="v">
                      <label for="modName" class="form-label">Name of the plugin.dll</label>
                      <input type="text" class="form-control" id="modName" placeholder="floorislava.dll"
                             v-model="pluginName">
                      <small>
                        This is the exact name of the plugin file in the release.
                      </small>
                      <small class="form-text text-danger">{{ v.errors[0] }}</small>
                    </ValidationProvider>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary w-100 mt-4 mb-2" :disabled="invalid">
                  Upload a new build <i class="fas fa-save"></i>
                </button>
              </ValidationObserver>
            </form>
            <transition name="fade">
              <div class="alert alert-danger" role="alert" v-if="submitError">
                There was an error uploading the plugin. Please try again later.
              </div>
            </transition>
          </div>
        </main>
        <aside class="col-md-4 col-12">
          <div class="card bg-dark py-3 my-3">
            <h3 class="card-title fw-bold text-center">How to</h3>
            <div class="card-body text-start">
              <ul style="margin-left: -10px" v-if="newEdit">
                <li>Here, you can create a new plugin and add the .dll</li>
                <li>We automatically fetch the plugin build artifact by the GitHub repo's releases</li>
                <li>To make your GitHub repo compatible, just release a build, and tag the release with the current version of the plugin.</li>
              </ul>
              <ul style="margin-left: -10px" v-else>
                <li>Here, you upload a new build release for your existing plugin.</li>
                <li>You can edit all information about your plugin, except the GUID.</li>
                <li>We automatically fetch the plugin build artifact by the GitHub repo's releases</li>
                <li>Create a new GitHub release for the next version of your plugin.</li>
              </ul>
            </div>
          </div>
          <div class="card bg-dark py-3 my-3" v-if="!newEdit">
            <h3 class="card-title fw-bold text-center">Delete Plugin</h3>
            <div class="card-body">
              <p>Are you sure you want to delete your plugin? This action cannot be reverted. Click below to confirm.</p>
              <button class="btn btn-danger" @click="deletePlugin()">Delete <i class="fas fa-book-dead"></i></button>
              <transition name="fade">
                <div class="alert alert-info mt-3" role="alert" v-if="deleteSuccess">
                  Deleted Plugin.
                </div>
              </transition>
            </div>
          </div>
        </aside>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Route } from 'vue-router'
import VBuildItem from '@/components/VBuildItem.vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import axios from 'axios'
import PluginService from '@/services/pluginService'
import { ServerDistro } from '@/services/responses/pluginResponse'
import { AssetUploadService } from '@/services/uploadService'

@Component({
  components: { VBuildItem, ValidationObserver, ValidationProvider }
})
export default class EditPlugin extends Vue {
  get newEdit () {
    return this.$route.params.id === 'new'
  }

  get pluginId () {
    return parseInt(this.$route.params.id)
  }

  name = ''
  guid = ''
  description = ''
  serverDistroId: ServerDistro = 1
  githubRepo = ''
  pluginName = ''
  imageUrl: string | undefined = undefined;

  imageFile: File | undefined = undefined
  handlePayload () {
    this.imageFile = (this.$refs.imageUpload as HTMLInputElement).files?.item(0) as File
  }

  async submit () {
    const [username, repo] = this.githubRepo.split('/')
    try {
      const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/releases/latest`)
      const asset = response.data.assets
        .find((a: {
          name: string;
          browser_download_url: string;
          tag_name: string;
        }) => a.name === this.pluginName)
      if (!asset) {
        this.badEdit()
        return
      }
      const version = response.data.tag_name
      const downloadUrl = asset.browser_download_url
      if (!downloadUrl || !version) {
        this.badEdit()
        return
      }

      if (this.imageFile) {
        this.imageUrl = await AssetUploadService.uploadAsset(this.imageFile)
      }

      if (!this.imageUrl) {
        this.badEdit()
        return
      }

      if (this.newEdit) {
        const plugin = await PluginService.createPlugin(this.name, this.guid, this.description, '', this.serverDistroId, this.imageUrl)
        if (plugin) {
          await PluginService.uploadPluginBuild(plugin.id, version, this.pluginName, downloadUrl)
        }
      } else {
        const plugin = await PluginService.updatePlugin(this.pluginId, this.name, this.description, '', this.imageUrl)
        if (plugin) {
          await PluginService.uploadPluginBuild(plugin.id, version, this.pluginName, downloadUrl)
        }
      }
      await this.$router.push('/me')
    } catch (e) {
      this.badEdit()
    }
  }

  submitError = false
  badEdit () {
    this.submitError = true
    setTimeout(() => { this.submitError = false }, 4000)
  }

  deleteSuccess = false
  deletePlugin () {
    if (PluginService.deletePlugin(this.pluginId)) {
      this.deleteSuccess = true
      setTimeout(() => {
        this.deleteSuccess = false
        this.$router.push('/me')
      }, 1000)
    }
  }

  refresh (pluginId: number) {
    PluginService.getPluginById(pluginId).then(response => {
      if (response) {
        if (response.creator.id !== this.$store.state.userId) {
          this.$router.push('/')
        }
        this.name = response.name
        this.guid = response.guid
        this.description = response.description
        this.serverDistroId = response.serverDistroId
        this.imageUrl = response.imageUrl
      }
    })
  }

  mounted () {
    if (!this.newEdit) {
      this.refresh(this.pluginId)
    }
  }

  beforeRouteUpdate (to: Route, from: Route, next: () => void) {
    next()
    this.mounted()
  }
}
</script>
<style scoped lang="stylus">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="container-fluid bg-nicedark min-vh-except-header text-white">
    <div class="container">
      <section class="p-3">
        <h3 class="text-center" v-if="newEdit">Create a new server</h3>
        <h3 class="text-center" v-else>Update your server's information</h3>
      </section>
      <section class="row justify-content-around">
        <main class="col-md-8">
          <div class="card bg-dark p-3">
            <h5 class="card-title text-center">Basic Info</h5>
            <hr>
            <form @submit.prevent="submit()" class="text-start" enctype="multipart/form-data">
              <ValidationObserver v-slot="{ invalid }">
                <div class="mb-3">
                  <ValidationProvider rules="required" v-slot="v">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="reactor.gg"
                           v-model="name">
                    <small class="form-text text-danger">{{ v.errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="mb-3">
                  <ValidationProvider rules="required|minmax:1,16" v-slot="v">
                    <label for="ipAddress" class="form-label">IP Address</label>
                    <input type="text" class="form-control" id="ipAddress" placeholder="127.0.0.1"
                           v-model="ipAddress">
                    <small class="form-text text-danger">{{ v.errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="mb-3">
                  <ValidationProvider rules="required" v-slot="v">
                    <label for="port" class="form-label">Port</label>
                    <input type="text" class="form-control" id="port" placeholder="22023"
                           v-model="port">
                    <small class="form-text text-danger">{{ v.errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="mb-3">
                  <ValidationProvider rules="required" v-slot="v">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" placeholder="The best among us server"
                              v-model="description"></textarea>
                    <small class="form-text text-danger">{{ v.errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="mb-3">
                  <ValidationProvider rules="image" v-slot="{ errors, validate }">
                    <label for="image" class="form-label">Image</label>
                    <input class="form-control" type="file" id="image" @change="validate($event); handlePayload()" ref="imageUpload">
                    <span class="form-text text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <button type="submit" class="btn btn-primary w-100 mt-4 mb-2" :disabled="invalid">
                  Update server info <i class="fas fa-save"></i>
                </button>
              </ValidationObserver>
            </form>
            <transition name="fade">
              <div class="alert alert-danger" role="alert" v-if="submitError">
                There was an error in creating/updating the server. Please try again later.
              </div>
            </transition>
          </div>
        </main>
        <aside class="col-md-4 col-12">
          <div class="card bg-dark py-3" v-if="!newEdit">
            <h3 class="card-title fw-bold text-center">Delete Server</h3>
            <div class="card-body">
              <p>Are you sure you want to delete your server? This action cannot be reverted. Click below to confirm.</p>
              <button class="btn btn-danger" @click="deleteServer()">Delete <i class="fas fa-book-dead"></i></button>
              <transition name="fade">
                <div class="alert alert-info mt-3" role="alert" v-if="deleteSuccess">
                  Deleted Server.
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
import ServerListService from '@/services/serverListService'
import { AssetUploadService } from '@/services/uploadService'

@Component({
  components: { VBuildItem, ValidationObserver, ValidationProvider }
})
export default class EditServer extends Vue {
  get newEdit () {
    return this.$route.params.id === 'new'
  }

  get serverId () {
    return this.newEdit ? -1 : parseInt(this.$route.params.id)
  }

  name = ''
  description = ''
  ipAddress = '127.0.0.1'
  port = 22023
  imageUrl: string | undefined = undefined;

  imageFile: File | undefined = undefined
  handlePayload () {
    this.imageFile = (this.$refs.imageUpload as HTMLInputElement).files?.item(0) as File
  }

  async submit () {
    try {
      if (this.imageFile) {
        this.imageUrl = await AssetUploadService.uploadAsset(this.imageFile)
      }

      if (!this.imageUrl) {
        this.badEdit()
        return
      }

      const _ipAddress = ServerListService.dot2num(this.ipAddress)
      const server = await ServerListService.createUpdateServer(this.serverId, this.name, this.description, _ipAddress, this.port, this.imageUrl)
      if (!server) {
        this.badEdit()
        return
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
  deleteServer () {
    if (ServerListService.deleteServer(this.serverId)) {
      this.deleteSuccess = true
      setTimeout(() => {
        this.deleteSuccess = false
        this.$router.push('/me')
      }, 1000)
    }
  }

  refresh (serverId: number) {
    ServerListService.getServerById(serverId).then(response => {
      if (response) {
        if (response.owner.id !== this.$store.state.userId) {
          this.$router.push('/')
        }
        this.name = response.name
        this.ipAddress = ServerListService.num2dot(response.ipAddress)
        this.port = response.port
        this.description = response.description
        this.imageUrl = response.imageUrl
      }
    })
  }

  mounted () {
    if (!this.newEdit) {
      this.refresh(this.serverId)
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

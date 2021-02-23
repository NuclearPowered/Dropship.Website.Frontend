<template>
  <div class="card bg-dark p-3">
    <h5 class="card-title text-center">Basic Info</h5>
    <hr />
    <form class="text-start" enctype="multipart/form-data">
      <ValidationObserver v-slot="{ invalid }">
        <div class="mb-3">
          <ValidationProvider rules="alpha_spaces|required" v-slot="v">
            <label class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Floor is Lava"
              v-model="name"
            />
            <small class="form-text text-danger">{{ v.errors[0] }}</small>
          </ValidationProvider>
        </div>
        <div class="mb-3">
          <ValidationProvider rules="minmax:1,128" v-slot="v">
            <label class="form-label">GUID/Namespace</label>
            <input
              type="text"
              class="form-control"
              placeholder="com.cydon.floorislava"
              v-model="guid"
            />
            <small class="form-text text-danger">{{ v.errors[0] }}</small>
          </ValidationProvider>
        </div>
        <div class="mb-3">
          <ValidationProvider rules="required" v-slot="v">
            <label class="form-label">Summary</label>
            <textarea
              class="form-control"
              placeholder="cydon"
              v-model="description"
            ></textarea>
            <small class="form-text text-danger">{{ v.errors[0] }}</small>
          </ValidationProvider>
        </div>
        <div class="mb-3">
          <label class="form-label">Full descrption</label>
          <VueSimpleMde v-model="markdownDescription" class="bg-white"/>
        </div>
        <div class="mb-3">
          <ValidationProvider rules="required|image" v-slot="{ errors, validate }">
            <label class="form-label">Image</label>
            <input
              class="form-control"
              type="file"
              @change="
                validate($event);
                handleImagePayload();
              "
              ref="imageUpload"
            />
            <span class="form-text text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="accordion py-3" id="assetAccordion">
          <div class="accordion-item">
            <button class="accordion-button custom-border" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              <i class="fab fa-github pe-3 fs-4"></i> Github Releases
            </button>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#assetAccordion">
              <div class="accordion-body">
                <GithubReleaseChooser @change="handleGithubChoice($event)" />
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-button collapsed custom-border" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
              <i class="fas fa-upload pe-3 fs-4"></i> Manual Asset Upload
            </button>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#assetAccordion">
              <div class="accordion-body row">
                <div class="col-6">
                  <ValidationProvider rules="ext:dll" v-slot="{ errors }">
                    <label class="form-label">Mod .dll</label>
                    <input
                      class="form-control"
                      type="file"
                      ref="modDllUpload"
                    />
                    <span class="form-text text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-3">
                  <ValidationProvider rules="version" v-slot="{ errors }">
                    <label class="form-label">Semver Version</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="semverVersion"
                    />
                    <span class="form-text text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-3">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <label class="form-label">Game Version</label>
                    <select
                      class="form-control"
                      v-model="gameVersionPlatform"
                    >
                      <option v-for="verPlat in versionPlatforms" :key="verPlat.name" :value="verPlat.name">{{ verPlat.name }}</option>
                    </select>
                    <span class="form-text text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          @click.prevent="submitMod()"
          class="btn btn-primary w-100 mt-4 mb-2"
          :disabled="invalid"
        >
          Upload mod <i class="fas fa-save"></i>
        </button>
      </ValidationObserver>
    </form>
    <transition name="fade">
      <div class="alert alert-danger" role="alert" v-if="submitError">
        There was an error uploading the mod. Please try again later.
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ModService from '@/services/modService'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { AssetUploadService } from '@/services/uploadService'
import VueSimpleMde from 'vue-simplemde'
import GameVersion from '@/services/gameVersionService'
import GithubReleaseChooser from '../GithubReleaseChooser.vue'

@Component({
  components: { ValidationObserver, ValidationProvider, VueSimpleMde, GithubReleaseChooser }
})
export default class EditNewMod extends Vue {
  name = ''
  guid = ''
  description = ''
  markdownDescription = ''
  imageFile?: File = undefined

  modBuildInfo: Partial<{ downloadUrl: string; fileName: string; version: string }> = {}
  semverVersion = ''
  versionPlatforms = GameVersion.List
  gameVersionPlatform = '2020.12.9s'

  get gameVerPlatInfo () {
    return GameVersion.Map[this.gameVersionPlatform]
  }

  handleImagePayload () {
    this.imageFile = (this.$refs.imageUpload as HTMLInputElement).files?.item(0) as File
  }

  getModDllPayload () {
    return (this.$refs.modDllUpload as HTMLInputElement).files?.item(0) as File
  }

  handleGithubChoice (event: { name: string; downloadUrl: string; version: string }) {
    this.modBuildInfo.downloadUrl = event.downloadUrl
    this.modBuildInfo.fileName = event.name
    this.modBuildInfo.version = event.version
  }

  async submitMod () {
    const modFile = this.getModDllPayload()
    if (modFile) {
      // If we uploaded a file, but did not give a version, cancel the submission
      if (this.semverVersion === '') {
        return this.badEdit()
      }
      this.modBuildInfo.downloadUrl = await AssetUploadService.uploadAsset(modFile)
      this.modBuildInfo.fileName = modFile.name
      this.modBuildInfo.version = this.semverVersion
    }

    const imageUrl = await AssetUploadService.uploadAsset(this.imageFile)

    if (this.modBuildInfo.downloadUrl &&
        this.modBuildInfo.version &&
        this.modBuildInfo.fileName &&
        imageUrl) {
      const mod = await ModService.createMod(
        this.name,
        this.guid,
        this.description,
        this.markdownDescription,
        imageUrl
      )
      if (mod) {
        await ModService.uploadModBuild(
          mod.id,
          this.modBuildInfo.version,
          this.modBuildInfo.fileName,
          this.gameVerPlatInfo.versionNumber,
          this.gameVerPlatInfo.platform,
          this.modBuildInfo.downloadUrl
        )
        await this.$router.push(`/mod/${mod.id}`)
      }
    } else { this.badEdit() }
  }

  submitError = false;
  badEdit () {
    this.submitError = true
    setTimeout(() => {
      this.submitError = false
    }, 4000)
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

.custom-border
  border gray 1px solid
  overflow hidden
  transition border-color 0.05s ease-in-out
  &:hover
    cursor pointer
    border-color white

.accordion-button.collapsed
  color white !important

</style>

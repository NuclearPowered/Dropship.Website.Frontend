<template>
  <div class="bg-dark text-light flex-column align-items-start my-1 custom-border shadow-sm" @click="goToServer()">
    <div class="row g-0 main-area flex-nowrap">
      <div class="img-container">
        <img :src="server.imageUrl">
      </div>
      <div class="card-body pb-0 d-flex flex-column text-start">
        <h5 class="card-text text-nowrap overflow-hidden">{{ server.name }}</h5>
        <p class="p-2 overflow-hidden">{{ server.description }}</p>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
          <small class="d-none d-sm-inline"><i class="fas fa-user-alt"></i><strong class="ms-2">{{ server.owner.username }}</strong></small>
          <small><i class="fas fa-globe"></i><strong class="ms-2">{{ ipPort }}</strong></small>
          <small class="text-muted"><i class="fas fa-star me-1"></i>{{ server.starCount }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ServerResponse } from '@/services/responses/serverResponse'
import ServerListService from '@/services/serverListService'

@Component({})
export default class VServerItem extends Vue {
  @Prop()
  server!: ServerResponse

  @Prop({ default: false })
  edit!: boolean

  get ipPort () {
    return ServerListService.num2dot(this.server.ipAddress)
  }

  goToServer () {
    if (this.edit) {
      this.$router.push(`/me/editserver/${this.server.id}`)
    }
  }
}
</script>
<style scoped lang="stylus">
.custom-border
  border gray 1px solid
  border-radius 15px
  overflow hidden
  transition border-color 0.05s ease-in-out
  &:hover
    cursor pointer
    border-color white
.main-area
  height 175px
  p
    height 50%
    margin-bottom 0
  hr
    margin 0.5rem 0
  .img-container
    max-width 30%
    img
      object-fit cover
      width 100%
      height 100%
</style>

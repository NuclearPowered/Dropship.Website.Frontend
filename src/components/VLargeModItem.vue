<template>
  <div class="bg-dark text-light flex-column align-items-start my-1 custom-border shadow-sm" @click="goToMod()">
    <div class="row g-0 main-area flex-nowrap">
      <div class="img-container">
        <img :src="mod.imageUrl">
      </div>
      <div class="card-body pb-0 d-flex flex-column text-start">
        <h5 class="card-text text-nowrap overflow-hidden">{{ mod.name }}</h5>
        <p class="p-2 overflow-hidden">{{ mod.description }}</p>
        <hr>
        <div class="d-flex justify-content-between align-items-center card-footer">
          <small><i class="fas fa-user-alt"></i><strong class="ms-2">{{ mod.creator.username }}</strong></small>
          <small class="text-muted"><i class="fas fa-star me-1"></i>{{ mod.starCount }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ModResponse } from '@/services/responses/modResponse'

@Component({})
export default class VLargeModItem extends Vue {
  @Prop()
  mod!: ModResponse

  @Prop({ default: false })
  edit!: boolean

  goToMod () {
    if (this.edit) {
      this.$router.push(`/me/editmod/${this.mod.id}`)
    } else {
      this.$router.push(`/mod/${this.mod.id}`)
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
  max-height 300px
  p
    height 60%
    width 100%
  hr
    margin 0.5rem 0
    width 100%
  h5
    width 90%
  .img-container
    max-width 30%
    img
      object-fit cover
      width 100%
      height 100%
  .card-footer
    width 95%
</style>

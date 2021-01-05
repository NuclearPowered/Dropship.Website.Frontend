<template>
  <div class="container-fluid bg-nicedark min-vh-except-header text-white">
    <div class="row h-100 justify-content-center">
      <div class="col-12 col-sm-8 col-lg-5 col-xl-3 mt-5">
        <ChangePasswordForm @changePassword="updatePassword($event)"/>
        <transition name="fade">
          <div class="alert alert-success" role="alert" v-if="success">
            Success! Your password has been updated.
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChangePasswordForm from '@/components/ChangePasswordForm.vue'
import AuthService from '@/services/authService'

@Component({
  components: { ChangePasswordForm }
})
export default class UserSettings extends Vue {
  success = false
  async updatePassword (password: string) {
    const response = await AuthService.updatePassword(password)
    if (response) {
      this.success = true
      setTimeout(() => { this.$router.push('/me') }, 2000)
    }
  }
}
</script>
<style scoped lang="stylus">
</style>

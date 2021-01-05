<template>
  <div class="card bg-dark p-3">
    <h5 class="card-title text-center">Change your password</h5>
    <form @submit.prevent="$emit('changePassword', password)">
      <ValidationObserver v-slot="{ invalid }">
        <div class="mb-3">
          <ValidationProvider rules="required|minmax:12,32|confirmed:confirmation" v-slot="v">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password">
            <small class="form-text text-danger">{{ v.errors[0] }}</small>
          </ValidationProvider>
        </div>
        <div class="mb-3">
          <ValidationProvider vid="confirmation" v-slot="v">
            <label for="password2" class="form-label">Re-enter your Password</label>
            <input type="password" class="form-control" id="password2" v-model="confirmation">
            <small class="form-text text-danger">{{ v.errors[0] }}</small>
          </ValidationProvider>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-4 mb-2" :disabled="invalid">Submit</button>
        <slot></slot>
      </ValidationObserver>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

@Component({
  components: { ValidationObserver, ValidationProvider }
})
export default class ChangePasswordForm extends Vue {
  password = ''
  confirmation = ''
}
</script>
<style scoped lang="stylus">
</style>

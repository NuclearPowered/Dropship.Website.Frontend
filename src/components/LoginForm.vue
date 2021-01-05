<template>
  <form @submit.prevent="submit()">
    <ValidationObserver v-slot="{ invalid }">
      <div class="mb-3">
        <ValidationProvider rules="alpha_num|required" v-slot="v">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" id="username" placeholder="cydon" v-model="username">
          <small class="form-text text-danger">{{ v.errors[0] }}</small>
        </ValidationProvider>
      </div>
      <div class="mb-3">
<!--        <ValidationProvider rules="required|minmax:12,32" v-slot="v">-->
        <ValidationProvider rules="required" v-slot="v">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password">
          <small class="form-text text-danger">{{ v.errors[0] }}</small>
        </ValidationProvider>
      </div>
      <button type="submit" class="btn btn-primary w-100 mt-4 mb-2" :disabled="invalid">Submit</button>
      <slot></slot>
    </ValidationObserver>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

@Component({
  components: { ValidationObserver, ValidationProvider }
})
export default class LoginForm extends Vue {
  username = ''
  password = ''

  submit () {
    this.$emit('login', { username: this.username, password: this.password })
  }
}
</script>
<style scoped lang="stylus">
</style>

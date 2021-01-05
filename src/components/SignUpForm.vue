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
        <ValidationProvider rules="email|required" v-slot="v">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" placeholder="webmaster@google.com" v-model="email">
          <small class="form-text text-danger">{{ v.errors[0] }}</small>
          <div id="emailHelp" class="form-text">We'll never share your info with anyone else.</div>
        </ValidationProvider>
      </div>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

@Component({
  components: { ValidationObserver, ValidationProvider }
})
export default class SignUpForm extends Vue {
  username = ''
  email = ''
  password = ''
  confirmation = ''

  submit () {
    this.$emit('signup', { username: this.username, email: this.email, password: this.password })
  }
}
</script>
<style scoped lang="stylus">
</style>

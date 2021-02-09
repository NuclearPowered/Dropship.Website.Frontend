<template>
  <div class="container-fluid bg-dark vh-except-header">
    <div class="row h-100 justify-content-center">
      <div class="col-12 col-sm-8 col-lg-5 col-xl-3">
        <div class="card bg-dark shadow-lg text-white p-3">
          <div v-if="signupRoute">
            <h5 class="card-title text-center">Sign Up</h5>
            <SignUpForm @signup="signUpAttempt($event)">
              <small class="text-danger" v-if="errorText !== ''">{{ errorText }}</small>
            </SignUpForm>
            <router-link to="/login" class="text-center pt-3">Have an account? Log in.</router-link>
          </div>
          <div v-else>
            <h5 class="card-title text-center">Login</h5>
            <LoginForm @login="loginAttempt($event)">
              <small class="text-danger" v-if="errorText !== ''">{{ errorText }}</small>
            </LoginForm>
            <router-link to="/signup" class="text-center pt-3">Sign up instead</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import LoginForm from '@/components/LoginSignup/LoginForm.vue'
import AuthService from '@/services/authService'
import SignUpForm from '@/components/LoginSignup/SignUpForm.vue'

@Component({
  components: { LoginForm, SignUpForm }
})
export default class LoginSignup extends Vue {
  @Prop({ default: '/' })
  redirectURL!: string;

  get signupRoute () {
    return this.$route.path.includes('signup')
  }

  errorText = ''

  async signUpAttempt (event: { username: string; email: string; password: string }) {
    if (await AuthService.register(event.username, event.email, event.password)) {
      this.$router.push(this.redirectURL)
    }
  }

  async loginAttempt (event: { username: string; password: string }) {
    if (await AuthService.login(event.username, event.password)) {
      this.$router.push(this.redirectURL)
    } else {
      this.badLogin()
    }
  }

  badLogin () {
    this.errorText = 'Error logging in'
    setTimeout(() => {
      this.errorText = ''
    }, 1000)
  }
}
</script>
<style scoped lang="stylus">
</style>

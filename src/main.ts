import './router/componentHooks'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '@fontsource/ubuntu'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'simplemde/dist/simplemde.min.css'
import '@ag-grid-community/core/dist/styles/ag-grid.css'
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css'
import semver from 'semver'

import { extend } from 'vee-validate'
import { required, alpha_num, alpha_spaces, confirmed, email, image, ext } from 'vee-validate/dist/rules' // eslint-disable-line

// No message specified.
extend('alpha_num', alpha_num)
extend('alpha_spaces', alpha_spaces)
extend('image', {
  ...image,
  message: 'The file must be an image'
})
extend('ext', {
  ...ext,
  message: 'The file isn\'t the proper format'
})
extend('confirmed', {
  ...confirmed,
  message: 'Your passwords don\'t match'
})
extend('email', {
  ...email,
  message: 'The email isn\'t valid'
})
extend('minmax', {
  validate (value, args) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return value.length >= args.min && value.length <= args.max ? true : `Must be between ${args.min} and ${args.max} characters long.`
  },
  params: ['min', 'max']
})
extend('version', {
  validate (value) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return semver.valid(value) || value === '' ? true : 'Must be a version in semver format.'
  },
  params: ['min', 'max']
})

extend('required', {
  ...required,
  message: 'This field is required'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

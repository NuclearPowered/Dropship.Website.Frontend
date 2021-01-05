import { GenericResponse, GenericResponseWithData } from '@/services/responses/genericResponse'
import AuthResponse from '@/services/responses/authResponse'
import store from '@/store'
import webapi from '@/services/webapi'

export default class AuthService {
  static async login (username: string, password: string) {
    try {
      const response: GenericResponseWithData<AuthResponse> | GenericResponse =
        (await webapi().post('/api/auth/login', {
          username,
          password
        })).data

      if (response.success) {
        await store.dispatch('login', (response as GenericResponseWithData<AuthResponse>).data.token)
        return true
      } else {
        await AuthService.logout()
      }
    } catch (e) {
      console.warn(`Could not ${this.login.toString()}`)
    }
  }

  static async logout () {
    await store.dispatch('logout')
  }

  static async register (username: string, email: string, password: string) {
    try {
      const response: GenericResponse =
        (await webapi().post('/api/auth/register', {
          username,
          email,
          password
        })).data

      if (response.success) {
        return await AuthService.login(username, password)
      }
    } catch (e) {
      console.warn(`Could not ${this.register.toString()}`)
    }
  }

  static async updatePassword (password: string) {
    try {
      const response: GenericResponse =
        (await webapi().post('/api/auth/updatePassword', { password })).data

      if (response.success) {
        return await AuthService.login(store.state.username, password)
      }
    } catch (e) {
      console.warn(`Could not ${this.register.toString()}`)
    }
  }
}

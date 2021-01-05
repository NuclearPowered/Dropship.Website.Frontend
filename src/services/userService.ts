import { GenericResponse, GenericResponseWithData } from '@/services/responses/genericResponse'
import webapi from '@/services/webapi'
import UserResponse from '@/services/responses/userResponse'
import { ModResponse } from '@/services/responses/modResponse'
import { ServerResponse } from '@/services/responses/serverResponse'
import { PluginResponse } from '@/services/responses/pluginResponse'

export default class UserService {
  static async getUserInfo (userId: number) {
    try {
      const response: GenericResponseWithData<UserResponse> | GenericResponse =
        (await webapi().get(`/api/users/${userId}`)).data

      if (response.success) {
        return (response as GenericResponseWithData<UserResponse>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.getUserInfo.toString()}`)
    }
  }

  static async getModsForUserId (userId: number) {
    try {
      const response: GenericResponseWithData<ModResponse[]> | GenericResponse =
        (await webapi().get(`/api/users/${userId}/mods`)).data
      if (response.success) {
        return (response as GenericResponseWithData<ModResponse[]>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.getModsForUserId.toString()}`)
    }
  }

  static async getPluginsForUserId (userId: number) {
    try {
      const response: GenericResponseWithData<PluginResponse[]> | GenericResponse =
        (await webapi().get(`/api/users/${userId}/plugins`)).data
      if (response.success) {
        return (response as GenericResponseWithData<PluginResponse[]>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.getPluginsForUserId.toString()}`)
    }
  }

  static async getServersForUserId (userId: number) {
    try {
      const response: GenericResponseWithData<ServerResponse[]> | GenericResponse =
        (await webapi().get(`/api/mods/${userId}/servers`)).data
      if (response.success) {
        return (response as GenericResponseWithData<ServerResponse[]>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.getServersForUserId.toString()}`)
    }
  }
}

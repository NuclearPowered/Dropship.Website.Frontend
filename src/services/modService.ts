import webapi from '@/services/webapi'
import { GenericResponseWithData, GenericResponse } from '@/services/responses/genericResponse'
import { ModResponse, ModBuildResponse } from '@/services/responses/modResponse'
import store from '@/store'

export default class ModService {
  static async createMod (name: string, guid: string, description: string, imageUrl: string) {
    try {
      const response: GenericResponse | GenericResponseWithData<ModResponse> =
        (await webapi().post('/api/mods/create', { name, guid, description, imageUrl })).data

      if (response.success) {
        return (response as GenericResponseWithData<ModResponse>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.createMod.toString()}`)
    }
  }

  static async updateMod (id: number, name: string, description: string, imageUrl: string) {
    try {
      const response: GenericResponse | GenericResponseWithData<ModResponse> =
        (await webapi().post('/api/mods/update', { id, name, description, imageUrl })).data

      if (response.success) {
        return (response as GenericResponseWithData<ModResponse>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.updateMod.toString()}`)
    }
  }

  static async uploadModBuild (modId: number, version: string, fileName: string, downloadUrl: string) {
    try {
      const response: GenericResponse | GenericResponseWithData<ModBuildResponse> =
        (await webapi().post('/api/modbuilds/create', { modId, version, fileName, downloadUrl, dependencyIds: [] })).data

      if (response.success) {
        return (response as GenericResponseWithData<ModBuildResponse>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.createMod.toString()}`)
    }
  }

  static async deleteMod (id: number) {
    try {
      await webapi().delete(`/api/mods/${id}`, {
        headers: { Authorization: `Bearer ${store.state.jwt}` }
      })
    } catch (e) {
      console.warn(`Could not ${this.deleteMod.toString()}`)
    }
  }

  static async getModById (modId: number) {
    try {
      const response: GenericResponse | GenericResponseWithData<ModResponse> =
        (await webapi().get(`/api/mods/${modId}`)).data

      if (response.success) {
        return (response as GenericResponseWithData<ModResponse>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.getModById.toString()}`)
    }
  }

  static async getModListPaginated (page: number) {
    try {
      const response: GenericResponse | GenericResponseWithData<ModResponse[]> =
        (await webapi().get(`/api/mods/page/${page}`)).data

      if (response.success) {
        return (response as GenericResponseWithData<ModResponse[]>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.getModListPaginated.toString()}`)
    }
  }

  static async searchModList (search: string) {
    try {
      const response: GenericResponse | GenericResponseWithData<ModResponse[]> =
        (await webapi().get(`/api/mods/search?query=${encodeURIComponent(search)}`)).data

      if (response.success) {
        return (response as GenericResponseWithData<ModResponse[]>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.searchModList.toString()}`)
    }
  }

  static async updateStarForMod (id: number) {
    try {
      const response: GenericResponse | GenericResponseWithData<ModResponse> =
        (await webapi().post(`/api/mods/${id}/star`)).data

      if (response.success) {
        return (response as GenericResponseWithData<ModResponse>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.updateStarForMod.toString()}`)
    }
  }

  static async getModBuildsPaginatedFor (modid: number, page: number) {
    try {
      const response: GenericResponse | GenericResponseWithData<ModBuildResponse[]> =
        (await webapi().get(`/api/modbuilds/${modid}/page/${page}`)).data

      if (response.success) {
        return (response as GenericResponseWithData<ModBuildResponse[]>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.getModBuildsPaginatedFor.toString()}`)
    }
  }
}

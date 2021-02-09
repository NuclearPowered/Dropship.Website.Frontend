import webapi from '@/services/webapi'
import { GenericResponseWithData, GenericResponse } from '@/services/responses/genericResponse'
import { PluginBuildResponse, PluginResponse, ServerDistro } from '@/services/responses/pluginResponse'

export default class PluginService {
  static async createPlugin (name: string, guid: string, description: string, markdownDescription: string, serverDistroId: ServerDistro, imageUrl: string) {
    try {
      const response: GenericResponse | GenericResponseWithData<PluginResponse> =
        (await webapi().post('/api/plugins/create', { name, guid, description, markdownDescription, serverDistroId, imageUrl })).data

      if (response.success) {
        return (response as GenericResponseWithData<PluginResponse>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.createPlugin.toString()}`)
    }
  }

  static async updatePlugin (id: number, name: string, description: string, markdownDescription: string, imageUrl: string) {
    try {
      const response: GenericResponse | GenericResponseWithData<PluginResponse> =
        (await webapi().post('/api/plugins/update', { id, name, description, markdownDescription, imageUrl })).data

      if (response.success) {
        return (response as GenericResponseWithData<PluginResponse>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.updatePlugin.toString()}`)
    }
  }

  static async uploadPluginBuild (pluginId: number, version: string, fileName: string, downloadUrl: string) {
    try {
      const response: GenericResponse | GenericResponseWithData<PluginBuildResponse> =
        (await webapi().post('/api/pluginbuilds/create',
          { pluginId, version, fileName, downloadUrl, dependencyIds: [] })).data

      if (response.success) {
        return (response as GenericResponseWithData<PluginBuildResponse>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.uploadPluginBuild.toString()}`)
    }
  }

  static async deletePlugin (id: number) {
    try {
      const response: GenericResponse =
        (await webapi().delete(`/api/plugins/${id}`)).data
      return response
    } catch (e) {
      console.warn(`Could not ${this.deletePlugin.toString()}`)
    }
  }

  static async getPluginById (pluginId: number) {
    try {
      const response: GenericResponse | GenericResponseWithData<PluginResponse> =
        (await webapi().get(`/api/plugins/${pluginId}`)).data

      if (response.success) {
        return (response as GenericResponseWithData<PluginResponse>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.getPluginById.toString()}`)
    }
  }

  static async getPluginListPaginated (page: number) {
    try {
      const response: GenericResponse | GenericResponseWithData<PluginResponse[]> =
        (await webapi().get(`/api/plugins/page/${page}`)).data

      if (response.success) {
        return (response as GenericResponseWithData<PluginResponse[]>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.getPluginListPaginated.toString()}`)
    }
  }

  static async searchPluginList (search: string) {
    try {
      const response: GenericResponse | GenericResponseWithData<PluginResponse[]> =
        (await webapi().get(`/api/plugins/search?query=${encodeURIComponent(search)}`)).data

      if (response.success) {
        return (response as GenericResponseWithData<PluginResponse[]>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.searchPluginList.toString()}`)
    }
  }

  static async updateStarForPlugin (id: number) {
    try {
      const response: GenericResponse | GenericResponseWithData<PluginResponse> =
        (await webapi().post(`/api/plugins/${id}/star`)).data

      if (response.success) {
        return (response as GenericResponseWithData<PluginResponse>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.updateStarForPlugin.toString()}`)
    }
  }

  static async getPluginBuildsPaginatedFor (pluginId: number, page: number) {
    try {
      const response: GenericResponse | GenericResponseWithData<PluginBuildResponse[]> =
        (await webapi().get(`/api/pluginbuilds/${pluginId}/page/${page}`)).data

      if (response.success) {
        return (response as GenericResponseWithData<PluginBuildResponse[]>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.getPluginBuildsPaginatedFor.toString()}`)
    }
  }
}

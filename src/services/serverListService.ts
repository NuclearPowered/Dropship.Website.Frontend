import webapi from '@/services/webapi'
import { GenericResponseWithData, GenericResponse } from '@/services/responses/genericResponse'
import { ServerResponse } from '@/services/responses/serverResponse'

export default class ServerListService {
  static async createUpdateServer (id: number, name: string, description: string, _ipAddress: number, port: number, imageUrl: string) {
    try {
      const response: GenericResponse | GenericResponseWithData<ServerResponse> =
        (await webapi().post('/api/serverlist/update', { id, name, description, ipAddress: _ipAddress, port, imageUrl })).data

      if (response.success) {
        return (response as GenericResponseWithData<ServerResponse>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.createUpdateServer.toString()}`)
    }
  }

  static async deleteServer (id: number) {
    try {
      const response: GenericResponse =
        (await webapi().delete(`/api/serverlist/${id}`)).data
      return response
    } catch (e) {
      console.warn(`Could not ${this.deleteServer.toString()}`)
    }
  }

  static async getServerById (serverId: number) {
    try {
      const response: GenericResponse | GenericResponseWithData<ServerResponse> =
        (await webapi().get(`/api/serverlist/${serverId}`)).data

      if (response.success) {
        return (response as GenericResponseWithData<ServerResponse>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.getServerById.toString()}`)
    }
  }

  static async getServerListPaginated (page: number) {
    try {
      const response: GenericResponse | GenericResponseWithData<ServerResponse[]> =
        (await webapi().get(`/api/serverlist/page/${page}`)).data

      if (response.success) {
        return (response as GenericResponseWithData<ServerResponse[]>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.getServerListPaginated.toString()}`)
    }
  }

  static async searchServerList (search: string) {
    try {
      const response: GenericResponse | GenericResponseWithData<ServerResponse[]> =
        (await webapi().get(`/api/serverlist/search?query=${encodeURIComponent(search)}`)).data

      if (response.success) {
        return (response as GenericResponseWithData<ServerResponse[]>).data
      }
    } catch (e) {
      console.warn(`Could not ${this.searchServerList.toString()}`)
    }
  }

  static num2dot (num: number): string {
    return ((num >>> 24) + '.' +
      (num >> 16 & 255) + '.' +
      (num >> 8 & 255) + '.' +
      (num & 255))
  }

  static dot2num (dot: string): number {
    const d = dot.split('.')
    return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3])
  }
}

import webapi from '@/services/webapi'
import { GenericResponse, GenericResponseWithData } from '@/services/responses/genericResponse'

export class AssetUploadService {
  static async uploadAsset (asset: File | undefined) {
    const formData = new FormData()
    if (asset) {
      formData.append('asset', asset)
      try {
        const response: GenericResponseWithData<string> | GenericResponse =
          (await webapi().post('/api/assets/upload', formData)).data

        if (response.success) {
          return (response as GenericResponseWithData<string>).data
        }
      } catch (e) {
        console.warn('Could not upload asset to server.')
      }
    }
  }
}

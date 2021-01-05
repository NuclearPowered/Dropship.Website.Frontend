import axios from 'axios'
import consts from '@/consts'
import store from '@/store'
import { GenericResponseWithData, GenericResponse } from '@/services/responses/genericResponse'

export default function webapi () {
  return axios.create({
    baseURL: consts.WEBAPI_URL,
    timeout: 10000,
    headers: { Authorization: `Bearer ${store.state.jwt}` }
  })
}

export class ImageUploadService {
  static async uploadImage (image: File | undefined) {
    const formData = new FormData()
    if (image) {
      formData.append('image', image)
      try {
        const response: GenericResponseWithData<string> | GenericResponse =
          (await webapi().post('/api/images/upload', formData)).data

        if (response.success) {
          return (response as GenericResponseWithData<string>).data
        }
      } catch (e) {
        console.warn('Could not upload image to server.')
      }
    }
  }
}

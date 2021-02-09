import axios from 'axios'
import consts from '@/consts'
import store from '@/store'

export default function webapi () {
  return axios.create({
    baseURL: consts.WEBAPI_URL,
    timeout: 10000,
    headers: { Authorization: `Bearer ${store.state.jwt}` }
  })
}

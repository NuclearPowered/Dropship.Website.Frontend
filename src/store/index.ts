import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    jwt: '',
    userId: -1,
    username: ''
  },
  mutations: {
    login (state) {
      state.loggedIn = true
    },
    logout (state) {
      state.loggedIn = false
    },
    addJwt (state, payload: string) {
      state.jwt = payload
    },
    removeJwt (state) {
      state.jwt = ''
    },
    addUserInfo (state, payload: { userId: number; username: string }) {
      state.userId = payload.userId
      state.username = payload.username
    },
    removeUserInfo (state) {
      state.userId = -1
      state.username = ''
    }
  },
  actions: {
    login ({ commit }, payload) {
      commit('login')
      commit('addJwt', payload)
      const decoded: any = jwtDecode(payload) // eslint-disable-line
      commit('addUserInfo', {
        userId: parseInt(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid']),
        username: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      })
    },
    logout ({ commit }) {
      commit('logout')
      commit('removeJwt')
      commit('removeUserInfo')
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})

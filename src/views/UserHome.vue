<template>
  <div class="container-fluid bg-nicedark min-vh-except-header text-white">
    <div class="container">
      <main v-if="this.user !== null">
        <section class="d-flex flex-row align-items-center">
          <i class="fas fa-user fs-1 p-4"></i>
          <h2>{{ user.username }}</h2>
          <em class="fs-5 ms-2 mb-1">- {{ user.email }}</em>
          <router-link class="btn btn-info rounded-pill ms-auto" to="/me/settings">
            <i class="fas fa-cog fs-4"></i> Settings
          </router-link>
        </section>
        <section>
          <h3>Create</h3>
          <div class="row">
            <div class="col-sm-4 py-3">
              <div class="card bg-dark pt-4">
                <i class="fs-2 fas fa-wrench"></i>
                <div class="card-body">
                  <router-link to="/me/editmod/new" class="btn btn-primary">
                    Upload a Mod <i class="fas fa-upload"></i>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-sm-4 py-3">
              <div class="card bg-dark pt-4">
                <i class="fs-2 fas fa-plug"></i>
                <div class="card-body">
                  <router-link to="/me/editplugin/new" class="btn btn-primary">
                    Upload a Plugin <i class="fas fa-upload"></i>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-sm-4 py-3">
              <div class="card bg-dark pt-4">
                <i class="fs-2 fas fa-globe"></i>
                <div class="card-body">
                  <router-link to="/me/editserver/new" class="btn btn-primary">
                    Add a Server <i class="fas fa-upload"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr class="mb-5">
        <section class="pb-4">
          <ul class="nav nav-tabs tab-nav">
            <li class="nav-item flex-grow-1" v-for="page in pages" :key="page.id" @click="currentPage = page.id">
              <h5 class="nav-link py-3" :class="{ active: currentPage === page.id }">{{ page.name }}</h5>
            </li>
          </ul>
          <div class="p-3" :class="{ 'tab-content': contentExists }">
            <div class="col" v-if="currentPage === 1">
              <ul class="list-group">
                <VModItem v-for="(mod, i) in user.mods" :key="i" :mod="mod" :edit="true" />
              </ul>
            </div>
            <div class="col" v-if="currentPage === 2">
              <ul class="list-group">
                <VPluginItem v-for="(plugin, i) in user.plugins" :key="i" :plugin="plugin" :edit="true" />
              </ul>
            </div>
            <div class="col" v-if="currentPage === 3">
              <ul class="list-group">
                <VServerItem v-for="(server, i) in user.servers" :key="i" :server="server" :edit="true" />
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserResponse from '@/services/responses/userResponse'
import UserService from '@/services/userService'
import VModItem from '@/components/VModItem.vue'
import { ModResponse } from '@/services/responses/modResponse'
import { ServerResponse } from '@/services/responses/serverResponse'
import { PluginResponse } from '@/services/responses/pluginResponse'
import VPluginItem from '@/components/VPluginItem.vue'
import VServerItem from '@/components/VServerItem.vue'

@Component({
  components: { VServerItem, VPluginItem, VModItem }
})
export default class UserHome extends Vue {
  user: Partial<UserResponse> = {};

  currentPage = 1;
  pages = [
    {
      id: 1,
      name: 'Your Mods'
    },
    {
      id: 2,
      name: 'Your Plugins'
    },
    {
      id: 3,
      name: 'Your Servers'
    }
  ]

  get contentExists () {
    if (this.currentPage === 1) {
      return this.user.mods ? this.user.mods.length > 0 : false
    }
    if (this.currentPage === 2) {
      return this.user.plugins ? this.user.plugins.length > 0 : false
    }
    if (this.currentPage === 3) {
      return this.user.servers ? this.user.servers.length > 0 : false
    }
  }

  async mounted () {
    const response = await UserService.getUserInfo(this.$store.state.userId)
    if (response) {
      response.mods = response.mods.map((m: ModResponse) => ({ ...m, creator: response }))
      response.plugins = response.plugins.map((p: PluginResponse) => ({ ...p, creator: response }))
      response.servers = response.servers.map((s: ServerResponse) => ({ ...s, owner: response }))
      this.user = response
    }
  }
}
</script>
<style scoped lang="stylus">
.tab-nav
  cursor pointer
  .nav-link
    border-radius 15px 15px 0 0
    border white 0 solid
    transition all 0.3s ease

  .active
    font-size 24px
    background-color #181f28
    color white
.tab-content
  background-color #181f28
  border-radius 0 0 15px 15px
</style>

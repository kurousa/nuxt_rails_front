<template>
  <v-app-bar
    app
    dense
    elevation="1"
    clipped-left
    color="white"
  >
    <slot name="nav-icon" />

    <nuxt-link
      to="/"
      class="text-decoration-none"
    >
      <ui-app-logo />
    </nuxt-link>

    <ui-app-title 
      class="hidden-mobile-and-down"
    />

    <breadcrumbs
      v-if="notTopPage"
    />

    <v-spacer />
    <v-menu
      app
      offset-x
      offset-y
      max-width="200"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-icon>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-subheader>
          ログイン中のユーザー
        </v-subheader>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ $auth.user.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-subheader>
          アカウント
        </v-subheader>

        <template v-for="(menu, i) in accountMenus">
          <v-divider
            v-if="menu.divider"
            :key="`menu-divider-${i}`"
          />

          <v-list-item
            :key="`menu-list-${i}`"
            :to="{ name: menu.name }"
          >
            <v-list-item-icon class="mr-2">
              <v-icon size="22" v-text="menu.icon" />
            </v-list-item-icon>
            <v-list-item-title>
              {{ $my.pageTitle(menu.name) }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import appTitle from '../../ui/appTitle.vue'
import Breadcrumbs from '../ui/breadcrumbs.vue'
export default {
  components: { appTitle, Breadcrumbs },
  data () {
    return {
      accountMenus: [
        { name: 'account-settings', icon: 'mdi-account-cog' },
        { name: 'account-password', icon: 'mdi-lock-outline' },
        { name: 'logout', icon: 'mdi-logout-variant', divider: true }
      ]
    }
  },
  computed: {
    notTopPage () {
      return this.$route.name !== 'index'
    }
  }
}
</script>

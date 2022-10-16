<template>
  <v-app>
    <v-navigation-drawer
      v-if="$route.name !== 'index'"
      v-model="drawer"
      fixed
      app
      width="300"
      class="white drawer"
    >
      <v-list>
        <v-list-item
          v-for="(link, index) in firstSetOfLinks"
          :key="index"
          :to="link.to"
          router
          exact
          class="my-1"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon_name }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="body-2" v-text="link.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider class="my-4"></v-divider>

      <v-list>
        <v-list-item
          v-for="(link, index) in secondSetOfLinks"
          :key="index"
          :to="link.to"
          router
          exact
          class="my-1"
          @click="logout(link.name)"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon_name }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="body-2" v-text="link.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="$route.name !== 'index'" class="secondary nav-bar" flat>
      <v-spacer />
      <div class="lighter_purple mx-3">Take a tour</div>
      <v-badge dot color="error" class="mx-3" overlap>
        <v-icon class="white--text" color="primary" depressed>
          mdi-email
        </v-icon>
      </v-badge>
      <v-icon class="mx-3 lighter_purple"> mdi-bell </v-icon>
      <v-menu bottom left :offset-y="true">
        <template #activator="{ on, attrs }">
          <v-avatar class="mx-3">
            <img src="profile_pic.svg" v-on="on" v-bind="attrs" alt="John" />
          </v-avatar>
        </template>

        <v-list>
          <v-list-item>
            <v-icon class="mr-2">mdi-cog-outline</v-icon>
            <v-list-item-title>Settings </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon class="mr-2">mdi-logout</v-icon>
            <v-list-item-title>Logout </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="secondary">
      <v-container class="py-0 my-0" style="height: 100%">
        <Nuxt style="height: 100%" />
        <!-- Notification snackbar  -->
        <v-snackbar
          v-model="snackbar"
          :timeout="6000"
          color="green"
          class="py-0"
        >
          <div class="font-weight-bold subtitle-2 text-center">
            Logout Successfully
          </div>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    const firstSetOfLinks = [
      {
        name: 'Dashboard',
        icon_name: 'mdi-view-dashboard',
        to: '/dashboard',
      },
      {
        name: 'Profile',
        icon_name: 'mdi-account',
      },
      {
        name: 'Services',
        icon_name: 'mdi-toolbox-outline',
      },
      {
        name: 'Medical Records',
        icon_name: 'mdi-notebook',
      },
      {
        name: 'Care Wallet',
        icon_name: 'mdi-wallet',
      },
      {
        name: 'Messages',
        icon_name: 'mdi-chat',
      },
      {
        name: 'Resources',
        icon_name: 'mdi-semantic-web',
      },
    ]
    const secondSetOfLinks = [
      {
        name: 'Account Settings',
        icon_name: 'mdi-cog-outline',
      },
      {
        name: 'Contact Support',
        icon_name: 'mdi-card-account-phone-outline',
      },
      {
        name: 'Logout',
        icon_name: 'mdi-logout',
      },
    ]
    return {
      drawer: true,
      fixed: true,
      firstSetOfLinks,
      secondSetOfLinks,
      snackbar: false,
    }
  },
  methods: {
    async logout(name) {
      if (name === 'Logout') {
        await this.$apolloHelpers.onLogout().then(() => {
          this.$router.push('/')
          this.snackbar = true
        })
      }
    },
  },
}
</script>

<style>
.nav-bar {
  height: 100px;
  padding: 1% 0;
}
.drawer {
  padding-top: 100px;
}
.v-list .v-list-item--active {
  color: white !important;
  background-color: #2a36a4;
}
.lighter_purple {
  color: rgba(56, 47, 144, 0.6) !important;
}
</style>

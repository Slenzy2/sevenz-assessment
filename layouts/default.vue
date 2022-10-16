<template>
  <v-app>
    <v-navigation-drawer
      v-if="$route.name !== 'index'"
      v-model="drawer"
      fixed
      :mobile-breakpoint="770"
      app
      width="260"
      class="white drawer"
    >
      <v-list>
        <v-list-item
          v-for="(link, index) in first"
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
      <v-divider class="my-4"></v-divider>

      <v-list>
        <v-list-item
          v-for="(link, index) in second"
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

    <v-app-bar
      v-if="$route.name !== 'index'"
      class="secondary navigation_bar"
      flat
      :app="mobile ? true : false"
      :elevation="mobile ? 4 : ''"
    >
      <v-btn class="text-capitalize hamburger" depressed @click="drawer = true">
        <v-icon color="primary">mdi-menu</v-icon>
      </v-btn>
      <v-spacer />
      <div class="lighter_purple mx-3 hide_items">Take a tour</div>
      <v-badge dot color="error" class="mx-3 hide_items" overlap>
        <v-icon class="white--text" color="primary" depressed>
          mdi-email
        </v-icon>
      </v-badge>
      <v-icon class="mx-3 lighter_purple hide_items"> mdi-bell </v-icon>
      <v-menu bottom left :offset-y="true">
        <template #activator="{ on, attrs }">
          <v-avatar class="mx-3">
            <img
              src="profile_pic.svg"
              alt="user profile pic"
              v-bind="attrs"
              v-on="on"
            />
          </v-avatar>
        </template>

        <v-list>
          <v-list-item>
            <v-icon class="mr-2">mdi-cog-outline</v-icon>
            <v-list-item-title>Settings </v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout(`Logout`)">
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
          :timeout="2500"
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
import firstSetOfLinks from '../Utils/firstSetOfLinks'
import secondSetOfLinks from '../Utils/secondSetOfLinks'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: true,
      fixed: true,
      first: firstSetOfLinks,
      second: secondSetOfLinks,
      snackbar: false,
      mobile: window.innerWidth <= '770',
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
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,700&display=swap');

.navigation_bar {
  height: 100px;
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
.hamburger {
  display: none;
}
@media screen and (max-width: 770px) {
  .hamburger {
    display: block;
  }
  .hide_items {
    display: none;
  }
}
</style>

<template>
  <div class="homepage">
    <div class="card text-center">
      <div class="animate__animated animate__fadeInDownBig">
        <h2 class="primary--text">SEVENZ HEALTHCARE</h2>

        <p class="welcome_text">
          Welcome to the
          <span class="primary--text">SEVENZ HEALTHCARE</span> medical record
          dashboard.
        </p>

        <p>
          You are to click the button below for an automatic authentication to
          your dashboard
        </p>

        <v-row class="px-5 mt-3">
          <v-spacer />
          <v-btn
            depressed
            :large="true"
            class="my-4 font-weight-bold"
            color="primary"
            :loading="load"
            @click="signIn"
          >
            Login
          </v-btn>

          <v-spacer />
        </v-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApolloHelpers } from '@nuxtjs/apollo/types/index'
import login from '../gql/queries/auth.gql'
export default Vue.extend({
  name: 'IndexPage',
  data() {
    const apolloHelpers: any = this.$apolloHelpers
    const load: boolean = false
    return {
      apolloHelpers,
      load,
    }
  },
  methods: {
    async signIn() {
      if (!this.apolloHelpers.getToken()) {
        this.load = true
        const res = await this.$apollo
          .mutate({
            mutation: login,
            variables: {
              email: 'tester@kompletecare.com',
              password: 'password',
            },
          })
          .then((data) => {
            return data.data.login
          })
        await this.apolloHelpers.onLogin(res)
        if (res) {
          this.$router.push('/dashboard')
        }
        this.load = false
      } else {
        this.$router.push('/dashboard')
      }
    },
  },
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');

.homepage {
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  font-family: 'Lato', sans-serif;
}
.card {
  width: 60%;
  /* height: 60%; */
  border-radius: 25px;
  margin: auto;
  padding: 5%;
  display: grid;
  align-items: center;
  background: white;
  border: 6px solid rgb(42, 54, 164, 0.8) !important;
}
.card h2 {
  font-size: 2rem;
  margin: 3% 0;
}
.card .welcome_text {
  font-weight: 400;
  font-size: 1.2rem;
}
span {
  font-weight: 900;
}

.v-btn {
  border-radius: 7px !important;
}

.card .v-btn {
  width: 30%;
}
</style>

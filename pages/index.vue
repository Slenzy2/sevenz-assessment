<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="12">
      <v-card class="white main" flat>
        <div class="primary--text text-center display-1 my-5 font-weight-bold">
          WELCOME TO SEVENZ HEALTHCARE
        </div>

        <v-row class="px-5">
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
      </v-card>
    </v-col>
  </v-row>
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

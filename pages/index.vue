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
            @click="signIn"
            large
            color="primary"
            class="my-4 font-weight-bold"
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
// import gql from 'graphql-tag'
import login from '../gql/queries/auth.gql'
export default Vue.extend({
  name: 'IndexPage',
  methods: {
    async signIn() {
      await this.$apollo
        .mutate({
          mutation: login,
          variables: {
            email: 'tester@kompletecare.com',
            password: 'password',
          },
        })
        .then((data) => {
          console.log(data)
        })
    },
  },
})
</script>

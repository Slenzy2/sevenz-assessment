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

        <p class="more_text">
          You are to click the button below for an automatic authentication to
          your dashboard
        </p>

        <v-row class="px-5 mt-3">
          <v-spacer />
          <v-btn
            depressed
            :large="true"
            class="my-4 font-weight-bold login_btn"
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
.homepage {
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  font-family: 'Lato', sans-serif;
}
.card {
  width: 60%;
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

@media screen and (max-width: 1260px) {
  .card {
    width: 75%;
  }
}

@media screen and (max-width: 720px) {
  .card {
    width: 87%;
    border: 4px solid rgb(42, 54, 164, 0.8) !important;
  }
  .card h2 {
    font-size: 1.55rem;
  }
  .card .welcome_text {
    font-size: 1.1rem;
  }
}

@media screen and (max-width: 510px) {
  .card {
    border: 4px solid rgb(42, 54, 164, 0.8) !important;
    padding: 8% 4%;
  }
  .card h2 {
    font-size: 1.4rem;
    margin: 5% 0;
  }
  .card .welcome_text {
    font-size: 1.1rem;
    margin: 6% 0;
  }
  .login_btn {
    font-size: 0.8rem !important;
    height: 38px !important;
    width: 40% !important;
  }
}

@media screen and (max-width: 400px) {
  .card h2 {
    font-size: 1.25rem;
  }
  .card .welcome_text {
    font-size: 0.97rem;
    margin: 7% 0;
  }
  .more_text {
    font-size: 0.87rem;
  }
  .card {
    width: 95%;
    border: 2px solid rgb(42, 54, 164, 0.8) !important;
    padding: 10% 3%;
  }
  .login_btn {
    font-size: 0.7rem !important;
    height: 34px !important;
    width: 45% !important;
  }
}
</style>

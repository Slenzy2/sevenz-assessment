<template>
  <v-row justify="center" class="category">
    <v-col cols="12" sm="8" md="11">
      <h1 class="primary--text font-weight-normal">
        Update Patient Medical Record
      </h1>
      <div class="grey--text caption my-3">
        Click the tabs to view and edit patient medical details
      </div>
      <v-card class="white records_card mt-5" flat>
        <div class="headline py-4 px-5">
          <div
            v-for="n in 2"
            v-show="!data && skeleton === true"
            :key="n.id"
            class="category"
          >
            <v-skeleton-loader
              v-model="skeleton"
              style="width: 60%"
              type="list-item"
            ></v-skeleton-loader>

            <div class="checkbox_cont">
              <v-skeleton-loader
                v-for="skel in 9"
                :key="skel.id"
                v-model="skeleton"
                type="list-item"
              ></v-skeleton-loader>
            </div>
            <v-divider class="my-4"></v-divider>
          </div>

          <div v-for="item in data" :key="item.id" class="category">
            <h5 class="primary--text">{{ item.name }}</h5>

            <div class="checkbox_cont">
              <v-checkbox
                v-for="investigations in item.data"
                v-show="data"
                :key="investigations.id"
                v-model="selected"
                :label="investigations.title"
                :value="investigations.id"
                class="checkbox"
              ></v-checkbox>
            </div>

            <v-divider class="my-4"></v-divider>
          </div>
        </div>
        <v-form class="grey--text">
          <v-container>
            <v-row align="center">
              <v-col class="" cols="6">
                <div class="my-2">CT Scan</div>
                <v-select
                  v-model="ctscanSelection"
                  :items="ctscan"
                  placeholder="*Specify"
                  outlined
                ></v-select>
              </v-col>
              <v-col class="" cols="6">
                <div class="my-2">MRI</div>
                <v-select
                  v-model="mriSelection"
                  :items="mri"
                  placeholder="*Specify"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-row class="px-5">
          <v-spacer />
          <v-btn
            class="text-capitalize"
            depressed
            color="primary"
            :loading="load"
            @click="createMedicalRecord"
          >
            Save and Send
          </v-btn>
        </v-row>
      </v-card>
    </v-col>

    <!-- Success Dialog  -->
    <v-dialog v-model="successDialog" width="500">
      <v-card>
        <v-card-title class="text-h6 secondary lighten-2 primary--text">
        </v-card-title>
        <v-img
          src="hospital.jpg"
          class="heart animate__animated animate__pulse animate__repeat-2"
        ></v-img>

        <v-card-text class="text-h6 text-center">
          Congratulations, your medical record has been successfully updated on
          the database
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            class="primary my-2"
            text
            @click="successDialog = false"
          >
            Continue
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Notification snackbar  -->
    <v-snackbar v-model="snackbar" :timeout="4000" color="red" class="py-0">
      <div class="font-weight-bold subtitle-2 text-center">
        Please make the necesary selections
      </div>
    </v-snackbar>
  </v-row>
</template>

<script>
import investigations from '../gql/queries/investigations.gql'
import addMedicalRecord from '../gql/queries/createRecord.gql'
export default {
  name: 'DashboardPage',
  data() {
    return {
      snackbar: false,
      successDialog: false,
      skeleton: true,
      load: false,
      selected: [],
      ctscan: [
        'Scan needed in the left cerebral hemisphere',
        'Scan needed for the abdomen',
        'Scan needed for feet muscle',
      ],
      mri: ['Full body MRI', 'Full leg MRI', 'Full arm MRI'],
      ctscanSelection: '',
      mriSelection: '',
      data: null,
      investigation: investigations,
      createRecord: addMedicalRecord,
    }
  },

  async mounted() {
    await this.$apollo
      .query({
        query: this.investigation,
      })
      .then((data) => {
        this.data = data.data.investigations
        this.skeleton = false
        const arr1 = []
        const arr2 = []
        this.data.forEach((item) => {
          if (item.type.id === '1') {
            arr1.push(item)
          }
          if (item.type.id === '2') {
            arr2.push(item)
          }
        })
        this.data = [
          { name: 'X-Ray', data: arr1 },
          { name: 'Ultrasound Scan', data: arr2 },
        ]
      })
  },
  methods: {
    createMedicalRecord() {
      if (
        this.selected !== [] &&
        this.ctscanSelection !== '' &&
        this.mriSelection !== ''
      ) {
        this.load = true
        this.$apollo
          .mutate({
            mutation: this.createRecord,
            variables: {
              investigations: this.selected,
              ctscan: this.ctscanSelection,
              mri: this.mriSelection,
              developer: 'Developer',
            },
          })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .then(({ data }) => {
            this.successDialog = true
            this.selected = []
            this.ctscanSelection = ''
            this.mriSelection = ''
            this.load = false
          })
      } else {
        this.snackbar = true
      }
    },
  },
}
</script>

<style>
.records_card {
  padding: 2% 5% 5%;
}
.category {
  width: 100%;
}
.checkbox_cont {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.checkbox .v-label {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
}
.heart {
  width: 40%;
  border-radius: 50%;
  text-align: center;
  margin: 3% auto;
}
</style>

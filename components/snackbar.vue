<template>
  <v-snackbar v-model="mode" :timeout="6000" color="red" class="py-0">
    <div class="font-weight-bold subtitle-2">
      Please make the necesary selections
    </div>
    <template #action="{ attrs }">
      <v-btn rounded color="white" text v-bind="attrs" @click="mode = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SnackBar',
  props: {
    message: {
      type: String,
      required: true,
      default: '',
    },
    mode: {
      type: String,
      required: true,
    },
  },
})
</script>

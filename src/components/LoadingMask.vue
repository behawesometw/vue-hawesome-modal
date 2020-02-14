<template>
  <v-dialog v-model="isGlobalLoading" persistent width="300">
    <v-card class="pa-0">
      <v-card-text class="pa-5 text-center">
        {{maskText}}
        <v-progress-linear class="mt-2" height="10" indeterminate color="info"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    maskText() {
      return this.$store.state.loadingMask.maskText;
    },
    ...mapGetters({
      isGlobalLoading: "waitingCount/isGlobalLoading"
    })
  }
};
</script>
<template>
  <v-dialog v-model="isGlobalLoading" persistent width="300" hide-overlay>
    <v-card class="pa-0">
      <v-card-text class="pa-5 text-center">
        {{loaderText}}
        <v-progress-linear class="mt-2" height="10" indeterminate :color="color"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    color() {
      return this.$store.state.theme.color;
    },
    loaderText() {
      return this.$store.state.loader.loaderText;
    },
    ...mapGetters({
      isGlobalLoading: "waitingCount/isGlobalLoading"
    })
  }
};
</script>
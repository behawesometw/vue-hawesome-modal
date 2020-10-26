<template>
  <v-dialog
    v-model="isHGlobalLoading"
    persistent
    overlay-opacity
    :width="width"
  >
    <v-card class="h-loader pa-0">
      <v-card-text class="pa-5 text-center">
        <span v-text="loaderText"></span>
        <v-progress-circular
          v-if="isCircular"
          class="d-block mx-auto"
          :class="{ 'mt-2': hasLoaderText }"
          indeterminate
          :color="hGlobalThemeColor"
        ></v-progress-circular>
        <v-progress-linear
          v-else
          :class="{ 'mt-2': hasLoaderText }"
          height="10"
          indeterminate
          :color="hGlobalThemeColor"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    loaderText() {
      return this.$store.state.hLoader.loaderText.trim();
    },
    isCircular() {
      return this.$store.state.hLoader.globalSetting.type === "circular";
    },
    isBindingWithWaitingCount() {
      return this.$store.state.hLoader.globalSetting.isBindingWithWaitingCount;
    },
    isGlobalLoading() {
      return this.$store.getters["hWaitingCount/isGlobalLoading"];
    },
    hasLoaderText() {
      return this.loaderText.length > 0;
    },
    isHGlobalLoading() {
      return this.isBindingWithWaitingCount && this.isGlobalLoading;
    },
    width() {
      return this.isCircular ? 200 : 300;
    },
  },
};
</script>
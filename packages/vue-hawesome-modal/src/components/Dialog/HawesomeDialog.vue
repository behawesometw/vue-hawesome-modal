<template>
  <v-dialog
    scrollable
    :overlay-opacity="config.withOverlay ? '0.5' : '0.01'"
    persistent
    v-model="config.isShow"
    :width="config.width"
  >
    <v-card class="h-dialog" min-width="200">
      <v-toolbar dark dense flat :color="dialogToolBarColor">
        <v-toolbar-title>{{config.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark v-if="config.isShowCancelBtn" @click="config.reject()">
          <v-icon v-text="$vuetify.icons.values.close"></v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-5" v-html="config.content"></v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="h-dialog-cancel-btn text-truncate"
          width="50%"
          v-if="config.isShowCancelBtn"
          :color="config.cancelBtnColor"
          text
          @click="config.reject()"
        >{{config.cancelBtnTxt}}</v-btn>
        <v-btn
          class="h-dialog-confirm-btn text-truncate"
          width="50%"
          v-if="config.isShowConfirmBtn"
          :color="config.confirmBtnColor || globalThemeColor"
          text
          @click="config.resolve()"
        >{{config.confirmBtnTxt}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    dialogToolBarColor() {
      return this.$vuetify.theme.dark
        ? ""
        : this.config.titleBarColor || this.globalThemeColor;
    },
    config() {
      return this.$store.state.hDialog.config;
    },
    globalThemeColor() {
      return this.$store.state.hTheme.color;
    },
  },
};
</script>

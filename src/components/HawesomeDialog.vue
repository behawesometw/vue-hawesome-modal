<template>
  <v-dialog
    hide-overlay
    persistent
    v-model="config.isShow"
    :max-width="config.maxWidth"
    :max-height="config.maxHeight"
    :fullscreen="config.fullscreen"
  >
    <v-card>
      <v-toolbar dark dense flat :color="config.toolbarColor || globalThemeColor">
        <v-toolbar-title>{{config.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark v-if="config.isShowCancelBtn" @click="config.reject()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-5" v-html="config.content"></v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="config.isShowCancelBtn"
          :color="config.cancelBtnColor"
          text
          @click="config.reject()"
        >{{config.cancelBtnTxt}}</v-btn>
        <v-btn
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
    config() {
      return this.$store.state.dialog.config;
    },
    globalThemeColor() {
      return this.$store.state.theme.color;
    }
  }
};
</script>

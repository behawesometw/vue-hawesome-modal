<template>
  <v-app>
    <HawesomeLoader></HawesomeLoader>
    <HawesomeDialog></HawesomeDialog>
    <HawesomeNotify></HawesomeNotify>

    <v-tabs centered grow :color="globalThemeColor">
      <v-tab>dialog</v-tab>
      <v-tab>lodaer</v-tab>
      <v-tab>notify</v-tab>

      <v-tab-item>1</v-tab-item>
      <v-tab-item>2</v-tab-item>
      <v-tab-item>3</v-tab-item>
    </v-tabs>
    <v-combobox
      label="select color"
      v-model="colorSelect"
      :items="colorItems"
      @change="colorSelectChange"
    ></v-combobox>

    <v-btn class="d-block mt-5" @click="loaderTest">loader test</v-btn>
    <v-btn class="d-block mt-5" @click="dialogTest">dialog test</v-btn>
    <v-btn class="d-block mt-5" @click="notiTest">noti test</v-btn>
  </v-app>
</template>

<script>
// todo: 寫 readme.md 並調整程式碼到更適合的情境

import DialogConfigBuilder from "../lib/dialog/dialogConfigBuilder";
import NotifyConfigBuilder from "../lib/notify/notifyConfigBuilder";
export default {
  data: () => ({
    colorSelect: "primary",
    colorItems: ["primary", "error", "success"]
  }),
  computed: {
    globalThemeColor() {
      return this.$store.state.theme.color;
    }
  },
  methods: {
    colorSelectChange() {
      this.$store.commit("theme/setColor", this.colorSelect);
    },
    loaderTest() {
      this.$loader.on();
      setTimeout(() => {
        this.$loader.off();
      }, 2000);
    },
    dialogTest() {
      var that = this;
      that.$dialog
        .talk("chainable testing")
        .then(() => {
          var builder = new DialogConfigBuilder("chaining")
            .set("confirmBtnTxt", "success")
            .set("themeColor", "purple")
            .set("isShowCancelBtn", false);
          return that.$dialog.talk(builder);
        })
        .then(() => {
          console.log("confirm!!");
        })
        .catch(() => {
          console.log("cancel!!");
        })
        .finally(that.$dialog.hangUp);
    },
    notiTest() {
      this.$notify.info("info");

      this.$notify.push(
        new NotifyConfigBuilder("success").setTimeout(1).setType("success")
      );

      this.$notify.push(
        new NotifyConfigBuilder("warning").setTimeout(3).setType("warning")
      );

      this.$notify.push(
        new NotifyConfigBuilder("error").setTimeout(4).setType("error")
      );

      setTimeout(() => {
        this.$notify.promise("success", "info").then(() => {
          console.log("done");
        });
      }, 2000);
    }
  }
};
</script>

<style>
</style>
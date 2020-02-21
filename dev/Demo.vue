<template>
  <v-app>
    <div class="ma-auto">
      <HawesomeLoader />
      <HawesomeDialog />
      <v-combobox
        label="select color"
        v-model="colorSelect"
        :items="colorItems"
        @change="colorSelectOnChange"
      ></v-combobox>
      <v-btn class="d-block mt-5" @click="loaderTest">loader test</v-btn>
      <v-btn class="d-block mt-5" @click="dialogTest">dialog test</v-btn>
    </div>
  </v-app>
</template>

<script>
import DialogConfigBuilder from "../lib/dialog/dialogConfigBuilder";
export default {
  data: () => ({
    colorSelect: "primary",
    colorItems: ["primary", "error"]
  }),
  methods: {
    colorSelectOnChange() {
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
          console.log("confirm");
        })
        .catch(() => {
          console.log("cancel");
        })
        .finally(that.$dialog.hangUp);
    }
  }
};
</script>

<style>
</style>
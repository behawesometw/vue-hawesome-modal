<template>
  <v-app>
    <HawesomeLoader />
    <HawesomeDialog />
    <HawesomeNotify />
    <div class="ma-auto">
      <v-combobox
        label="select color"
        v-model="colorSelect"
        :items="colorItems"
        @change="colorSelectChange"
      ></v-combobox>
      <v-btn class="d-block mt-5" @click="loaderTest">loader test</v-btn>
      <v-btn class="d-block mt-5" @click="dialogTest">dialog test</v-btn>
      <v-btn class="d-block mt-5" @click="notiTest">noti test</v-btn>
    </div>
  </v-app>
</template>

<script>
// todo: notify 漸變
// todo: 寫 readme.md 並調整程式碼到更適合的情境

import DialogConfigBuilder from "../lib/dialog/dialogConfigBuilder";
// import NotifyConfigBuilder from "../lib/notify/notifyConfigBuilder";
export default {
  data: () => ({
    colorSelect: "primary",
    colorItems: ["primary", "error", "success"]
  }),
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
      // this.$notify.info(
      //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, dolorem!"
      // );

      // var builder = new NotifyConfigBuilder(
      //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, dolorem!"
      // )
      //   .setTimeout(5)
      //   .setType("success");
      // this.$notify._push(builder);

      // setTimeout(() => {
      //   this.$notify
      //     .promise(
      //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, dolorem!",
      //       "success"
      //     )
      //     .then(() => {
      //       console.log("promised!!");
      //     });
      // }, 1000);

      // setTimeout(() => {
      //   this.$notify.warning(
      //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, dolorem!"
      //   );
      // }, 2000);
      this.$notify.promise("1", "success");
      this.$notify.promise("2", "success");
      this.$notify.promise("3", "success");
    }
  }
};
</script>

<style>
</style>
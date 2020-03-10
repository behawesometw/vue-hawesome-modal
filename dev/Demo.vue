<template>
  <v-app>
    <HawesomeLoader></HawesomeLoader>
    <HawesomeDialog></HawesomeDialog>
    <HawesomeNotify></HawesomeNotify>
    <!-- 

    <v-btn class="d-block mt-5" @click="loaderTest">loader test</v-btn>
    <v-btn class="d-block mt-5" @click="dialogTest">dialog test</v-btn>
    <v-btn class="d-block mt-5" @click="notiTest">noti test</v-btn>

    -->

    <v-card height="100%">
      <v-toolbar :color="globalThemeColor" dark>
        <v-toolbar-title>Hawesome-vue-extends</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu :close-on-content-click="false" :nudge-width="200" offset-x>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-palette</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-combobox
                  label="select color"
                  v-model="colorSelect"
                  :items="colorItems"
                  @change="colorSelectChange"
                ></v-combobox>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <template v-slot:extension>
          <v-tabs class="white" :color="globalThemeColor" dark v-model="tab" grow>
            <v-tab v-for="(component, index) in demoComponents" :key="index">{{ component }}</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(component, index) in demoComponents" :key="index">
          <div class="tab-item-wrapper">
            <v-container fill-height>
              <v-row justify="center" align="center">
                <component v-bind:is="`${component}Demo`"></component>
              </v-row>
            </v-container>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
// todo: 寫 readme.md 並調整程式碼到更適合的情境

import Vue from "vue";

import DialogDemo from "./components/DialogDemo";
import LoaderDemo from "./components/LoaderDemo";
import NotifyDemo from "./components/NotifyDemo";

Vue.component("DialogDemo", DialogDemo);
Vue.component("LoaderDemo", LoaderDemo);
Vue.component("NotifyDemo", NotifyDemo);

import DialogConfigBuilder from "../lib/dialog/dialogConfigBuilder";
import NotifyConfigBuilder from "../lib/notify/notifyConfigBuilder";
export default {
  data: () => ({
    colorSelect: "primary",
    colorItems: ["primary", "error", "success"],
    tab: null,
    demoComponents: ["Dialog", "Loader", "Notify"]
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
.tab-item-wrapper {
  height: calc(100vh - 104px);
}
.v-tab.v-tab {
  color: inherit !important;
}
</style>
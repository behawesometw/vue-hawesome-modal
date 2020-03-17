<template>
  <v-app>
    <HawesomeLoader />
    <HawesomeDialog />
    <HawesomeNotify />

    <!-- <v-btn class="d-block mt-5" @click="dialogTest">dialog test</v-btn> -->

    <v-card flat>
      <v-toolbar :color="globalThemeColor" dark>
        <v-toolbar-title class="userSelect-none">hawesome-vue-extends</v-toolbar-title>

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
                <v-select
                  label="select a color"
                  v-model="colorInput"
                  :items="colorItems"
                  :color="globalThemeColor"
                  @blur="colorInputBlur"
                ></v-select>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-item>
                <v-color-picker
                  v-model="colorPick"
                  hide-mode-switch
                  hide-canvas
                  flat
                  @input="colorPickChange"
                ></v-color-picker>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <template v-slot:extension>
          <v-tabs class="white" :color="globalThemeColor" dark v-model="tab" grow>
            <v-tab v-for="(item, index) in demoComponents" :key="index">{{ item.tabName }}</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(item, index) in demoComponents"
          :key="index"
          class="tab-item-full-height"
        >
          <component v-bind:is="`${item.component}`"></component>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
// todo: 元件 demo 頁
// todo: 寫 readme.md

import Vue from "vue";
import GetStartedDemo from "./components/GetStartedDemo";
import DialogDemo from "./components/DialogDemo";
import NotifyDemo from "./components/NotifyDemo";
import LoaderDemo from "./components/LoaderDemo";

Vue.component("GetStartedDemo", GetStartedDemo);
Vue.component("DialogDemo", DialogDemo);
Vue.component("NotifyDemo", NotifyDemo);
Vue.component("LoaderDemo", LoaderDemo);

export default {
  data: () => ({
    colorInput: "primary",
    colorItems: ["primary", "info", "success", "error", "warning", "black"],
    colorPick: "#1976d2FF",
    tab: null,
    demoComponents: [
      { tabName: "Get Started", component: "GetStartedDemo" },
      { tabName: "Dialog", component: "DialogDemo" },
      { tabName: "Notify", component: "NotifyDemo" },
      { tabName: "Loader", component: "LoaderDemo" }
    ]
  }),
  computed: {
    globalThemeColor() {
      return this.$store.state.theme.color;
    }
  },
  methods: {
    colorInputBlur() {
      if (this.colorInput) {
        this.$store.commit("theme/setColor", this.colorInput);
      }
    },
    colorPickChange() {
      if (this.colorPick) {
        this.$store.commit("theme/setColor", this.colorPick);
      }
    },
    dialogTest() {
      var that = this;
      that.$dialog
        .talk("chainable testing")
        .then(() => {
          return that.$dialog.talk("chaining", builder => {
            builder
              .set("confirmBtnTxt", "success")
              .set("themeColor", "purple")
              .set("isShowCancelBtn", false);
          });
        })
        .then(() => {
          console.log("confirm!!");
        })
        .catch(() => {
          console.log("cancel!!");
        })
        .finally(that.$dialog.hangUp);
    }
  }
};
</script>

<style>
.tab-item-full-height {
  height: calc(100vh - 115px);
}

.v-tab {
  text-transform: none !important;
}
.v-tab.v-tab {
  color: inherit !important;
}

.userSelect-none {
  user-select: none;
}
</style>
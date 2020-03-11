<template>
  <v-app>
    <HawesomeLoader></HawesomeLoader>
    <HawesomeDialog></HawesomeDialog>
    <HawesomeNotify></HawesomeNotify>

    <!-- <v-btn class="d-block mt-5" @click="dialogTest">dialog test</v-btn> -->

    <v-card height="100%">
      <v-toolbar :color="globalThemeColor" dark>
        <v-toolbar-title>hawesome-vue-extends</v-toolbar-title>

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
                  label="select/type a color(or theme)"
                  v-model="colorInput"
                  :items="colorItems"
                  @change="colorInputChange"
                ></v-combobox>
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
// todo: 寫 readme.md
// todo: rwd consider

import Vue from "vue";

import DialogDemo from "./components/DialogDemo";
import LoaderDemo from "./components/LoaderDemo";
import NotifyDemo from "./components/NotifyDemo";

Vue.component("DialogDemo", DialogDemo);
Vue.component("LoaderDemo", LoaderDemo);
Vue.component("NotifyDemo", NotifyDemo);

export default {
  data: () => ({
    colorInput: "primary",
    colorItems: ["primary", "error", "success"],
    colorPick: "#1976d2FF",
    tab: null,
    demoComponents: ["Dialog", "Loader", "Notify"]
  }),
  computed: {
    globalThemeColor() {
      return this.$store.state.theme.color;
    }
  },
  methods: {
    colorInputChange() {
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
.tab-item-wrapper {
  height: calc(100vh - 104px);
}
.v-tab.v-tab {
  color: inherit !important;
}
</style>
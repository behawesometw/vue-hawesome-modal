<template>
  <v-app>
    <HawesomeLoader />
    <HawesomeDialog />
    <HawesomeNotify />

    <v-card flat>
      <v-toolbar :color="globalThemeColor" dark>
        <v-toolbar-title class="userSelect-none">hawesome-vue-extends</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu :close-on-content-click="false" :nudge-width="200" offset-x left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-cog</v-icon>
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
            <div v-if="$vuetify.breakpoint.xs">
              <v-divider></v-divider>
              <v-list>
                <v-list-item>
                  <v-switch v-model="isEnableTabSwipe" label="enable tab swipe"></v-switch>
                </v-list-item>
              </v-list>
            </div>
          </v-card>
        </v-menu>

        <template v-slot:extension>
          <v-tabs class="white" :color="globalThemeColor" dark v-model="tab" grow>
            <v-tab v-for="(item, index) in demoComponents" :key="index">{{ item.tabName }}</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab" :touchless="!isEnableTabSwipe">
        <v-tab-item
          v-for="(item, index) in demoComponents"
          :key="index"
          class="tab-item-full-height"
        >
          <!-- todo : https://vuetifyjs.com/en/components/lazy/ -->
          <component v-bind:is="`${item.component}`"></component>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
// todo: vali
// todo: dialog 當兩個都是按鈕都不顯示時
// todo: 元件 demo 頁
// todo: 寫 readme.md

import Vue from "vue";
import GetStartedDemo from "./components/GetStartedDemo";
import DialogDemo from "./components/DialogDemo";
import NotifyDemo from "./components/NotifyDemo";
import LoaderDemo from "./components/LoaderDemo";

import CodeBlockBase from "./components/Common/CodeBlock/CodeBlockBase";
import ExampleCodeBlock from "./components/Common/CodeBlock/ExampleCodeBlock";
import GlobalSettingCodeBlock from "./components/Common/CodeBlock/GlobalSettingCodeBlock";

import AllExpandedPanelScope from "./components/Common/Layout/Panel/AllExpandedPanelScope";
import ColorResponsiveExpansionPanel from "./components/Common/Layout/Panel/ColorResponsiveExpansionPanel";

Vue.component("GetStartedDemo", GetStartedDemo);
Vue.component("DialogDemo", DialogDemo);
Vue.component("NotifyDemo", NotifyDemo);
Vue.component("LoaderDemo", LoaderDemo);

Vue.component("AllExpandedPanelScope", AllExpandedPanelScope);
Vue.component("ColorResponsiveExpansionPanel", ColorResponsiveExpansionPanel);

Vue.component("CodeBlockBase", CodeBlockBase);
Vue.component("ExampleCodeBlock", ExampleCodeBlock);
Vue.component("GlobalSettingCodeBlock", GlobalSettingCodeBlock);

export default {
  data: () => ({
    colorInput: "primary",
    colorPick: "#1976d2FF",
    isEnableTabSwipe: true,
    tab: 1,
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
    },
    colorItems() {
      return this.$store.state.colorItems;
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
    }
  }
};
</script>

<style>
.tab-item-full-height {
  height: calc(100vh - 115px);
}

.userSelect-none {
  user-select: none;
}

.v-tab {
  text-transform: none !important;
}
.v-tab.v-tab {
  color: inherit !important;
}

.v-slide-group__prev {
  display: none !important;
}
</style>
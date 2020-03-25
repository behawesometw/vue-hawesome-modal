<template>
  <v-app>
    <HawesomeLoader />
    <HawesomeDialog />
    <HawesomeNotify />

    <v-card flat>
      <v-toolbar :color="toolbarColor" :dark="!$vuetify.theme.dark">
        <v-toolbar-title class="userSelect-none">hawesome-vue-extends</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="darkThemeToggle">
          <v-icon>mdi-invert-colors</v-icon>
        </v-btn>
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
            <v-divider></v-divider>
            <v-list>
              <v-list-item>
                <v-switch
                  :color="globalThemeColor"
                  v-model="isEnablePanelExpandable"
                  label="panel expandable"
                ></v-switch>
              </v-list-item>
            </v-list>
            <div v-if="$vuetify.breakpoint.xs">
              <v-divider></v-divider>
              <v-list>
                <v-list-item>
                  <v-switch :color="globalThemeColor" v-model="isEnableTabSwipe" label="tab swipe"></v-switch>
                </v-list-item>
              </v-list>
            </div>
          </v-card>
        </v-menu>
      </v-toolbar>

      <v-tabs v-model="tabSync" :color="globalThemeColor" grow>
        <v-tab v-for="(tab, index) in tabs" :key="index" :to="tab.path">{{ tab.tabName }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabSync" @change="updateRouter($event)" :touchless="!isEnableTabSwipe">
        <v-tab-item v-for="(tab, index) in tabs" :key="index" :value="tab.path">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
// todo: 寫 readme.md

import Vue from "vue";

import CodeBlockBase from "./components/Common/CodeBlock/CodeBlockBase";
import ExampleCodeBlock from "./components/Common/CodeBlock/ExampleCodeBlock";
import GlobalSettingCodeBlock from "./components/Common/CodeBlock/GlobalSettingCodeBlock";

import AllExpandedPanelScope from "./components/Common/Layout/Panel/AllExpandedPanelScope";
import ColorResponsiveExpansionPanel from "./components/Common/Layout/Panel/ColorResponsiveExpansionPanel";

Vue.component("AllExpandedPanelScope", AllExpandedPanelScope);
Vue.component("ColorResponsiveExpansionPanel", ColorResponsiveExpansionPanel);

Vue.component("CodeBlockBase", CodeBlockBase);
Vue.component("ExampleCodeBlock", ExampleCodeBlock);
Vue.component("GlobalSettingCodeBlock", GlobalSettingCodeBlock);

export default {
  data: () => ({
    tabSync: null,
    colorInput: "primary",
    colorPick: "#1976d2FF",
    isEnableTabSwipe: false,
    tabs: [
      { tabName: "Get Started", path: "/getStarted" },
      { tabName: "Dialog", path: "/dialog" },
      { tabName: "Notify", path: "/notify" },
      { tabName: "Loader", path: "/loader" },
      { tabName: "Tutorial", path: "/tutorial" }
    ]
  }),
  computed: {
    toolbarColor() {
      return this.$vuetify.theme.dark ? "" : this.globalThemeColor;
    },
    isEnablePanelExpandable: {
      get() {
        return this.$store.state.isEnablePanelExpandable;
      },
      set(value) {
        this.$store.commit("updateIsEnablePanelExpandable", value);
      }
    },
    globalThemeColor() {
      return this.$store.state.theme.color;
    },
    colorItems() {
      return this.$store.state.colorItems;
    }
  },
  methods: {
    updateRouter(val) {
      this.$router.push(val);
    },
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
    darkThemeToggle() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

      var prismDefaultTheme = document.getElementById("_prismDefaultTheme");
      prismDefaultTheme.disabled = this.$vuetify.theme.dark;
    }
  }
};
</script>

<style>
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
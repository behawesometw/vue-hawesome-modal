<template>
  <v-app>
    <h-dialog />
    <h-notify />
    <h-loader />

    <v-app-bar app :color="toolbarColor" :dark="!$vuetify.theme.dark">
      <div
        class="userSelect-none"
        :class="[titleColorClass, $vuetify.breakpoint.xs ? 'text-subtitle-1 font-weight-bold' : 'title']"
        :style="titleColorStyle"
      >{{packageName}}</div>

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

      <v-menu transition="slide-y-transition" v-if="isTgrScrollThreshold">
        <template #activator="{ on }">
          <v-btn fab icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(item, i) in tabs" :key="i" @click="onRouteMenuClick(item.path)">
              <v-list-item-title>{{ item.tabName }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <template #extension v-if="!isTgrScrollThreshold">
        <v-tabs
          v-model="tabSync"
          grow
          :color="globalThemeColor"
          :background-color="$vuetify.theme.dark ? 'grey darken-4' : 'white'"
        >
          <v-tab v-for="(tab, index) in tabs" :key="index" :to="tab.path">{{ tab.tabName }}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-tabs-items v-model="tabSync" @change="updateRouter($event)" :touchless="!isEnableTabSwipe">
        <v-tab-item v-for="(tab, index) in tabs" :key="index" :value="tab.path">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </v-tab-item>
      </v-tabs-items>
    </v-main>
    <transition name="fab-transition">
      <v-speed-dial fixed bottom right v-show="isTgrScrollThreshold">
        <template v-slot:activator>
          <v-btn
            fab
            dark
            :color="globalThemeColor"
            :x-small="$vuetify.breakpoint.xs"
            @click="$vuetify.goTo(0)"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </template>
      </v-speed-dial>
    </transition>
  </v-app>
</template>

<script>
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

const packageName = require("../../package.json").name;

export default {
  mounted() {
    document.addEventListener("scroll", this.scrollDetect);
  },
  destroyed() {
    document.removeEventListener("scroll", this.scrollDetect);
  },
  data: () => ({
    packageName: packageName,
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
    ],
    isTgrScrollThreshold: false
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
    },
    titleColorStyle() {
      return this.$vuetify.theme.dark
        ? { [`color`]: this.globalThemeColor }
        : {};
    },
    titleColorClass() {
      return { [`${this.globalThemeColor}--text`]: this.$vuetify.theme.dark };
    }
  },
  methods: {
    onRouteMenuClick(path) {
      if (path !== this.$route.path) {
        this.$router.push(path);
      }
    },
    scrollDetect() {
      this.isTgrScrollThreshold = document.scrollingElement.scrollTop > 50;
    },
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
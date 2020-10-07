<template>
  <v-app>
    <h-dialog />
    <h-notify />
    <h-loader />

    <v-app-bar
      app
      :color="toolbarColor"
      :dark="!isDarkTheme"
      :extension-height="isTgrScrollThreshold ? 0 : 48"
    >
      <div
        class="userSelect-none"
        :class="[
          titleColorClass,
          isXs ? 'text-subtitle-1 font-weight-bold' : 'title',
        ]"
        :style="titleColorStyle"
      >
        {{ require("../../package.json").name }}
      </div>

      <v-spacer></v-spacer>

      <v-scroll-y-reverse-transition>
        <v-btn id="route-menu-activator" fab icon v-show="isTgrScrollThreshold">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-scroll-y-reverse-transition>
      <v-menu
        activator="#route-menu-activator"
        transition="slide-y-transition"
        bottom
        left
      >
        <v-list>
          <v-list-item-group
            :color="hGlobalThemeColor"
            :value="currentRouteIndex"
          >
            <v-list-item
              v-for="(item, i) in tabs"
              :key="i"
              @click="onRouteMenuClick(item.path)"
            >
              <v-list-item-title>{{ item.tabName }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-btn
        icon
        href="https://github.com/behawesometw/vue-hawesome-modal"
        target="_blank"
      >
        <v-icon>mdi-github</v-icon>
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
              <v-row :align="'center'">
                <v-col cols="10">
                  <v-select
                    label="select a color"
                    v-model="colorInput"
                    :items="$store.state.colorItems"
                    :color="hGlobalThemeColor"
                    @blur="colorInputBlur"
                  ></v-select>
                </v-col>
                <v-col cols="2">
                  <v-btn icon @click="darkThemeToggle">
                    <v-icon>mdi-invert-colors</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
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
                :color="hGlobalThemeColor"
                v-model="isEnablePanelExpandable"
                label="panel expandable"
              ></v-switch>
            </v-list-item>
          </v-list>
          <div v-if="isXs">
            <v-divider></v-divider>
            <v-list>
              <v-list-item>
                <v-switch
                  :color="hGlobalThemeColor"
                  v-model="isEnableTabSwipe"
                  label="tab swipe"
                ></v-switch>
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-menu>

      <template #extension>
        <v-tabs
          :class="{ 'on-light-theme': !isDarkTheme }"
          v-model="tabSync"
          grow
          :color="hGlobalThemeColor"
          :background-color="isDarkTheme ? 'grey darken-4' : 'white'"
        >
          <v-tab v-for="(tab, index) in tabs" :key="index" :to="tab.path">{{
            tab.tabName
          }}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-tabs-items
        v-model="tabSync"
        @change="updateRoute($event)"
        :touchless="!isEnableTabSwipe"
      >
        <v-tab-item v-for="(tab, index) in tabs" :key="index" :value="tab.path">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </v-tab-item>
      </v-tabs-items>
    </v-main>
    <v-fab-transition>
      <v-speed-dial fixed bottom right v-show="isTgrScrollThreshold">
        <template v-slot:activator>
          <v-btn
            fab
            dark
            :color="hGlobalThemeColor"
            :x-small="isXs"
            @click="$vuetify.goTo(0)"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </template>
      </v-speed-dial>
    </v-fab-transition>
  </v-app>
</template>

<script>
import Vue from "vue";
import { computed, provide } from "@vue/composition-api";

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

import useScrollThreshold from "./use/scrollThreshold";
import useTabControl from "./use/tabControl";
import useColorManagement from "./use/colorManagement";
import useRouteControl from "./use/routeControl";

export default {
  setup(props, context) {
    provide("$root", context.root);

    const getContext = () => context.root;

    const isXs = computed(() => getContext().$vuetify.breakpoint.xs);

    const { isTgrScrollThreshold } = useScrollThreshold();

    const {
      tabSync,
      tabs,
      currentRouteIndex,
      isEnableTabSwipe,
    } = useTabControl();

    const {
      colorInput,
      colorPick,
      colorInputBlur,
      colorPickChange,
      isDarkTheme,
      toolbarColor,
      titleColorClass,
      titleColorStyle,
      darkThemeToggle,
    } = useColorManagement();

    const { onRouteMenuClick, updateRoute } = useRouteControl(getContext);

    return {
      isXs,

      isTgrScrollThreshold,

      tabSync,
      tabs,
      currentRouteIndex,
      isEnableTabSwipe,

      colorInput,
      colorPick,
      colorInputBlur,
      colorPickChange,
      isDarkTheme,
      toolbarColor,
      titleColorClass,
      titleColorStyle,
      darkThemeToggle,

      onRouteMenuClick,
      updateRoute,
    };
  },

  computed: {
    isEnablePanelExpandable: {
      get() {
        return this.$store.state.isEnablePanelExpandable;
      },
      set(value) {
        this.$store.commit("updateIsEnablePanelExpandable", value);
      },
    },
  },
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

.v-toolbar__extension .v-tabs.on-light-theme {
  background: white;
}
</style>
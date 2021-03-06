<template>
  <v-container>
    <AllExpandedPanelScope>
      <ColorResponsiveExpansionPanel>
        <template v-slot:header>Introduction</template>
        <template v-slot:content>
          <v-row justify="center">
            <v-col md="10" cols="12">
              <v-sheet class="subtitle-1">
                <div>
                  A Vue promisify modal component plugin based on Vuetify with
                  Vuex.
                </div>
                <div>
                  Provides dialog, notification and loader for building a modern
                  website.
                </div>
                <div>
                  Using Promise API refactor modal component to provide fluent
                  experience.
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </template>
      </ColorResponsiveExpansionPanel>
      <ColorResponsiveExpansionPanel>
        <template v-slot:header>Installation</template>
        <template v-slot:content>
          <CodeBlockBase
            :codes="codeInstallPlugin"
            :lang="'bash'"
          ></CodeBlockBase>
        </template>
      </ColorResponsiveExpansionPanel>
      <ColorResponsiveExpansionPanel>
        <template v-slot:header>Usage</template>
        <template v-slot:content>
          <GlobalSettingCodeBlock
            :codes="codeToAchieveGlobalSetting"
            :preInsertSnippet="preInsertSnippet"
          ></GlobalSettingCodeBlock>
          <CodeBlockBase
            :codes="templateCodeToAchieves"
            :lang="'html'"
          ></CodeBlockBase>
        </template>
      </ColorResponsiveExpansionPanel>

      <ColorResponsiveExpansionPanel>
        <template v-slot:header>Usage for Nuxt.js</template>
        <template v-slot:content>
          <CodeBlockBase
            :codes="pluginCodeForNuxt"
            :lang="'javascript'"
          ></CodeBlockBase>
          <CodeBlockBase
            :codes="installPluginFromNuxtConfig"
            :lang="'javascript'"
          ></CodeBlockBase>
          <CodeBlockBase
            :codes="templateCodeToAchievesForNuxt"
            :lang="'html'"
          ></CodeBlockBase>
        </template>
      </ColorResponsiveExpansionPanel>
    </AllExpandedPanelScope>
  </v-container>
</template>


<script>
export default {
  computed: {
    introductionText() {
      var p = [
        "A Vue promisify modal component plugin based on Vuetify with Vuex.",
        "Provides dialog, notification and loader for building a modern website.",
        "Using Promise API refactor modal component to provide fluent experience.",
      ];
      return p.join("\n");
    },
    preInsertSnippet() {
      return `// main.js or somewhere you initialize your app
      `;
    },
    codeInstallPlugin() {
      return [`$ npm install vue-hawesome-modal`];
    },
    templateCodeToAchieves() {
      return [
        `
<template>
  <v-app>
    <!-- Components can be used after \`vue-hawesome-modal\` been installed -->
    <!-- \`vue-hawesome-modal\` component should 
            i.  be used at root(the most top-level) component
            ii. make sure these components are \`singleton\`(one and only one) in a web app
    -->
    
    <h-dialog />
    <h-notify />
    <h-loader />

    ...
  </v-app>
</template>
      `,
      ];
    },
    codeToAchieveGlobalSetting() {
      return [
        `
var options = { 
  store, 
  themeColor: "hex or semantic color",
  // more setting detail see other tab
  dialogSetting: { ... },
  notifySetting: { ... },
  loaderSetting: { ... }
}`,
      ];
    },

    // For nuxt user
    pluginCodeForNuxt() {
      return [
        `
// define plugin for vue-hawesome-modal

// plugins/vue-hawesome-modal.js
import Vue from "vue"
import vueHawesomeModal from "vue-hawesome-modal"

export default ({ store }) => {
    var options = { 
        store, 
        themeColor: "hex or semantic color",
        // more setting detail see other tab
        dialogSetting: { ... },
        notifySetting: { ... },
        loaderSetting: { ... }
      }
    Vue.use(vueHawesomeModal, options)
}
      `,
      ];
    },
    installPluginFromNuxtConfig() {
      return [
        `
// add vue-hawesome-modal inside the plugins key of your nuxt.config.js

// nuxt.config.js
{
  plugins: [{ src: '@/plugins/vue-hawesome-modal.js', mode: 'client' }],
  css: ['@/node_modules/vue-hawesome-modal/dist/vue-hawesome-modal.css']
}
      `,
      ];
    },
    templateCodeToAchievesForNuxt() {
      return [
        `
<template>
  <v-app>
    <!-- Components can be used after \`vue-hawesome-modal\` been installed -->
    <!-- \`vue-hawesome-modal\` component should 
            i.  be used at root(the most top-level) component
            ii. make sure these components are \`singleton\`(one and only one) in a web app
            iii. wrap it with client-only component
    -->
    <client-only>
      <h-dialog />
      <h-notify />
      <h-loader />
    </client-only>

    ...
  </v-app>
</template>
      `,
      ];
    },
  },
};
</script>
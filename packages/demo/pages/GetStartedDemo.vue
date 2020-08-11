<template>
  <v-container>
    <AllExpandedPanelScope>
      <ColorResponsiveExpansionPanel>
        <template v-slot:header>Introduction</template>
        <template v-slot:content>
          <v-row justify="center">
            <v-col md="10" cols="12">
              <pre
                class="introduction-text"
                :class="{'--dark': $vuetify.theme.dark}"
                v-text="introductionText"
              ></pre>
            </v-col>
          </v-row>
        </template>
      </ColorResponsiveExpansionPanel>
      <ColorResponsiveExpansionPanel>
        <template v-slot:header>Installation</template>
        <template v-slot:content>
          <CodeBlockBase :codes="codeInstallPlugin" :lang="'bash'"></CodeBlockBase>
        </template>
      </ColorResponsiveExpansionPanel>
      <ColorResponsiveExpansionPanel>
        <template v-slot:header>Usage</template>
        <template v-slot:content>
          <GlobalSettingCodeBlock
            :codes="codeToAchieveGlobalSetting"
            :preInsertSnippet="preInsertSnippet"
          ></GlobalSettingCodeBlock>
          <CodeBlockBase :codes="templateCodeToAchieves" :lang="'html'"></CodeBlockBase>
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
    preInsertSnippet() {
      return `// main.js or somewhere you initialize your app
      `;
    },
  },
};
</script>

<style lang="scss">
.introduction-text {
  color: black !important;
  &.--dark {
    color: white !important;
  }
}
</style>
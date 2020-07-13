<template>
  <v-container>
    <AllExpandedPanelScope>
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
      `
      ];
    },
    codeToAchieveGlobalSetting() {
      return [
        `
var options = { 
  store, 
  themeColor: "hex or semantic color"
  // more setting detail see other tab
  dialogSetting: { ... },
  notifySetting: { ... },
  loaderSetting: { ... }
}`
      ];
    },
    preInsertSnippet() {
      return `// main.js or somewhere you initialize your app
      `;
    }
  }
};
</script>
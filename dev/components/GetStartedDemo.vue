<template>
  <v-container>
    <AllExpandedPanelScope>
      <ColorResponsiveExpansionPanel>
        <template v-slot:header>Install</template>
        <template v-slot:content>
          <CodeBlockBase :codes="codeInstallPlugin" :isShowLangType="false" :lang="'html'"></CodeBlockBase>
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
      return [`$ npm install hawesome-vue-extends`];
    },
    templateCodeToAchieves() {
      return [
        `
<template>
  <v-app>
    <!-- Components can be used after \`hawesome-vue-extends\` been installed -->
    <!-- \`hawesome-vue-extends\` component should 
            i.  be used at root(the most top-level) component
            ii. make sure these components are \`singleton\`(one and only one) in a web app
    -->
    
    <HawesomeDialog />
    <HawesomeNotify />
    <HawesomeLoader />

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
  // more setting detail see other tab
  dialogSetting: { ... },
  notifySetting: { ... },
  loaderSetting: { ... }
};`
      ];
    },
    preInsertSnippet() {
      return `// main.js or somewhere you initialize your app
      `;
    }
  }
};
</script>

<style>
</style>
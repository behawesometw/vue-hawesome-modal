<template>
  <v-container>
    <CodeBlockBase :codes="templateCodeToAchieves" :lang="'markup'"></CodeBlockBase>
    <GlobalSettingCodeBlock
      :codes="codeToAchieveGlobalSetting"
      :preInsertSnippet="preInsertSnippet"
    ></GlobalSettingCodeBlock>
  </v-container>
</template>


<script>
import CodeBlockBase from "./CodeBlock/CodeBlockBase";
import GlobalSettingCodeBlock from "./CodeBlock/GlobalSettingCodeBlock";

export default {
  components: { CodeBlockBase, GlobalSettingCodeBlock },
  computed: {
    templateCodeToAchieves() {
      return [
        `
<template>
  <v-app>
    <!-- Components can be used after \`hawesome-vue-extends\` been installed -->
    <!-- \`hawesome-vue-extends\` component should 
            i.  be used at root(the most top-level) component
            ii. make sure these components are \`singleton\` in a web app
    -->
    <HawesomeLoader />
    <HawesomeDialog />
    <HawesomeNotify />

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
      return `// main.js or somewhere you initialize your app.
      `;
    }
  }
};
</script>

<style>
</style>
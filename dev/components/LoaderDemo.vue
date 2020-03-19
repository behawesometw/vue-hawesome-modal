<template>
  <v-container>
    <v-row dense justify="center">
      <v-col md="8" cols="10">
        <v-text-field label="text" v-model="loaderText" :color="globalThemeColor"></v-text-field>
      </v-col>
    </v-row>

    <v-row dense justify="center">
      <v-col md="8" cols="10">
        <v-text-field
          type="number"
          label="timeout"
          step="500"
          v-model="timeout"
          :color="globalThemeColor"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row dense justify="center">
      <v-col md="8" cols="10">
        <v-radio-group row v-model="loaderType" @change="loaderTypeChange">
          <v-radio :color="globalThemeColor" label="linear" value="linear"></v-radio>
          <v-radio :color="globalThemeColor" label="circular" value="circular"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <v-divider class="my-5"></v-divider>

    <v-row dense justify="center" class="text-center">
      <v-col cols="12">
        <v-btn width="200" :color="globalThemeColor" outlined @click="loaderDemo">open loader</v-btn>
      </v-col>
    </v-row>

    <GlobalSettingCodeBlock :codes="codeToAchieveGlobalSetting"></GlobalSettingCodeBlock>

    <ExampleCodeBlock :codes="codeToAchieves"></ExampleCodeBlock>
  </v-container>
</template>

<script>
import ExampleCodeBlock from "./Common/CodeBlock/ExampleCodeBlock";
import GlobalSettingCodeBlock from "./Common/CodeBlock/GlobalSettingCodeBlock";

export default {
  components: {
    ExampleCodeBlock,
    GlobalSettingCodeBlock
  },
  data: () => ({
    loaderText: "",
    timeout: 2000,
    loaderType: "linear"
  }),
  computed: {
    globalThemeColor() {
      return this.$store.state.theme.color;
    },
    codeToAchieveGlobalSetting() {
      var loaderTextStatement = `${
        this.loaderText.length > 0 ? `, loaderText: ${this.loaderText}` : ""
      }`;

      return [
        `
var options = { 
  store, 
  loaderSetting: { 
    type: "${this.loaderType}"${loaderTextStatement}
  } 
};`
      ];
    },
    codeToAchieves() {
      var resultArr = [];

      var loaderTextStatement = `${
        this.loaderText.length > 0 ? `"${this.loaderText}"` : ""
      }`;

      var codeToAchieve = `
this.$loader.on(${loaderTextStatement});
setTimeout(() => {
  this.$loader.off();
}, ${this.timeout});
    `;

      resultArr.push(codeToAchieve);

      return resultArr;
    }
  },
  methods: {
    loaderTypeChange() {
      this.$store.commit("loader/setGlobalSetting", {
        type: this.loaderType
      });
    },
    loaderDemo() {
      var sec = this.timeout >= 0 ? this.timeout : 2000;
      this.$loader.on(this.loaderText);
      setTimeout(() => {
        this.$loader.off();
      }, sec);
    }
  }
};
</script>

<style>
</style>
<template>
  <JavaScriptCodeBlock :codes="decoratedCodes"></JavaScriptCodeBlock>
</template>

<script>
import JavaScriptCodeBlock from "./JavaScriptCodeBlock";
export default {
  props: {
    codes: {
      type: Array,
      required: true
    }
  },
  components: { JavaScriptCodeBlock },
  computed: {
    decoratedCodes() {
      return this.codes
        .map(code => code.trim())
        .map(code => {
          return `
import store from "../path/to/your/vuex/store.js"
import Vue from "vue"
import hawesomeVue from "hawesome-vue-extends"

${code}

Vue.use(hawesomeVue, options)
`;
        })
        .map(code => code.trim());
    }
  }
};
</script>

<style>
</style>
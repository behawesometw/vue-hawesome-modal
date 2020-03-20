<template>
  <CodeBlockBase :codes="decoratedCodes" :lang="'javascript'"></CodeBlockBase>
</template>

<script>
export default {
  props: {
    codes: {
      type: Array,
      required: true
    },
    preInsertSnippet: {
      type: String,
      default: ""
    }
  },
  computed: {
    decoratedCodes() {
      return this.codes
        .map(code => code.trim())
        .map(code => {
          return `
${this.preInsertSnippet}
// import
import store from "../path/to/your/vuex/store.js"
import Vue from "vue"
import hawesomeVue from "hawesome-vue-extends"

// initialize global settings
${code}

// install
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
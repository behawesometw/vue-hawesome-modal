<template>
  <CodeBlockBase :codes="decoratedCodes" :lang="'javascript'"></CodeBlockBase>
</template>

<script>
export default {
  props: {
    codes: {
      type: Array,
      required: true
    }
  },
  computed: {
    decoratedCodes() {
      return this.codes
        .map(code => code.trim())
        .map(code => {
          return `
// \`this\` points to the Vue instance
${code}
`;
        })
        .map(code => code.trim());
    }
  }
};
</script>

<style>
</style>
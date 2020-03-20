<template>
  <v-expansion-panels flat multiple :value="value">
    <slot></slot>
  </v-expansion-panels>
</template>

<script>
const indexArrayByLength = length => {
  return Array.from({ length }, (i, idx) => idx);
};
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return indexArrayByLength(100);
      }
    }
  }
};
</script>

<style>
</style>
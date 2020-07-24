<template>
  <v-expansion-panels
    hover
    flat
    multiple
    :value="controlExpansion"
    :disabled="isDisablePanelExpandable"
  >
    <slot></slot>
  </v-expansion-panels>
</template>

<script>
const indexArrayByLength = (length) => {
  return Array.from({ length }, (i, idx) => idx);
};
export default {
  computed: {
    slotLength() {
      return this.$slots.default.length;
    },
    isDisablePanelExpandable() {
      return !this.$store.state.isEnablePanelExpandable;
    },
    controlExpansion() {
      if (this.isDisablePanelExpandable) {
        // special case: aviod component cache
        return indexArrayByLength(this.slotLength);
      }
      return indexArrayByLength(this.slotLength);
    },
  },
};
</script>

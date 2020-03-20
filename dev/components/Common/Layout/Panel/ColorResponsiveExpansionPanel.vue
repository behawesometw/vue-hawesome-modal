<template>
  <v-expansion-panel>
    <v-expansion-panel-header :class="panelColorClass" :style="panelColorStyle">
      <slot name="header"></slot>
      <template v-slot:actions>
        <v-icon :class="['px-5', panelColorClass]" :style="panelColorStyle">$expand</v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-divider class="my-5"></v-divider>
      <slot name="content"></slot>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  computed: {
    globalThemeColor() {
      return this.$store.state.theme.color;
    },
    panelColorStyle() {
      return { [`color`]: this.globalThemeColor };
    },
    panelColorClass() {
      return {
        [`${this.globalThemeColor}--text`]: true
      };
    }
  }
};
</script>

<style>
</style>
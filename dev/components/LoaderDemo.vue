<template>
  <div>
    <v-text-field
      type="number"
      label="timeout"
      step="500"
      v-model="timeout"
      :color="globalThemeColor"
    ></v-text-field>
    <v-switch
      inset
      v-model="loaderTypeSwitch"
      :color="globalThemeColor"
      :label="loaderLabel"
      @change="loaderTypeChange"
    ></v-switch>
    <v-btn :color="globalThemeColor" outlined class="d-block mt-5" @click="loaderDemo">open loader</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    timeout: 2000,
    loaderTypeSwitch: true
  }),
  computed: {
    globalThemeColor() {
      return this.$store.state.theme.color;
    },
    loaderLabel() {
      return this.loaderTypeText();
    }
  },
  methods: {
    loaderTypeText() {
      return this.loaderTypeSwitch ? "linear" : "circular";
    },
    loaderTypeChange() {
      this.$store.commit("loader/setGlobalSetting", {
        type: this.loaderTypeText()
      });
    },
    loaderDemo() {
      var sec = this.timeout >= 0 ? this.timeout : 2000;
      this.$loader.on();
      setTimeout(() => {
        this.$loader.off();
      }, sec);
    }
  }
};
</script>

<style>
</style>
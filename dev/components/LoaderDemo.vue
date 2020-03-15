<template>
  <v-container>
    <v-row dense justify="center">
      <v-col md="6" cols="10">
        <v-text-field label="text" v-model="loaderText" :color="globalThemeColor"></v-text-field>
      </v-col>
    </v-row>

    <v-row dense justify="center">
      <v-col md="6" cols="10">
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
      <v-col md="6" cols="10">
        <v-switch
          inset
          v-model="loaderTypeSwitch"
          :color="globalThemeColor"
          :label="loaderLabel"
          @change="loaderTypeChange"
        ></v-switch>
      </v-col>
    </v-row>

    <v-divider class="my-5"></v-divider>

    <v-row dense justify="center" class="text-center">
      <v-col cols="12">
        <v-btn width="200" :color="globalThemeColor" outlined @click="loaderDemo">open loader</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loaderText: "",
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
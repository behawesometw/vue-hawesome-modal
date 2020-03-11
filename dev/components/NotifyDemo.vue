<template>
  <div>
    <v-container>
      <v-row>
        <v-checkbox :color="globalThemeColor" v-model="top" label="Top"></v-checkbox>
        <v-checkbox class="ml-4" :color="globalThemeColor" v-model="bottom" label="Bottom"></v-checkbox>
        <v-checkbox class="ml-4" :color="globalThemeColor" v-model="left" label="Left"></v-checkbox>
        <v-checkbox class="ml-4" :color="globalThemeColor" v-model="right" label="Right"></v-checkbox>
      </v-row>
    </v-container>
    <v-btn :color="globalThemeColor" outlined class="d-block mt-5" @click="notiDemo">push notify</v-btn>
    <v-btn :color="globalThemeColor" outlined class="d-block mt-5" @click="resolve">resolve</v-btn>
    <v-btn :color="globalThemeColor" outlined class="d-block mt-5" @click="clean">clean</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    top: false,
    bottom: true,
    left: false,
    right: true
  }),
  computed: {
    globalThemeColor() {
      return this.$store.state.theme.color;
    }
  },
  methods: {
    notiDemo() {
      this.$notify.push("testing");
    },
    setNotifyPosition() {
      var positionText = ""
        .concat(`${this.top ? "top" : ""}`)
        .concat(`${this.bottom ? "bottom" : ""}`)
        .concat(`${this.left ? "Left" : ""}`)
        .concat(`${this.right ? "Right" : ""}`);

      this.$store.commit("notify/setGlobalSetting", { position: positionText });
    },
    resolve() {
      this.$notify.resolveAllNotify();
    },
    clean() {
      this.$notify.clearAllNotify();
    }
  },
  watch: {
    top(val) {
      this.bottom = !val;
      this.setNotifyPosition();
    },
    bottom(val) {
      this.top = !val;
      this.setNotifyPosition();
    },
    left(val) {
      this.right = !val;
      this.setNotifyPosition();
    },
    right(val) {
      this.left = !val;
      this.setNotifyPosition();
    }
  }
};
</script>
<template>
  <v-container>
    <v-row dense justify="center">
      <v-col md="6" cols="10">
        <v-text-field :color="globalThemeColor" v-model="notiText" label="text"></v-text-field>
      </v-col>
    </v-row>

    <v-row dense justify="center">
      <v-col md="1" cols="3">
        <v-checkbox :color="globalThemeColor" v-model="isEnableDuration"></v-checkbox>
      </v-col>
      <v-col md="5" cols="7">
        <v-text-field
          :color="globalThemeColor"
          :disabled="!isEnableDuration"
          type="number"
          min="1"
          step="1"
          label="duration(s)"
          v-model="duration"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row dense justify="center">
      <v-col md="1" cols="5">
        <v-checkbox :color="globalThemeColor" v-model="top" label="Top"></v-checkbox>
      </v-col>
      <v-col md="1" cols="5">
        <v-checkbox :color="globalThemeColor" v-model="bottom" label="Bottom"></v-checkbox>
      </v-col>
      <v-col md="1" cols="5">
        <v-checkbox :color="globalThemeColor" v-model="left" label="Left"></v-checkbox>
      </v-col>
      <v-col md="1" cols="5">
        <v-checkbox :color="globalThemeColor" v-model="right" label="Right"></v-checkbox>
      </v-col>
      <v-col md="2" cols="0"></v-col>
    </v-row>

    <v-row dense justify="center">
      <v-col md="6" cols="10">
        <v-radio-group row v-model="notiType">
          <v-radio :color="globalThemeColor" label="Info" value="info"></v-radio>
          <v-radio :color="globalThemeColor" label="Success" value="success"></v-radio>
          <v-radio :color="globalThemeColor" label="Warning" value="warning"></v-radio>
          <v-radio :color="globalThemeColor" label="Error" value="error"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <v-row justify="center" class="text-center">
      <v-col md="2" cols="12">
        <v-btn
          :color="globalThemeColor"
          :disabled="!(notiText.length > 0)"
          outlined
          @click="notiDemo"
        >push notify</v-btn>
      </v-col>

      <v-col md="2" cols="12">
        <v-btn :color="globalThemeColor" outlined @click="resolve">resolve all notify</v-btn>
      </v-col>

      <v-col md="2" cols="12">
        <v-btn :color="globalThemeColor" outlined @click="clean">clean all notify</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    notiText: "Lorem, ipsum dolor.",
    notiType: "info",
    isEnableDuration: false,
    duration: 2,
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
      this.$notify
        .push(this.notiText, builder => {
          builder
            .setType(this.notiType)
            .setTimeout(this.isEnableDuration ? this.duration : 0);
        })
        .then(() => {
          console.log("resolved");
        });
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
    },
    bottom(val) {
      this.top = !val;
      this.setNotifyPosition();
    },
    left(val) {
      this.right = !val;
    },
    right(val) {
      this.left = !val;
      this.setNotifyPosition();
    }
  }
};
</script>
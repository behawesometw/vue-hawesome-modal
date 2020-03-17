<template>
  <v-container>
    <v-row dense justify="center">
      <v-col md="8" cols="10">
        <v-text-field :color="globalThemeColor" v-model="notiText" label="text"></v-text-field>
      </v-col>
    </v-row>

    <v-row dense justify="center">
      <v-col md="8" cols="10">
        <v-checkbox
          class="d-inline-block mr-4"
          :color="globalThemeColor"
          v-model="isEnableDuration"
        ></v-checkbox>
        <v-text-field
          class="d-inline-block"
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
      <v-col cols="10" md="8">
        <v-checkbox class="d-inline-block mr-4" :color="globalThemeColor" v-model="top" label="Top"></v-checkbox>
        <v-checkbox
          class="d-inline-block mr-4"
          :color="globalThemeColor"
          v-model="bottom"
          label="Bottom"
        ></v-checkbox>
        <v-checkbox
          class="d-inline-block mr-4"
          :color="globalThemeColor"
          v-model="left"
          label="Left"
        ></v-checkbox>
        <v-checkbox
          class="d-inline-block mr-4"
          :color="globalThemeColor"
          v-model="right"
          label="Right"
        ></v-checkbox>
      </v-col>
    </v-row>

    <v-row dense justify="center">
      <v-col md="8" cols="10">
        <v-radio-group row v-model="notiType">
          <v-radio :color="globalThemeColor" label="Info" value="info"></v-radio>
          <v-radio :color="globalThemeColor" label="Success" value="success"></v-radio>
          <v-radio :color="globalThemeColor" label="Warning" value="warning"></v-radio>
          <v-radio :color="globalThemeColor" label="Error" value="error"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <v-divider class="my-5"></v-divider>

    <v-row justify="center" class="text-center">
      <v-col cols="12">
        <v-btn
          width="200"
          :color="globalThemeColor"
          :disabled="!(notiText.length > 0)"
          outlined
          @click="notiDemo"
        >push notify</v-btn>
      </v-col>

      <v-col cols="12">
        <v-btn width="200" :color="globalThemeColor" outlined @click="resolve">resolve all notify</v-btn>
      </v-col>

      <v-col cols="12">
        <v-btn width="200" :color="globalThemeColor" outlined @click="clean">clean all notify</v-btn>
      </v-col>
    </v-row>

    <GlobalSettingCodeBlock :codes="codeToAchieveGlobalSetting"></GlobalSettingCodeBlock>

    <ExampleCodeBlock :codes="codeToAchieves"></ExampleCodeBlock>
  </v-container>
</template>

<script>
import ExampleCodeBlock from "./CodeBlock/ExampleCodeBlock";
import GlobalSettingCodeBlock from "./CodeBlock/GlobalSettingCodeBlock";

export default {
  components: {
    ExampleCodeBlock,
    GlobalSettingCodeBlock
  },
  data: () => ({
    notiText: "Lorem, ipsum dolor.",
    notiType: "info",
    isEnableDuration: true,
    duration: 5,
    top: false,
    bottom: true,
    left: false,
    right: true
  }),
  computed: {
    globalThemeColor() {
      return this.$store.state.theme.color;
    },
    codeToAchieveGlobalSetting() {
      return [
        `
var options = { 
  store, 
  notifySetting: { 
    position: "${this.positionText()}", 
    timeout: ${this.duration} 
  } 
};`
      ];
    },
    codeToAchieves() {
      var resultArr = [];

      var setTimeoutStatement = `${
        this.isEnableDuration
          ? `.setTimeout(${this.duration})`
          : ".setTimeout(0)"
      }`;
      var setTypeStatement = `.setType("${this.notiType}")`;

      var codeToAchieve1 = `
this.$notify
  .push(
    "${this.notiText}",
    builder => {
      builder
        ${setTypeStatement}
        ${setTimeoutStatement}
    })
  .then(() => {
    console.log("resolved");
  });`;

      resultArr.push(codeToAchieve1);

      var codeToAchieve2 = `
this.$notify
  .${this.notiType}(
    "${this.notiText}", 
    builder => {
      builder${setTimeoutStatement}
    })
  .then(() => {
    console.log("resolved");
  });`;
      resultArr.push(codeToAchieve2);

      if (!this.isEnableDuration) {
        var codeToAchieve3 = `
this.$notify
  .promise(
    "${this.notiText}", 
    builder => {
      builder${setTypeStatement}
    })
  .then(() => {
    console.log("resolved");
  });`;
        resultArr.push(codeToAchieve3);
      }

      return resultArr;
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
    positionText() {
      return ""
        .concat(`${this.top ? "top" : ""}`)
        .concat(`${this.bottom ? "bottom" : ""}`)
        .concat(`${this.left ? "Left" : ""}`)
        .concat(`${this.right ? "Right" : ""}`);
    },
    setNotifyPosition() {
      this.$store.commit("notify/setGlobalSetting", {
        position: this.positionText()
      });
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
<style>
.overflow-hidden {
  overflow: hidden;
}
</style>
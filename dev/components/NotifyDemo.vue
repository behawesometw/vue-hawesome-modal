<template>
  <v-container>
    <v-speed-dial
      v-model="fab"
      :class="dialPositionClass"
      direction="bottom"
      transition="scale-transition"
    >
      <template v-slot:activator>
        <v-btn :x-small="$vuetify.breakpoint.xs" v-model="fab" :color="globalThemeColor" fab dark>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-btn
        :x-small="$vuetify.breakpoint.xs"
        fab
        color="error"
        @click.stop="notiDemo"
        :dark="notiText.length > 0"
        :disabled="notiText.length == 0"
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <v-btn :x-small="$vuetify.breakpoint.xs" fab dark color="success" @click.stop="resolve">
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
      <v-btn :x-small="$vuetify.breakpoint.xs" fab dark color="warning" @click.stop="clean">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>

    <AllExpandedPanelScope>
      <ColorResponsiveExpansionPanel>
        <template v-slot:header>Playground</template>
        <template v-slot:content>
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
            <v-col md="8" cols="10">
              <v-checkbox
                class="d-inline-block mr-4"
                :color="globalThemeColor"
                v-model="top"
                label="Top"
              ></v-checkbox>
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
        </template>
      </ColorResponsiveExpansionPanel>
      <ColorResponsiveExpansionPanel>
        <template v-slot:header>Usage</template>
        <template v-slot:content>
          <GlobalSettingCodeBlock :codes="codeToAchieveGlobalSetting"></GlobalSettingCodeBlock>

          <ExampleCodeBlock :codes="codeToAchieves"></ExampleCodeBlock>
        </template>
      </ColorResponsiveExpansionPanel>
    </AllExpandedPanelScope>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    fab: false,
    notiText: "Lorem, ipsum dolor.",
    notiType: "info",
    isEnableDuration: false,
    duration: 5,
    top: false,
    bottom: true,
    left: true,
    right: false
  }),
  computed: {
    dialPositionClass() {
      return `${this.positionText()}_position_fixed`;
    },
    globalThemeColor() {
      return this.$store.state.theme.color;
    },
    codeToAchieveGlobalSetting() {
      return [
        `
var options = { 
  store, 
  notifySetting: { 
    // hawesome-vue-extends/lib/notify/notifyConfigAttribute
    position: "${this.positionText()}", 
    timeout: ${this.duration} 
  } 
}`
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
.topRight_position_fixed {
  position: fixed;
  z-index: 2;
  left: 20px;
}
.topLeft_position_fixed {
  position: fixed;
  z-index: 2;
  right: 20px;
}
.bottomRight_position_fixed {
  position: fixed;
  z-index: 2;
  left: 20px;
}
.bottomLeft_position_fixed {
  position: fixed;
  z-index: 2;
  right: 20px;
}
</style>
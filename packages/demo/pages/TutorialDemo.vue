<template>
  <v-container>
    <v-tooltip left>
      <template v-slot:activator="{on}">
        <v-btn
          v-on="on"
          fab
          class="top-right-fixed"
          :color="hGlobalThemeColor"
          :x-small="$vuetify.breakpoint.xs"
          dark
          @click="play"
        >
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </template>
      <span>click to run the snippet</span>
    </v-tooltip>
    <AllExpandedPanelScope>
      <ColorResponsiveExpansionPanel>
        <template v-slot:header>Usage</template>
        <template v-slot:content>
          <ExampleCodeBlock :codes="codeToAchieves"></ExampleCodeBlock>
        </template>
      </ColorResponsiveExpansionPanel>
    </AllExpandedPanelScope>
  </v-container>
</template>

<script>
var demoSnippet = `
this.$h.notify
  .promise("hello!!")
  .then(() => this.$h.dialog.talk("ready to start a tutorial?"))
  .then(() =>
    this.$h.dialog.talk(
      "we can use \`Promise API\` chaining a series of tasks.",
      builder => {
        builder
          .set("width", 500)
          .set("themeColor", "purple")
          .set("isShowCancelBtn", false)
          .set("confirmBtnTxt", "simulate async");
      }
    )
  )
  .then(
    () =>
      new Promise(resolve => {
        this.$h.loader.on();
        setTimeout(() => {
          this.$h.loader.off();
          resolve({ result: true, msg: "hope you enjoy!" });
        }, 2000);
      })
  )
  .then(rs => {
    if (rs.result) {
      this.$h.notify.success(rs.msg);
    }
  })
  .catch(() => {
    this.$h.notify.warning("ok. maybe next time.");
  })
  .finally(this.$h.dialog.hangUp);
      `;
export default {
  methods: {
    play() {
      this.$store.commit("hNotify/clearAllNotify");
      eval(demoSnippet);
    }
  },
  computed: {
    codeToAchieves() {
      return [demoSnippet];
    }
  }
};
</script>

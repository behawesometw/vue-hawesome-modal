<template>
  <v-container>
    <v-btn
      fab
      class="top-right-fixed"
      :color="globalThemeColor"
      :x-small="$vuetify.breakpoint.xs"
      dark
      @click="replay"
    >
      <v-icon>mdi-replay</v-icon>
    </v-btn>
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
this.$notify
  .promise("hello!!")
  .then(() => this.$dialog.talk("ready to start a tutorial?"))
  .then(() =>
    this.$dialog.talk(
      "we can use promise object chaining a series of tasks.",
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
        this.$loader.on();
        setTimeout(() => {
          this.$loader.off();
          resolve({ result: true, msg: "hope you enjoy!" });
        }, 2000);
      })
  )
  .then(rs => {
    if (rs.result) {
      this.$notify.success(rs.msg);
    }
  })
  .catch(() => {
    this.$notify.warning("ok. maybe next time.");
  })
  .finally(this.$dialog.hangUp);
      `;
export default {
  mounted() {
    if (this.$store.getters["notify/hasNotify"]) {
      return;
    }
    eval(demoSnippet);
  },
  methods: {
    replay() {
      this.$store.commit("notify/clearAllNotify");
      eval(demoSnippet);
    }
  },
  computed: {
    globalThemeColor() {
      return this.$store.state.theme.color;
    },
    codeToAchieves() {
      return [demoSnippet, "123"];
    }
  }
};
</script>

<style>
</style>
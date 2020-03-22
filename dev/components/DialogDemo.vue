<template>
  <v-container>
    <v-tooltip left v-model="isNotReadyToPlay">
      <template v-slot:activator="{}">
        <v-btn
          fab
          class="top-right-fixed"
          :color="globalThemeColor"
          :x-small="$vuetify.breakpoint.xs"
          :dark="isReadyToPlay"
          :disabled="isNotReadyToPlay"
          @click="dialogDemo"
        >
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </template>
      <span>type some content to play</span>
    </v-tooltip>
    <AllExpandedPanelScope>
      <ColorResponsiveExpansionPanel>
        <template v-slot:header>Playground</template>
        <template v-slot:content>
          <v-row dense justify="center">
            <v-col md="4" cols="5">
              <v-text-field
                :color="globalThemeColor"
                v-model="title"
                label="title"
                hint="default value: `Message`"
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="5">
              <v-text-field
                :color="globalThemeColor"
                v-model="width"
                type="number"
                label="width"
                hint="default value: 300"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense justify="center">
            <v-col md="8" cols="10">
              <v-textarea
                v-model="content"
                :color="globalThemeColor"
                no-resize
                label="content"
                rows="2"
                :hint="'html support'"
                clearable
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row dense justify="center">
            <v-col md="4" cols="10">
              <ColorSelectBundle
                v-model="themeColor"
                :label="'theme color'"
                :hint="'change both title bar and confirm button color'"
              ></ColorSelectBundle>
            </v-col>
            <v-col md="4" cols="10">
              <ColorSelectBundle v-model="titleBarColor" :label="'titie bar color'"></ColorSelectBundle>
            </v-col>
          </v-row>

          <v-row dense justify="center">
            <v-col md="4" cols="10">
              <DialogButtonConfigure :buttonType="'cancel'" v-model="cancelBtn"></DialogButtonConfigure>
            </v-col>
            <v-col md="4" cols="10">
              <DialogButtonConfigure :buttonType="'confirm'" v-model="confirmBtn"></DialogButtonConfigure>
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
import ColorSelectBundle from "./Common/Color/ColorSelectBundle";
import DialogButtonConfigure from "./Business/DialogButtonConfigure";

export default {
  components: {
    ColorSelectBundle,
    DialogButtonConfigure
  },
  data: () => ({
    title: "",
    content: "Lorem ipsum dolor sit amet.",
    width: "",
    themeColor: "",
    titleBarColor: "",
    cancelBtn: {
      isShow: true,
      color: "",
      txt: ""
    },
    confirmBtn: {
      isShow: true,
      color: "",
      txt: ""
    }
  }),
  watch: {
    "cancelBtn.isShow": {
      deep: true,
      immediate: true,
      handler(val, newVal) {
        if (newVal && !this.confirmBtn.isShow) {
          this.confirmBtn.isShow = true;
        }
      }
    },
    "confirmBtn.isShow": {
      deep: true,
      immediate: true,
      handler(val, newVal) {
        if (newVal && !this.cancelBtn.isShow) {
          this.cancelBtn.isShow = true;
        }
      }
    }
  },
  computed: {
    isReadyToPlay() {
      return this.content && this.content.trim().length > 0;
    },
    isNotReadyToPlay() {
      return !this.isReadyToPlay;
    },
    globalThemeColor() {
      return this.$store.state.theme.color;
    },
    colorItems() {
      return this.$store.state.colorItems;
    },
    codeToAchieveGlobalSetting() {
      return [];
    },
    codeToAchieves() {
      var code = `
this.$dialog
  ${this.talkStatement}
  .then(() => {
    // trigger after user clicks the confirm button
  })
  .catch(() => {
    // trigger after user clicks the cancel button
  })
  .finally(this.$dialog.hangUp);
      `;
      return [code];
    },
    talkStatement() {
      var isWithBuilder = this.statementReadyToRender.trim().length > 0;
      var talkStatement = undefined;
      if (isWithBuilder) {
        talkStatement =
          `.talk("${this.content}", builder => {
    builder` +
          `${this.statementReadyToRender}
  })`;
      } else {
        talkStatement = `.talk("${this.content}")`;
      }
      return talkStatement;
    },
    statementReadyToRender() {
      return (
        this.genStatemant("title", this.title, this.valOrUndefined) +
        this.genStatemant(
          "width",
          this.width,
          this.numberGreaterThanZero,
          false
        ) +
        this.genStatemant("themeColor", this.themeColor, this.valOrUndefined) +
        this.genStatemant(
          "titleBarColor",
          this.titleBarColor,
          this.valOrUndefined
        ) +
        this.genStatemant(
          "isShowConfirmBtn",
          this.confirmBtn.isShow,
          this.falsyOrUndefined,
          false
        ) +
        this.genStatemant(
          "confirmBtnTxt",
          this.confirmBtn.txt,
          this.valOrUndefined
        ) +
        this.genStatemant(
          "confirmBtnColor",
          this.confirmBtn.color,
          this.valOrUndefined
        ) +
        this.genStatemant(
          "isShowCancelBtn",
          this.cancelBtn.isShow,
          this.falsyOrUndefined,
          false
        ) +
        this.genStatemant(
          "cancelBtnTxt",
          this.cancelBtn.txt,
          this.valOrUndefined
        ) +
        this.genStatemant(
          "cancelBtnColor",
          this.cancelBtn.color,
          this.valOrUndefined
        )
      );
    }
  },
  methods: {
    isValidNumber(num) {
      var target = Boolean(num);
      return !isNaN(target);
    },
    validNumber(num) {
      return this.isValidNumber(num) ? Number(num) : undefined;
    },
    numberGreaterThanZero(num) {
      var target = this.validNumber(num);
      return target !== undefined && target > 0 ? target : undefined;
    },
    valOrUndefined(val) {
      return val || undefined;
    },
    falsyOrUndefined(val) {
      return val ? undefined : val;
    },
    dialogDemo() {
      this.$dialog
        .talk(this.content, builder => {
          builder
            .set("title", this.valOrUndefined(this.title))
            .set("width", this.numberGreaterThanZero(this.width))
            .set("themeColor", this.valOrUndefined(this.themeColor))
            .set("titleBarColor", this.valOrUndefined(this.titleBarColor))
            .set(
              "isShowConfirmBtn",
              this.falsyOrUndefined(this.confirmBtn.isShow)
            )
            .set("confirmBtnTxt", this.valOrUndefined(this.confirmBtn.txt))
            .set("confirmBtnColor", this.valOrUndefined(this.confirmBtn.color))
            .set(
              "isShowCancelBtn",
              this.falsyOrUndefined(this.cancelBtn.isShow)
            )
            .set("cancelBtnTxt", this.valOrUndefined(this.cancelBtn.txt))
            .set("cancelBtnColor", this.valOrUndefined(this.cancelBtn.color));
        })
        .then(() => {})
        .catch(() => {})
        .finally(this.$dialog.hangUp);
    },
    genStatemant(attrName, val, handler, isDoubleQuoteWrap = true) {
      var flag = handler.call(this, val) === undefined;
      if (flag) {
        return "";
      }
      var valStatement = isDoubleQuoteWrap ? `"${val}"` : `${val}`;
      return `
      .set("${attrName}", ${valStatement})`;
    }
  }
};
</script>

<style>
.top-right-fixed {
  position: fixed;
  right: 12px;
  z-index: 2;
}
</style>


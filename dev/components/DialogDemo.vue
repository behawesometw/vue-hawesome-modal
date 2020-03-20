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
import DialogConfigBuilder from "../../lib/dialog/dialogConfigBuilder";
import ColorSelectBundle from "./Common/Color/ColorSelectBundle";
import DialogButtonConfigure from "./Business/DialogButtonConfigure";

var dialogConfig = DialogConfigBuilder.defaultConfig();
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
      isShow: dialogConfig.isShowCancelBtn,
      color: "",
      txt: dialogConfig.cancelBtnTxt
    },
    confirmBtn: {
      isShow: dialogConfig.isShowConfirmBtn,
      color: "",
      txt: dialogConfig.confirmBtnTxt
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
      return [];
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
    dialogDemo() {
      this.$dialog
        .talk(this.content, builder => {
          builder
            .set("title", this.title || undefined)
            .set("width", this.numberGreaterThanZero(this.width))
            .set("themeColor", this.themeColor || undefined)
            .set("titleBarColor", this.titleBarColor || undefined)
            .set("isShowConfirmBtn", this.confirmBtn.isShow)
            .set("confirmBtnTxt", this.confirmBtn.txt || undefined)
            .set("confirmBtnColor", this.confirmBtn.color || undefined)
            .set("isShowCancelBtn", this.cancelBtn.isShow)
            .set("cancelBtnTxt", this.cancelBtn.txt || undefined)
            .set("cancelBtnColor", this.cancelBtn.color || undefined);
        })
        .then(() => {
          console.log(this.title);
        })
        .catch(() => {})
        .finally(this.$dialog.hangUp);
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


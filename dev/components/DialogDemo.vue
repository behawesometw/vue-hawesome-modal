<template>
  <v-container>
    <v-row dense justify="center">
      <v-col md="8" cols="10">
        <v-text-field
          :color="globalThemeColor"
          v-model="title"
          label="title"
          hint="default value: `Message`"
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
      <v-col md="4" cols="5">
        <v-text-field
          :color="globalThemeColor"
          v-model="width"
          label="width"
          hint="default value: 300"
        ></v-text-field>
      </v-col>
      <v-col md="4" cols="5">
        <v-text-field
          :color="globalThemeColor"
          v-model="height"
          label="height"
          hint="default value: 500"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row dense justify="center">
      <v-col md="4" cols="5">
        <ColorSelectBundle
          v-model="themeColor"
          :label="'theme color'"
          :hint="'change both title bar and confirm button color. default value: `primary`'"
        ></ColorSelectBundle>
      </v-col>
      <v-col md="4" cols="5">
        <ColorSelectBundle
          v-model="titleBarColor"
          :label="'titie bar color'"
          :hint="'default value: `primary`'"
        ></ColorSelectBundle>
      </v-col>
    </v-row>

    <v-row dense justify="center">
      <v-col md="2" cols="10">
        <DialogButtonConfigure :buttonType="'confirm'" v-model="confirmBtn"></DialogButtonConfigure>
      </v-col>
      <v-col md="2" cols="10">
        <DialogButtonConfigure :buttonType="'cancel'" v-model="cancelBtn"></DialogButtonConfigure>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ColorSelectBundle from "./Common/Color/ColorSelectBundle";
import DialogConfigBuilder from "../../lib/dialog/dialogConfigBuilder";
import DialogButtonConfigure from "./Business/DialogButtonConfigure";
var dialogConfig = DialogConfigBuilder.defaultConfig();
export default {
  components: { ColorSelectBundle, DialogButtonConfigure },
  data: () => ({
    title: "",
    content: "Lorem ipsum dolor sit amet.",
    width: "",
    height: "",
    themeColor: "",
    titleBarColor: "",
    cancelBtn: {
      isShow: dialogConfig.isShowCancelBtn,
      color: "#000000DE",
      txt: dialogConfig.cancelBtnTxt
    },
    confirmBtn: {
      isShow: dialogConfig.isShowConfirmBtn,
      color: "#1976d2FF",
      txt: dialogConfig.confirmBtnTxt
    }
  }),
  computed: {
    globalThemeColor() {
      return this.$store.state.theme.color;
    },
    colorItems() {
      return this.$store.state.colorItems;
    }
  }
};
</script>



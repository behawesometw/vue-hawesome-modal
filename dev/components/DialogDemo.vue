<template>
  <v-container>
    <v-row dense justify="center">
      <v-col md="8" cols="10">
        <v-text-field
          :color="globalThemeColor"
          v-model="title"
          label="title"
          hint="default value: 'Message'"
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
      <v-col md="4" cols="10">
        <v-card>
          <v-card-text>
            <v-switch
              dense
              :color="globalThemeColor"
              v-model="confirmBtn.isShow"
              :label="(confirmBtn.isShow ? 'show' : 'hide') + ' confirm button'"
            ></v-switch>
          </v-card-text>
          <v-expand-transition>
            <div v-show="confirmBtn.isShow">
              <v-divider></v-divider>
              <v-container>
                <v-row justify="center" align="center">
                  <v-col md="3" cols="12">
                    <v-text-field
                      :color="globalThemeColor"
                      :disabled="!confirmBtn.isShow"
                      v-model="confirmBtn.txt"
                      label="text"
                    ></v-text-field>
                  </v-col>
                  <v-col md="9" cols="12">
                    <v-color-picker
                      :disabled="!confirmBtn.isShow"
                      v-model="confirmBtn.color"
                      hide-mode-switch
                      hide-canvas
                      flat
                    ></v-color-picker>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>

      <v-col md="4" cols="10">
        <v-card>
          <v-card-text>
            <v-switch
              dense
              :color="globalThemeColor"
              v-model="cancelBtn.isShow"
              :label="(cancelBtn.isShow ? 'show' : 'hide') + ' cancel button'"
            ></v-switch>
          </v-card-text>
          <v-expand-transition>
            <div v-show="cancelBtn.isShow">
              <v-divider></v-divider>
              <v-container>
                <v-row justify="center" align="center">
                  <v-col md="3" cols="12">
                    <v-text-field
                      :color="globalThemeColor"
                      :disabled="!cancelBtn.isShow"
                      v-model="cancelBtn.txt"
                      label="text"
                    ></v-text-field>
                  </v-col>
                  <v-col md="9" cols="12">
                    <v-color-picker
                      :disabled="!cancelBtn.isShow"
                      v-model="cancelBtn.color"
                      hide-mode-switch
                      hide-canvas
                      flat
                    ></v-color-picker>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DialogConfigBuilder from "../../lib/dialog/dialogConfigBuilder";
var dialogConfig = DialogConfigBuilder.defaultConfig();
export default {
  mounted() {},
  data: () => ({
    title: "",
    content: "Lorem ipsum dolor sit amet.",
    width: "",
    height: "",
    cancelBtn: {
      isShow: dialogConfig.isShowCancelBtn,
      color: "#a5b2c2",
      txt: dialogConfig.cancelBtnTxt
    },
    confirmBtn: {
      isShow: dialogConfig.isShowConfirmBtn,
      color: "#1976d2",
      txt: dialogConfig.confirmBtnTxt
    }
  }),
  computed: {
    globalThemeColor() {
      return this.$store.state.theme.color;
    }
  }
};
</script>



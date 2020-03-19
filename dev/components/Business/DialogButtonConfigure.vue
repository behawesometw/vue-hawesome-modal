<template>
  <v-card>
    <v-card-text>
      <v-switch dense :color="globalThemeColor" v-model="value.isShow" :label="switchLabel"></v-switch>
    </v-card-text>
    <v-expand-transition>
      <div v-show="value.isShow">
        <v-divider></v-divider>
        <v-container>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>text: `{{value.txt}}`</v-list-item-subtitle>
                <v-list-item-subtitle>color: {{value.color}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-menu
                  :close-on-content-click="false"
                  :nudge-width="200"
                  offset-x
                  left
                  :nudge-top="50"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>mdi-cog</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-list>
                      <v-list-item>
                        <v-text-field
                          :color="globalThemeColor"
                          :disabled="!value.isShow"
                          v-model="value.txt"
                          label="text"
                        ></v-text-field>
                      </v-list-item>
                      <v-list-item>
                        <ColorSelectBundle v-model="value.color"></ColorSelectBundle>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-menu>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-container>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import ColorSelectBundle from "../Common/Color/ColorSelectBundle";
export default {
  components: { ColorSelectBundle },
  props: {
    buttonType: {
      type: String,
      require: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    switchLabel() {
      return `${this.value.isShow ? "show" : "hide"} ${this.buttonType} button`;
    },
    globalThemeColor() {
      return this.$store.state.theme.color;
    },
    colorItems() {
      return this.$store.state.colorItems;
    }
  }
};
</script>

<style>
</style>
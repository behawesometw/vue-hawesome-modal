<template>
  <v-combobox
    :value="bindingValue"
    :color="globalThemeColor"
    :items="colorItems"
    :label="label"
    :hint="hint"
    :menu-props="{ maxHeight: 150 }"
    v-on="$listeners"
  >
    <template v-slot:append-outer>
      <v-menu :close-on-content-click="false" :nudge-width="200" offset-x left :nudge-top="50">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-palette</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-color-picker
                v-model="bindingValue"
                hide-mode-switch
                hide-canvas
                flat
                v-on="$listeners"
              ></v-color-picker>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>
  </v-combobox>
</template>

<script>
export default {
  props: {
    label: { type: String, default: "select/type a color" },
    hint: { type: String, default: "" },
    value: { type: String, default: "" }
  },
  mounted() {
    this.bindingValue = this.value;
  },
  data: () => ({
    bindingValue: ""
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
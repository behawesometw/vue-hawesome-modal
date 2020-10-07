<template>
  <div v-if="!item.isDone">
    <v-tooltip bottom :color="item.type">
      <template v-slot:activator="{ on }">
        <v-hover v-slot:default="{ hover }">
          <v-card
            v-on="isActiveToolTip ? on : ''"
            :width="width"
            :height="height"
            :elevation="elevationCalc(hover)"
            :class="[{'on-hover': hover}, itemMarginClass]"
          >
            <v-progress-linear
              v-if="hasLoadingProgress"
              :color="item.type"
              :value="item.progressValue"
            ></v-progress-linear>
            <v-toolbar :height="height">
              <v-icon class="mr-2" :color="item.type" v-text="item.icon"></v-icon>
              <div ref="contentTarget" class="text-truncate" v-html="item.content"></div>
              <v-spacer></v-spacer>
              <v-btn icon :color="item.type" @click="resolveNoti(item)">
                <!-- <v-icon>mdi-checkbox-marked-circle-outline</v-icon> -->
                <v-icon v-text="$vuetify.icons.values.success"></v-icon>
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-hover>
      </template>
      <span>{{item.content}}</span>
    </v-tooltip>
  </div>
</template>

<script>
export const positionCheck = (position) => {
  var result = {};
  switch (position) {
    case "topRight":
      result.top = true;
      result.right = true;
      break;
    case "bottomRight":
      result.bottom = true;
      result.right = true;
      break;
    case "topLeft":
      result.top = true;
      result.left = true;
      break;
    case "bottomLeft":
      result.bottom = true;
      result.left = true;
      break;
    default:
      result.bottom = true;
      result.right = true;
      break;
  }
  return result;
};

export default {
  mounted() {
    this.$nextTick(() => {
      var el = this.$refs.contentTarget;
      this.isActiveToolTip = el.offsetWidth < el.scrollWidth;
    });
  },
  data: () => ({ isActiveToolTip: false }),
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  methods: {
    resolveNoti(item) {
      this.$store.commit("hNotify/resolveItem", item);
    },
    elevationCalc(isOnHover) {
      var isXS = this.$vuetify.breakpoint.xs;
      if (isOnHover) {
        return isXS ? 6 : 12;
      }
      return 2;
    },
  },
  computed: {
    hasLoadingProgress() {
      return this.item.timeout > 0;
    },
    itemMarginClass() {
      var positionObj = positionCheck(
        this.$store.state.hNotify.globalSetting.position
      );
      var isXS = this.$vuetify.breakpoint.xs;
      return {
        [`${`m${positionObj.top ? "t" : "b"}-${isXS ? "4" : "6"}`}`]: true,
      };
    },
    width() {
      return this.$vuetify.breakpoint.xs ? "200" : "250";
    },
    height() {
      return this.$vuetify.breakpoint.xs ? "40" : "56";
    },
  },
};
</script>

<style scoped>
.v-progress-linear__bar,
.v-progress-linear__bar__determinate {
  transition: none;
}
</style>
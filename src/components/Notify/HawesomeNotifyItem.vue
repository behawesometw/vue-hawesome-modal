<template>
  <transition name="fade">
    <div v-if="!item.isDone">
      <v-hover v-slot:default="{ hover }">
        <v-card
          width="250"
          height="50"
          :elevation="hover ? 12 : 2"
          :class="[{'on-hover': hover}, itemMarginClass]"
        >
          <v-progress-linear
            v-if="hasLoadingProgress"
            :color="item.type"
            :value="item.progressValue"
          ></v-progress-linear>
          <v-toolbar>
            <v-icon class="mr-2" :color="item.type" v-text="item.icon"></v-icon>
            <div class="noti-content" v-html="item.content"></div>
            <v-spacer></v-spacer>
            <v-btn icon :color="item.type" @click="resolveNoti(item)">
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-hover>
    </div>
  </transition>
</template>

<script>
export const positionCheck = position => {
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
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  methods: {
    resolveNoti(item) {
      this.$store.commit("notify/resolveItem", item);
    }
  },
  computed: {
    hasLoadingProgress() {
      return this.item.timeout > 0;
    },
    itemMarginClass() {
      var positionObj = positionCheck(
        this.$store.state.notify.globalSetting.position
      );
      return {
        [`${positionObj.top ? "mt-6" : "mb-6"}`]: true
      };
    }
  }
};
</script>

<style scoped>
.noti-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.v-progress-linear__bar,
.v-progress-linear__bar__determinate {
  transition: none;
}
</style>
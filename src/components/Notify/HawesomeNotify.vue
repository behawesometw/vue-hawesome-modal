<template>
  <div class="notify-container" :class="position">
    <transition-group :name="transitionName" class="d-flex" :class="flexDirection">
      <div v-for="(item, index) in notifyList" :key="`_${index}`">
        <HawesomeNotifyItem :item="item" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import HawesomeNotifyItem from "./HawesomeNotifyItem";
export default {
  components: { HawesomeNotifyItem },
  computed: {
    notifyList() {
      return this.$store.state.notify.list;
    },
    flexDirection() {
      var position = this.position;
      return {
        "flex-column-reverse": position.top,
        "flex-column": position.bottom
      };
    },
    transitionName() {
      return this.position.top ? "list-top" : "list-bottom";
    },
    position() {
      var p = {};
      switch (this.$store.state.notify.globalSetting.position) {
        case "topRight":
          p.top = true;
          p.right = true;
          break;
        case "bottomRight":
          p.bottom = true;
          p.right = true;
          break;
        case "topLeft":
          p.top = true;
          p.left = true;
          break;
        case "bottomLeft":
          p.bottom = true;
          p.left = true;
          break;
        default:
          p.bottom = true;
          p.right = true;
          break;
      }
      return p;
    }
  }
};
</script>
<style scoped>
.notify-container {
  display: flex;
  position: fixed;
  width: auto;
  height: auto;
  z-index: 9001;
}

.top {
  top: 0px;
}
.bottom {
  bottom: 0px;
}
.right {
  right: 10px;
}
.left {
  left: 10px;
}

.list-top-enter-active,
.list-top-leave-active,
.list-bottom-enter-active,
.list-bottom-leave-active {
  transition: all 0.3s;
}
.list-bottom-enter,
.list-bottom-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.list-top-enter,
.list-top-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
<template>
  <div class="notify-container" :class="position">
    <div v-for="(item, index) in notifyList" :key="index">
      <HawesomeNotifyItem :item="item" />
    </div>
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
      console.log(p);
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
  z-index: 9999;
}
.top {
  top: 10px;
  flex-direction: column-reverse;
}
.bottom {
  bottom: 5px;
  flex-direction: column;
}
.right {
  right: 10px;
}
.left {
  left: 10px;
}
</style>
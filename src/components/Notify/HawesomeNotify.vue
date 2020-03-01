<template>
  <div class="notify-container">
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
    }
  }
};
</script>
<style scoped>
.notify-container {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  position: fixed;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  z-index: 9999;
}
</style>
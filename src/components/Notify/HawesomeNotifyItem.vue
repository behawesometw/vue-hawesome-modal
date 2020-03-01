<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      width="250"
      height="50"
      class="mb-10 mr-5"
      :elevation="hover ? 12 : 2"
      :class="{ 'on-hover': hover }"
    >
      <v-progress-linear v-if="isAutoDismiss" :color="item.type" :value="progressValue"></v-progress-linear>
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
</template>

<script>
const UPT_FRQCY = 100,
  HUNDRED = 100,
  DELAY = 300;
export default {
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  data: () => ({ progressValue: 0, interval: undefined }),
  mounted() {
    var that = this,
      p = (UPT_FRQCY * HUNDRED) / (Math.ceil(that.item.timeout) * 1000 - DELAY);

    that.interval = setInterval(() => {
      if (that.value >= HUNDRED) {
        clearInterval(that.interval);
      }
      that.progressValue += p;
    }, UPT_FRQCY);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    resolveNoti(item) {
      this.$store.commit("notify/resolveItem", item);
    }
  },
  computed: {
    isAutoDismiss() {
      return this.item.timeout > 0;
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
</style>
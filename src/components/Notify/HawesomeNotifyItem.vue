<template>
  <div v-if="!item.isDone">
    <v-hover v-slot:default="{ hover }">
      <v-card
        width="250"
        height="50"
        class="mb-10"
        :elevation="hover ? 12 : 2"
        :class="{ 'on-hover': hover }"
      >
        <v-progress-linear v-if="hasLoadingProgress" :color="item.type" :value="item.progressValue"></v-progress-linear>
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
</template>

<script>
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
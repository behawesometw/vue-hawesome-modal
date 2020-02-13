<template>
  <v-app>
    <div class="ma-auto">
      <LoadingMask />
      <v-btn @click="maskTest">mask test</v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  methods: {
    maskTest() {
      this.$mask.on("資料處理中");
      setTimeout(() => {
        this.$mask.off();
      }, 2000);
    }
  }
};
</script>

<style>
</style>
<template>
  <v-row justify="center">
    <v-col md="6" cols="12">
      <v-sheet elevation="4" class="pa-4">
        <textarea ref="copyTarget" type="text" class="copy-textarea" :value="copyTargetContent" />
        <div v-for="(code, i) in codeToAchieves" :key="i" class="mb-4 rltv">
          <div class="abslt topLeft lang-label caption">JavaScript</div>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                class="abslt topRight"
                @click.stop.prevent="copySnippet(code.origCode)"
                v-on="on"
              >
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </template>
            <span>copy snippet</span>
          </v-tooltip>
          <pre class="language-javascript pt-8" v-html="code.compiledHTMLCode"></pre>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

export default {
  data: () => ({
    copyTargetContent: ""
  }),
  props: {
    codes: {
      type: Array,
      required: true
    }
  },
  computed: {
    codeToAchieves() {
      return this.codes
        .map(code => code.trim())
        .map(code => ({
          compiledHTMLCode: Prism.highlight(
            code,
            Prism.languages.javascript,
            "javascript"
          ),
          origCode: code
        }));
    }
  },
  methods: {
    copySnippet(origCode) {
      var that = this;
      this.copyTargetContent = origCode;

      Vue.nextTick(() => {
        var copyTarget = this.$refs.copyTarget;
        copyTarget.select();

        try {
          document.execCommand("copy");
          that.$notify.success("copy success.");
        } catch (error) {
          that.$notify.error("copy fail.");
        }
      });
    }
  }
};
</script>

<style>
.rltv {
  position: relative;
}
.abslt {
  position: absolute;
}
.topLeft {
  top: 0;
  left: 0;
  padding: 3px;
}
.topRight {
  top: 0;
  right: 0;
  margin: 2px;
}
.lang-label {
  user-select: none;
  background-color: #cfcfcfcc;
  color: #000000cc;
}
.copy-textarea {
  position: absolute;
  opacity: 0;
}
</style>
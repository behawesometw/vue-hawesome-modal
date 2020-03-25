import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        colorItems: ["primary", "info", "success", "error", "warning", "black"],
        isEnablePanelExpandable: false
    },
    mutations: {
        updateIsEnablePanelExpandable(state, value) {
            state.isEnablePanelExpandable = value;
        }
    }
});
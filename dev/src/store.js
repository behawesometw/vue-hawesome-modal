import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex)

import colorList from "./colorList";

export default new Vuex.Store({
    state: {
        colorItems: [...["primary", "info", "success", "error", "warning"], ...colorList]
    }
});
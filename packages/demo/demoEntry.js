import Vue from 'vue'
import vuetify from './src/vuetify'
import store from "./src/store";
import router from "./src/router";
import vueHawesomeModal from "../vue-hawesome-modal/pluginEntry";
import Demo from './Demo'

Vue.config.productionTip = false;

var notifySetting = {};
var dialogSetting = {};
var loaderSetting = {};

Vue.use(vueHawesomeModal, { store, notifySetting, dialogSetting, loaderSetting })

new Vue({
    store,
    vuetify,
    router,
    render: h => h(Demo)
}).$mount('#app')

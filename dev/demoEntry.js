import Vue from 'vue'
import vuetify from './src/vuetify'
import store from "./src/store";
import router from "./src/router";
import hawesomeVue from '../src/plugin'
import Demo from './Demo'

var notifySetting = { position: "bottomRight" };
var dialogSetting = {};
var loaderSetting = { type: "linear" };

Vue.use(hawesomeVue, { store, notifySetting, dialogSetting, loaderSetting })

new Vue({
    store,
    vuetify,
    router,
    render: h => h(Demo)
}).$mount('#app')

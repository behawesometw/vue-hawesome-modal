import Vue from 'vue'
import vuetify from './vuetify'
import hawesomeVue from '../src/plugin'
import Demo from './Demo'
import store from "./store";

var notifySetting = { type: "info", position: "bottomRight" };
var dialogSetting = { title: "訊息" };
var loaderSetting = { type: "linear" };

Vue.use(hawesomeVue, { store, notifySetting, dialogSetting, loaderSetting })

new Vue({
    store,
    vuetify,
    render: h => h(Demo)
}).$mount('#app')

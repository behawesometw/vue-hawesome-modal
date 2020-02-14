import Vue from 'vue'
import vuetify from './vuetify'
import hawesomeVue from '../src/plugin'
import Demo from './Demo'
import store from "./vuex";

Vue.use(hawesomeVue, { store })

new Vue({
    store,
    vuetify,
    render: h => h(Demo)
}).$mount('#app')

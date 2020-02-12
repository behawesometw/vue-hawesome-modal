import Vue from 'vue';
import Vuetify from 'vuetify';
import LoadingMask from './components/LoadingMask'
import loadingMaskStore from "./js/store";

Vue.use(Vuetify);

export default {
    install(Vue, options) {
        if (!options || !options.store) {
            throw new Error('Please initialise plugin with a Vuex store.')
        }
        var $storeFromApp = options.store;

        $storeFromApp.registerModule('loadingMask', loadingMaskStore)

        Vue.component('LoadingMask', LoadingMask);

        Object.defineProperty(Vue.prototype, "$mask", {
            get() {
                return {
                    on(value) {
                        $storeFromApp.commit('loadingMask/start', value);
                    },
                    off() {
                        $storeFromApp.commit('loadingMask/end');
                    }
                }
            }
        })

    }
}
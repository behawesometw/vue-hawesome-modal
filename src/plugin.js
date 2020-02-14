import LoadingMask from './components/LoadingMask'
import waitingCountModule from "./modules/waitingCountModule";
import loadingMaskModule from "./modules/loadingMaskModule";

export default {
    install(Vue, options) {
        if (!options || !options.store) {
            throw new Error('Please initialise plugin with a Vuex store.')
        }
        var $storeFromApp = options.store;

        $storeFromApp.registerModule('waitingCount', waitingCountModule)

        $storeFromApp.registerModule("loadingMask", loadingMaskModule)

        Vue.component('LoadingMask', LoadingMask);

        Object.defineProperty(Vue.prototype, "$mask", {
            get() {
                return {
                    on(value) {
                        $storeFromApp.dispatch("loadingMask/on", value);
                    },
                    off() {
                        $storeFromApp.dispatch("loadingMask/off");
                    }
                }
            }
        })

    }
}
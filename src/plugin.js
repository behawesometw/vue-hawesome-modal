import DialogConfigBuilder from "../lib/dialog/dialogConfigBuilder";
import HawesomeLoader from './components/HawesomeLoader'
import HawesomeDialog from './components/HawesomeDialog'
import waitingCountModule from "./modules/waitingCountModule";
import loaderModule from "./modules/loaderModule";
import themeModule from "./modules/themeModule";
import dialogModule from "./modules/dialogModule";

export default {
    install(Vue, options) {
        if (!options || !options.store) {
            throw new Error('Please initialise plugin with a Vuex store.')
        }

        var $storeFromApp = options.store;

        $storeFromApp.registerModule('waitingCount', waitingCountModule)
        $storeFromApp.registerModule("theme", themeModule)
        $storeFromApp.registerModule("loader", loaderModule)
        $storeFromApp.registerModule("dialog", dialogModule)

        Vue.component('HawesomeLoader', HawesomeLoader);
        Vue.component('HawesomeDialog', HawesomeDialog);

        Object.defineProperty(Vue.prototype, "$loader", {
            get() {
                return {
                    on(loaderText) {
                        $storeFromApp.dispatch("loader/on", loaderText);
                    },
                    off() {
                        $storeFromApp.dispatch("loader/off");
                    }
                }
            }
        })

        Object.defineProperty(Vue.prototype, "$dialog", {
            get() {
                return {
                    talk(val) {
                        if (val && typeof val === "string") {
                            return $storeFromApp.dispatch("dialog/talk", new DialogConfigBuilder(val));
                        }
                        else if (val instanceof DialogConfigBuilder) {
                            return $storeFromApp.dispatch("dialog/talk", val);
                        }
                        else {
                            throw new Error("val should be a string or instance of DialogConfigBuilder.");
                        }
                    },
                    hangUp() {
                        $storeFromApp.dispatch('dialog/hangUp');
                    }
                }
            }
        })

    }
}
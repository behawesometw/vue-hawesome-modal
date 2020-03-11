import NotifyConfigBuilder from "../lib/notify/notifyConfigBuilder";
import DialogConfigBuilder from "../lib/dialog/dialogConfigBuilder";
import HawesomeLoader from './components/Loader/HawesomeLoader'
import HawesomeDialog from './components/Dialog/HawesomeDialog'
import HawesomeNotify from './components/Notify/HawesomeNotify'

import waitingCountModule from "./modules/waitingCountModule";
import loaderModule from "./modules/loaderModule";
import themeModule from "./modules/themeModule";
import dialogModule from "./modules/dialogModule";
import notifyModule from "./modules/notifyModule";

const isWellDefinedFunction = (func) => {
    return func && typeof func === "function";
};

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
        $storeFromApp.registerModule("notify", notifyModule)

        if (options.loaderSetting)
            $storeFromApp.commit('loader/setGlobalSetting', options.loaderSetting)
        if (options.dialogSetting)
            $storeFromApp.commit('dialog/setGlobalSetting', options.dialogSetting)
        if (options.notifySetting)
            $storeFromApp.commit('notify/setGlobalSetting', options.notifySetting)

        Vue.component('HawesomeLoader', HawesomeLoader);
        Vue.component('HawesomeDialog', HawesomeDialog);
        Vue.component('HawesomeNotify', HawesomeNotify);

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
                    talk(val, func) {
                        var builder = new DialogConfigBuilder(val);
                        if (isWellDefinedFunction(func)) { func.call(this, builder); }
                        return this._talk(builder);
                    },
                    _talk(val) {
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

        Object.defineProperty(Vue.prototype, "$notify", {
            get() {
                return {
                    info(val, func) {
                        var builder = new NotifyConfigBuilder(val);
                        if (isWellDefinedFunction(func)) { func.call(this, builder); }
                        return this._push(builder.setType("info"));
                    },
                    success(val, func) {
                        var builder = new NotifyConfigBuilder(val);
                        if (isWellDefinedFunction(func)) { func.call(this, builder); }
                        return this._push(builder.setType("success"));
                    },
                    warning(val, func) {
                        var builder = new NotifyConfigBuilder(val);
                        if (isWellDefinedFunction(func)) { func.call(this, builder); }
                        return this._push(builder.setType("warning"));
                    },
                    error(val, func) {
                        var builder = new NotifyConfigBuilder(val);
                        if (isWellDefinedFunction(func)) { func.call(this, builder); }
                        return this._push(builder.setType("error"));
                    },
                    promise(val, func) {
                        var builder = new NotifyConfigBuilder(val);
                        if (isWellDefinedFunction(func)) { func.call(this, builder); }
                        return this._push(builder.setTimeout(0));
                    },
                    push(val, func) {
                        var builder = new NotifyConfigBuilder(val);
                        if (isWellDefinedFunction(func)) { func.call(this, builder); }
                        return this._push(builder);
                    },
                    _push(val) {
                        if (val && typeof val === "string") {
                            return $storeFromApp.dispatch("notify/push", new NotifyConfigBuilder(val));
                        }
                        else if (val instanceof NotifyConfigBuilder) {
                            return $storeFromApp.dispatch("notify/push", val);
                        }
                        else {
                            throw new Error("val should be a string or instance of NotifyConfigBuilder.");
                        }
                    },
                    resolveAllNotify() {
                        $storeFromApp.commit('notify/resolveAllNotify')
                    },
                    clearAllNotify() {
                        $storeFromApp.commit('notify/clearAllNotify')
                    },
                }
            }
        })

    }
}
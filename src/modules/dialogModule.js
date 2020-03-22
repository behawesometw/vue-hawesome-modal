import DialogConfigBuilder from "../../lib/dialog/dialogConfigBuilder";

export default {
    namespaced: true,
    state: {
        config: DialogConfigBuilder.defaultConfig(),
        globalSetting: {}
    },
    mutations: {
        setGlobalSetting(state, setting) {
            state.globalSetting = { ...state.globalSetting, ...setting };
        },
        setConfig(state, config) {
            state.config = config;
        }
    },
    actions: {
        talk({ commit, state }, dialogConfigBuilderInstance) {

            if (!(dialogConfigBuilderInstance instanceof DialogConfigBuilder)) {
                throw new Error("parameter must be instance of DialogConfigBuilder.");
            }

            var configReadyToShoot = {
                ...DialogConfigBuilder.defaultConfig(),
                ...state.globalSetting,
                ...dialogConfigBuilderInstance.config
            };

            var dialogPromise = new Promise((rsv, rj) => {
                configReadyToShoot.resolve = rsv;
                configReadyToShoot.reject = rj;
            })

            configReadyToShoot.isShow = true;

            commit("setConfig", configReadyToShoot);

            return dialogPromise;
        },
        hangUp({ commit }) {
            var harmoniousHangUp = { content: "", title: "", confirmBtnTxt: "", cancelBtnTxt: "", isShowCancelBtn: false };
            commit('setConfig', { ...DialogConfigBuilder.defaultConfig(), ...harmoniousHangUp });
        }
    }
}
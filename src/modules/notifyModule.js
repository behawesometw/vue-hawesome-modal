import NotifyConfigBuilder from "../../lib/notify/notifyConfigBuilder";

const UPT_FRQCY = 100, HUNDRED = 100, DELAY = 300;

export default {
    namespaced: true,
    state: {
        list: [],
        globalSetting: {
            position: "bottomRight",
            timeout: 3
        }
    },
    mutations: {
        setGlobalSetting(state, setting) {
            state.globalSetting = { ...state.globalSetting, ...setting };
        },
        pushItem(state, notifyObj) {
            state.list.push(notifyObj)
        },
        resolveItem(state, notifyObj) {
            var index = state.list.findIndex(m => m === notifyObj);
            if (index > -1) {
                notifyObj.resolve();
                notifyObj.isDone = true;
                if (notifyObj.intervalId) {
                    clearInterval(notifyObj.intervalId)
                }
            }

            var totalCnt = state.list.length;
            var itemDoneCnt = state.list.filter(m => m.isDone).length;
            if (totalCnt == itemDoneCnt) {
                state.list = [];
            }
        }
    },
    actions: {
        push({ commit, state }, notifyConfigBuilderInstance) {

            if (!(notifyConfigBuilderInstance instanceof NotifyConfigBuilder)) {
                throw new Error("parameter must be instance of NotifyConfigBuilder.");
            }

            var configReadyToShoot = {
                ...NotifyConfigBuilder.defaultConfig(),
                ...state.globalSetting,
                ...notifyConfigBuilderInstance.config,
                ...{ isDone: false, progressValue: 0, intervalId: undefined }
            };

            var p = new Promise((rsv) => {
                configReadyToShoot.resolve = rsv;

                if (typeof configReadyToShoot.timeout === "number" && configReadyToShoot.timeout > 0) {

                    var percentAdd = (UPT_FRQCY * HUNDRED) / (Math.ceil(configReadyToShoot.timeout) * 1000 - DELAY);

                    var intervalId = setInterval(() => {
                        configReadyToShoot.progressValue += percentAdd;
                    }, UPT_FRQCY);
                    configReadyToShoot.intervalId = intervalId

                    setTimeout(() => {
                        commit('resolveItem', configReadyToShoot);
                    }, Math.ceil(configReadyToShoot.timeout) * 1000);
                }
            });

            commit('pushItem', configReadyToShoot)

            return p;
        }
    }
}
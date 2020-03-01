import NotifyConfigBuilder from "../../lib/notify/notifyConfigBuilder";

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: {
        pushItem(state, notifyObj) {
            state.list.push(notifyObj)
        },
        resolveItem(state, notifyObj) {
            var index = state.list.findIndex(m => m === notifyObj);
            if (index > -1) {
                notifyObj.resolve();
                state.list.splice(index, 1);
            }
        }
    },
    actions: {
        push({ commit }, notifyConfigBuilderInstance) {

            if (!(notifyConfigBuilderInstance instanceof NotifyConfigBuilder)) {
                throw new Error("parameter must be instance of NotifyConfigBuilder.");
            }

            var configReadyToShoot = { ...NotifyConfigBuilder.defaultConfig(), ...notifyConfigBuilderInstance.config };

            var p = new Promise((rsv) => {
                configReadyToShoot.resolve = rsv;

                if (typeof configReadyToShoot.timeout === "number" && configReadyToShoot.timeout > 0) {
                    setTimeout(() => {
                        commit('resolveItem', configReadyToShoot)
                    }, Math.ceil(configReadyToShoot.timeout) * 1000);
                }
            })
            commit('pushItem', configReadyToShoot)
            return p;
        }
    }
}
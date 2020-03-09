export default {
    namespaced: true,
    state: {
        loaderText: "",
        globalSetting: {
            type: "linear"
        }
    },
    mutations: {
        setGlobalSetting(state, setting) {
            state.globalSetting = { ...state.globalSetting, ...setting };
        },
        setLoaderText(state, loaderText) {
            state.loaderText = (loaderText && typeof loaderText === 'string') ? loaderText : "";
        }
    },
    actions: {
        on({ commit }, loaderText) {
            commit("setLoaderText", loaderText);
            commit('waitingCount/increase', null, { root: true })
        },
        off({ commit }) {
            commit('waitingCount/decrease', null, { root: true })
        },

    }
}
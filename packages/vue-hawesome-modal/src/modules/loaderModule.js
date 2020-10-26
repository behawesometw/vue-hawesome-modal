var textHandler = (text) => {
    return (text && text.trim() && typeof text === "string") ? text.trim() : "";
}

export default {
    namespaced: true,
    state: {
        loaderText: "",
        globalSetting: {
            type: "linear",
            loaderText: "",
            isBindingWithWaitingCount: true
        }
    },
    mutations: {
        setGlobalSetting(state, setting) {
            state.globalSetting = { ...state.globalSetting, ...setting };
        },
        setLoaderText(state, loaderTextIn) {
            var loaderText = textHandler(loaderTextIn);
            var loaderTextGlobal = textHandler(state.globalSetting.loaderText);
            state.loaderText = loaderText || loaderTextGlobal || "";
        }
    },
    actions: {
        on({ commit }, loaderText) {
            commit("setLoaderText", loaderText);
            commit('hWaitingCount/increase', null, { root: true })
        },
        off({ commit }) {
            commit('hWaitingCount/decrease', null, { root: true })
        },

    }
}
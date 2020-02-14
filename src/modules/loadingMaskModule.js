export default {
    namespaced: true,
    state: { maskText: "" },
    mutations: {
        setMaskText(state, maskText) {
            state.maskText = (maskText && typeof maskText === 'string') ? maskText : "";
        }
    },
    actions: {
        on({ commit }, maskText) {
            commit("setMaskText", maskText);
            commit('waitingCount/increase', null, { root: true })
        },
        off({ commit }) {
            commit('waitingCount/decrease', null, { root: true })
        },

    }
}
export default {
    namespaced: true,
    state: {
        maskText: ""
    },
    mutations: {
        setMaskText(state, value) {
            state.maskText = (value && typeof value === 'string') ? value : "";
        }
    }
}
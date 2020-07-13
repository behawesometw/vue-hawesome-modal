export default {
    namespaced: true,
    state: {
        color: "primary"
    },
    mutations: {
        setColor(state, color) {
            state.color = color;
        }
    }
}
export default {
    namespaced: true,
    state: { waitingCount: 0 },
    mutations: {
        increase(state) {
            state.waitingCount++;
        },
        decrease(state) {
            if (state.waitingCount > 0) {
                state.waitingCount--;
            }
        },
        set(state, val) {
            if (Number.isInteger(val)) {
                state.waitingCount = val
            }
        }
    },
    getters: {
        isGlobalLoading(state) {
            return state.waitingCount > 0;
        }
    }
}
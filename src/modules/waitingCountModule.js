export default {
    state: {
        waitingCount: 0
    },
    mutations: {
        increase(state) {
            state.waitingCount++;
        },
        decrease(state) {
            if (state.waitingCount > 0) {
                state.waitingCount--;
            }
        },
    },
    getters: {
        isGlobalLoading(state) {
            return state.waitingCount > 0;
        }
    }
}
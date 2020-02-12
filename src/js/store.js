export default {
    namespaced: true,
    state: {
        waitingCount: 0,
        maskText: ""
    },
    mutations: {
        manualStart(state, value) {
            state.waitingCount = 1;
            state.maskText = (value && typeof value === 'string') ? value : "";
        },
        start(state, value) {
            state.waitingCount++;
            state.maskText = (value && typeof value === 'string') ? value : "";
        },
        end(state) {
            if (state.waitingCount > 0) {
                state.waitingCount--;
            }
        },
        forceHide(state) {
            state.waitingCount = 0;
        }
    },
    getters: {
        isLoading(state) {
            return state.waitingCount > 0;
        }
    }
}
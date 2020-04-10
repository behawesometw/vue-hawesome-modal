import waitingCountModule from "../../modules/waitingCountModule";
const { increase, decrease } = waitingCountModule.mutations;
const getters = waitingCountModule.getters;

describe("waitingCountModule", () => {
    test("increase & decrease_1", () => {
        var state = { waitingCount: 0 };
        increase(state);
        decrease(state);
        expect(state.waitingCount).toEqual(0);
    })
    test("increase & decrease_2", () => {
        var state = { waitingCount: 0 };
        increase(state);
        decrease(state);
        decrease(state);
        expect(state.waitingCount).toEqual(0);
    })
    test("increase & decrease_3", () => {
        var state = { waitingCount: 0 };
        increase(state);
        increase(state);
        decrease(state);
        expect(state.waitingCount).toEqual(1);
    })
})

describe("getters", () => {
    test("isGlobalLoading_1", () => {
        var state = { waitingCount: 0 };
        expect(getters.isGlobalLoading(state)).toBeFalsy();
    })

    test("isGlobalLoading_2", () => {
        var state = { waitingCount: 0 };
        increase(state);
        expect(getters.isGlobalLoading(state)).toBeTruthy();
    })

    test("isGlobalLoading_3", () => {
        var state = { waitingCount: 0 };
        increase(state);
        decrease(state);
        expect(getters.isGlobalLoading(state)).toBeFalsy();
    })
})
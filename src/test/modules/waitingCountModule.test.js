/* eslint-disable no-undef */
import waitingCountModule from "../../modules/waitingCountModule";
const { increase, decrease } = waitingCountModule.mutations;
const getters = waitingCountModule.getters;

describe("waitingCountModule", () => {
    test("mutations", () => {
        var state = { waitingCount: 0 };
        increase(state);
        decrease(state);
        expect(state.waitingCount).toEqual(0);
    })

    test("getters", () => {
        var state = { waitingCount: 0 };
        expect(getters.isGlobalLoading(state)).toBeFalsy();

        increase(state);
        expect(getters.isGlobalLoading(state)).toBeTruthy();

        decrease(state);
        expect(getters.isGlobalLoading(state)).toBeFalsy();
    })
})
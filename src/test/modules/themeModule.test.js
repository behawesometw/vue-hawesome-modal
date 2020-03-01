/* eslint-disable no-undef */

import themeModule from "../../modules/themeModule";
const { setColor } = themeModule.mutations;

describe("themeModule", () => {
    test("mutations", () => {
        var state = { color: "primary" };
        setColor(state, "success");
        expect(state.color).toEqual("success");
    })
})
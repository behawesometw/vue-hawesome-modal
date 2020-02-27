/* eslint-disable no-undef */

import * as  testHelper from "./testHelper";

describe("test testHelper", () => {

    test("isEveryItemReturnTrue", () => {
        expect(testHelper.isEveryItemReturnTrue([true, true])).toBeTruthy()
        expect(testHelper.isEveryItemReturnTrue([false, false])).toBeFalsy()
        expect(testHelper.isEveryItemReturnTrue([false, true])).toBeFalsy()
    })

    test("isObjContainCertainAttrs", () => {
        expect(testHelper.isObjContainCertainAttrs({ name: "theName" }, ["name"])).toBeTruthy()
        expect(testHelper.isObjContainCertainAttrs({ name: "theName" }, ["name", "value"])).toBeFalsy()
    })

    test("isArrEveryElementContainCertainAttrs", () => {
        var arr = Array.from({ length: 5 }, () => { return { name: "theName", value: "theValue" } })
        expect(testHelper.isArrEveryElementContainCertainAttrs(arr, ["name"])).toBeTruthy()
        expect(testHelper.isArrEveryElementContainCertainAttrs(arr, ["name", "value"])).toBeTruthy()
        expect(testHelper.isArrEveryElementContainCertainAttrs(arr, ["name", "value", "notContainThisAttr"])).toBeFalsy()
    })
})
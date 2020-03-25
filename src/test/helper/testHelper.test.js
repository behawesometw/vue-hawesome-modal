import * as  testHelper from "./testHelper";

describe("test testHelper", () => {

    test("isTestableArray", () => {
        expect(testHelper.isTestableArray([])).toBeFalsy();
        expect(testHelper.isTestableArray({})).toBeFalsy();
        expect(testHelper.isTestableArray("")).toBeFalsy();
        expect(testHelper.isTestableArray(Array.from({ length: 5 }))).toBeTruthy();
    })

    test("isEveryItemReturnTrue", () => {
        expect(testHelper.isEveryItemReturnTrue({})).toBeFalsy()
        expect(testHelper.isEveryItemReturnTrue([true, true])).toBeTruthy()
        expect(testHelper.isEveryItemReturnTrue([false, false])).toBeFalsy()
        expect(testHelper.isEveryItemReturnTrue([false, true])).toBeFalsy()
    })

    test("isObjContainCertainAttrs", () => {
        expect(testHelper.isObjContainCertainAttrs("")).toBeFalsy()
        expect(testHelper.isObjContainCertainAttrs({ name: "theName" }, ["name"])).toBeTruthy()
        expect(testHelper.isObjContainCertainAttrs({ name: "theName" }, ["name", "value"])).toBeFalsy()
    })

    test("isArrEveryElementContainCertainAttrs", () => {
        var arr = Array.from({ length: 5 }, () => { return { name: "theName", value: "theValue" } })
        expect(testHelper.isArrEveryElementContainCertainAttrs(arr, {})).toBeFalsy()
        expect(testHelper.isArrEveryElementContainCertainAttrs(arr, ["name"])).toBeTruthy()
        expect(testHelper.isArrEveryElementContainCertainAttrs(arr, ["name", "value"])).toBeTruthy()
        expect(testHelper.isArrEveryElementContainCertainAttrs(arr, ["name", "value", "notContainThisAttr"])).toBeFalsy()
    })

    test("isArrElementContainNameAttrAndNameBeUnique", () => {
        var arrError1 = Array.from({ length: 2 }, () => { return { name: "theName", value: "theValue" } });
        var arrError2 = [{ name: "name" }, { value: "value" }];
        var arrSuccess = [{ name: "name1" }, { name: "name2" }];
        expect(testHelper.isArrElementContainNameAttrAndNameBeUnique(arrError1)).toBeFalsy();
        expect(testHelper.isArrElementContainNameAttrAndNameBeUnique(arrError2)).toBeFalsy();
        expect(testHelper.isArrElementContainNameAttrAndNameBeUnique({})).toBeFalsy();
        expect(testHelper.isArrElementContainNameAttrAndNameBeUnique(arrSuccess)).toBeTruthy();
    })
})
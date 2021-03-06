import dialogConfigAttribute from "../../lib/dialog/dialogConfigAttribute";
import notifyConfigAttribute from "../../lib/notify/notifyConfigAttribute";


import { isArrEveryElementContainCertainAttrs, isArrElementContainNameAttrAndNameBeUnique } from "../helper/testHelper";

describe("is all configBuilderAttributes well-defined? every element must contains name and defaultVal attr", () => {

    const certainAttrs = ["name", "defaultVal"];

    test("dialogConfigAttribute", () => {
        expect(isArrEveryElementContainCertainAttrs(dialogConfigAttribute, certainAttrs)).toBeTruthy()
    })


    test("notifyConfigAttribute", () => {
        expect(isArrEveryElementContainCertainAttrs(notifyConfigAttribute, certainAttrs)).toBeTruthy()
    })

})

describe("isArrElementContainNameAttrAndNameBeUnique ", () => {

    test("dialogConfigAttribute", () => {
        expect(isArrElementContainNameAttrAndNameBeUnique(dialogConfigAttribute)).toBeTruthy()
    })

    test("notifyConfigAttribute", () => {
        expect(isArrElementContainNameAttrAndNameBeUnique(notifyConfigAttribute)).toBeTruthy()
    })

})
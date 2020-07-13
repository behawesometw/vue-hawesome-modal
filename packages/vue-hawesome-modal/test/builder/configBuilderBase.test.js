import ConfigBuilderBase from "../../lib/common/configBuilderBase";

import { isArrEveryElementContainCertainAttrs, isArrElementContainNameAttrAndNameBeUnique } from "../helper/testHelper";

const configAttributeArr = [
    { name: "content", defaultVal: "" },
    { name: "key", defaultVal: "" },
    { name: "value", defaultVal: "" },
    { name: "valueCascade", defaultVal: "", cascadeAttr: ["value"] }
];

describe("test ConfigBuilderBase", () => {

    test("ctor call", () => {
        var builder = new ConfigBuilderBase("test", configAttributeArr);
        expect(builder.config.content).toEqual("test");
        expect(JSON.stringify(builder._configAttributeArr)).toEqual(JSON.stringify(configAttributeArr));
    })

    test("ctor call throw error", () => {
        expect(() => {
            new ConfigBuilderBase({}, configAttributeArr);
        }).toThrow();

        expect(() => {
            new ConfigBuilderBase("testing", {});
        }).toThrow();

        expect(() => {
            new ConfigBuilderBase("testing", []);
        }).toThrow();
    })

    test("defaultConfig", () => {
        var defaultConfig = ConfigBuilderBase.defaultConfig(configAttributeArr);
        expect(Object.prototype.hasOwnProperty.call(defaultConfig, "content")).toBeTruthy();
        expect(Object.prototype.hasOwnProperty.call(defaultConfig, "key")).toBeTruthy();
        expect(Object.prototype.hasOwnProperty.call(defaultConfig, "value")).toBeTruthy();
        expect(Object.prototype.hasOwnProperty.call(defaultConfig, "notContainThisAttr")).toBeFalsy();
    })

    test("set return builder", () => {
        var builder = new ConfigBuilderBase("test", configAttributeArr);
        var intance = builder.set("key", "theKey");
        expect(intance instanceof ConfigBuilderBase).toBeTruthy();
    })

    test("set", () => {
        var builder = new ConfigBuilderBase("test", configAttributeArr);
        builder.set("key", "theKey");
        expect(builder.config.key).toEqual("theKey");
    })

    test("set a non-existent attr does't impact config object", () => {
        var builder = new ConfigBuilderBase("test", configAttributeArr);
        builder.set("nonExistentAttr", "nonExistent")
        expect(builder.config.nonExistentAttr).toEqual(undefined);
    })

    test("set cascade attr", () => {
        var builder = new ConfigBuilderBase("test", configAttributeArr);
        builder.set("valueCascade", "theValue");
        expect(builder.config.value).toEqual("theValue");
    })

    test("set attr as null value will be ignored", () => {
        var builder = new ConfigBuilderBase("isShowTest", configAttributeArr);
        var intance = builder.set("key", null);
        expect(intance instanceof ConfigBuilderBase).toBeTruthy();
        expect(builder.config.isShow).toEqual(undefined);
    })

    test("is configAttributeArr well-defined? every element must contains name and defaultVal attr", () => {

        var testTarget = new ConfigBuilderBase("isShowTest", configAttributeArr)._configAttributeArr;

        var flag1 = isArrEveryElementContainCertainAttrs(testTarget, ["name", "defaultVal"]);
        expect(flag1).toBeTruthy();

        var flag2 = isArrEveryElementContainCertainAttrs(testTarget, ["name", "cascadeAttr"]);
        expect(flag2).toBeFalsy();
    })

    test("is configAttributeArr well-defined? no duplicate name attribute in array.", () => {
        var testTarget = new ConfigBuilderBase("isShowTest", configAttributeArr)._configAttributeArr

        var flag = isArrElementContainNameAttrAndNameBeUnique(testTarget);
        expect(flag).toBeTruthy()
    })
})
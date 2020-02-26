/* eslint-disable no-undef */
import ConfigBuilderBase from "../../lib/common/configBuilderBase";

const configAttributeArr = [
    { name: "content", defaultVal: "" },
    { name: "key", defaultVal: "" },
    { name: "key", defaultVal: "" },
    { name: "value", defaultVal: "" }
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
        expect(Object.keys(defaultConfig).length).toEqual(3);
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

    test("set attr as null value will be ignored", () => {
        var builder = new ConfigBuilderBase("isShowTest", configAttributeArr);
        var intance = builder.set("key", null);
        expect(intance instanceof ConfigBuilderBase).toBeTruthy();
        expect(builder.config.isShow).toEqual(undefined);
    })

    test("is configAttributeArr well-defined? every element must contains name and defaultVal attr", () => {
        var flag = new ConfigBuilderBase("isShowTest", configAttributeArr)
            ._configAttributeArr
            .map(m => Object.prototype.hasOwnProperty.call(m, "name") && Object.prototype.hasOwnProperty.call(m, "defaultVal"))
            .some(m => !m);
        expect(flag).toBeFalsy();
    })
})
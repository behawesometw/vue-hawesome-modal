import NotifyConfigBuilder from "../../../lib/notify/notifyConfigBuilder";
import { typeMappingArr } from "../../../lib/notify/notifyConfigAttribute";

describe("test NotifyConfigBuilder", () => {
    test("ctor call", () => {
        var builder = new NotifyConfigBuilder("test");
        expect(builder.config.content).toEqual("test");
    })

    test("ctor call throw error", () => {
        expect(() => {
            new NotifyConfigBuilder({});
        }).toThrow()
    })

    test("defaultConfig", () => {
        var defaultConfig = NotifyConfigBuilder.defaultConfig();
        expect(Object.prototype.hasOwnProperty.call(defaultConfig, "resolve")).toBeTruthy();
        expect(Object.prototype.hasOwnProperty.call(defaultConfig, "timeout")).toBeTruthy();
        expect(Object.prototype.hasOwnProperty.call(defaultConfig, "type")).toBeTruthy();
        expect(Object.prototype.hasOwnProperty.call(defaultConfig, "icon")).toBeTruthy();
        expect(Object.prototype.hasOwnProperty.call(defaultConfig, "notContainThisAttr")).toBeFalsy();
    })

    test("setTimeout", () => {
        var builder = new NotifyConfigBuilder("test").setTimeout(0.1);
        expect(builder.config.timeout).toEqual(1);
    })

    test("setTimeout ignored", () => {
        var builder = new NotifyConfigBuilder("test").setTimeout("notNumber");
        builder.config.timeout === NotifyConfigBuilder.defaultConfig.timeout;
    })

    test("setType", () => {
        var builder = new NotifyConfigBuilder("test").setType("success");
        var targetItem = typeMappingArr.find(m => m.type === "success");
        expect(builder.config.type === targetItem.type).toBeTruthy();
        expect(builder.config.icon === targetItem.icon).toBeTruthy();
    })
})
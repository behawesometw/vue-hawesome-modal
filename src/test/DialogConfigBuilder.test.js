/* eslint-disable no-undef */
import DialogConfigBuilder from "../../lib/dialog/dialogConfigBuilder";
import { dialogSizeArr } from "../../lib/dialog/dialogConfigAttribute";


describe("test DialogConfigBuilder", () => {
    test("ctor call", () => {
        var builder = new DialogConfigBuilder("test");
        expect(builder.config.content).toEqual("test");
    })

    test("ctor call throw error", () => {
        expect(() => {
            new DialogConfigBuilder({});
        }).toThrow()
    })

    test("defaultConfig", () => {
        var defaultConfig = DialogConfigBuilder.defaultConfig();
        expect(Object.prototype.hasOwnProperty.call(defaultConfig, "resolve")).toBeTruthy();
        expect(Object.prototype.hasOwnProperty.call(defaultConfig, "reject")).toBeTruthy();
        expect(Object.prototype.hasOwnProperty.call(defaultConfig, "content")).toBeTruthy();
        expect(Object.prototype.hasOwnProperty.call(defaultConfig, "notContainThisAttr")).toBeFalsy();
    })

    test("setSize", () => {
        var builder = new DialogConfigBuilder("test").setSize("l");
        var compareItem = dialogSizeArr.find(m => m.type === "S");

        expect(builder.config.maxWidth >= compareItem.width).toBeTruthy();
        expect(builder.config.maxHeight >= compareItem.height).toBeTruthy();
    })
})
import DialogConfigBuilder from "../../lib/dialog/dialogConfigBuilder";

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

})
import DialogConfigBuilder from "../../lib/dialog/dialogConfigBuilder";

describe("test DialogConfigBuilder", () => {
    it("ctor call", () => {
        var builder = new DialogConfigBuilder("test");
        expect(builder.config.content).toEqual("test");
    })

    it("defaultConfig", () => {
        var defaultConfig = DialogConfigBuilder.defaultConfig();
        expect(typeof defaultConfig).toEqual("object");
    })

    it("set return builder", () => {
        var builder = new DialogConfigBuilder("test");
        var intance = builder.set("isShow", true);
        expect(intance instanceof DialogConfigBuilder).toBeTruthy();
    })

    it("set", () => {
        var builder = new DialogConfigBuilder("test");
        builder.set("isShow", true);
        expect(builder.config.isShow).toEqual(true);
    })

    it("set attr as null value will be ignored", () => {
        var builder = new DialogConfigBuilder("isShowTest");
        var intance = builder.set("isShow", null);
        expect(intance instanceof DialogConfigBuilder).toBeTruthy();
        expect(builder.config.isShow).toEqual(undefined);
    })
})
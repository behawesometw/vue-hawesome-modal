import DialogConfigBuilder from "../../../lib/dialog/dialogConfigBuilder";
import dialogModule from "../../modules/dialogModule"
const { setConfig, setGlobalSetting } = dialogModule.mutations;
const { talk, hangUp } = dialogModule.actions;

describe("mutations", () => {
    test("setConfig", () => {
        var state = {}
        var payload = { name: "testingName", value: "testingValue" }
        setConfig(state, payload)
        expect(state.config).toEqual(payload)
    })
    test("setGlobalSetting_1", () => {
        var state = { globalSetting: { name: "defaultName" } }
        var payload = { name: "testingName", value: "testingValue" }
        var expectedValue = { name: "testingName", value: "testingValue" }
        setGlobalSetting(state, payload)
        expect(state.globalSetting).toEqual(expectedValue)
    })
    test("setGlobalSetting_2", () => {
        var state = { globalSetting: { name: "defaultName", stateProps: 1, flag: false } }
        var payload = { name: "testingName", value: "testingValue" }
        setGlobalSetting(state, payload)
        expect(state.globalSetting).toHaveProperty("name", "testingName")
        expect(state.globalSetting).toHaveProperty("stateProps", 1)
        expect(state.globalSetting).toHaveProperty("value", "testingValue")
        expect(state.globalSetting).toHaveProperty("flag", false)
    })
})

describe('actions', () => {
    test('hangUp', () => {
        hangUp({ commit: () => { } })
    })

    test("talk", () => {
        var dialogConfigBuilder = new DialogConfigBuilder("testing")
        var dialogPromise = talk({ commit: () => { }, state: { globalSetting: {} } }, dialogConfigBuilder)
        expect(dialogPromise instanceof Promise).toBeTruthy()

        expect(() => {
            talk({ commit: () => { }, state: { globalSetting: {} } }, "not a dialogConfigBuilderInstance")
        }).toThrow()
    })
})

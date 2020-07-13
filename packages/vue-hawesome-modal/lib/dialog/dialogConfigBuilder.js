import dialogConfigAttribute from "./dialogConfigAttribute";
import ConfigBuilderBase from "../common/configBuilderBase";

export default class DialogConfigBuilder extends ConfigBuilderBase {

    constructor(content) {
        super(content, dialogConfigAttribute)
    }

    static defaultConfig() {
        return super.defaultConfig(dialogConfigAttribute)
    }
}
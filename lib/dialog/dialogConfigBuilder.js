import dialogConfigAttribute, { dialogSizeArr } from "./dialogConfigAttribute";
import ConfigBuilderBase from "../common/configBuilderBase";

export default class DialogConfigBuilder extends ConfigBuilderBase {

    constructor(content) {
        super(content, dialogConfigAttribute)
    }

    static defaultConfig() {
        return super.defaultConfig(dialogConfigAttribute)
    }

    setSize(size) {
        if (size && typeof size === "string") {
            var dialogSizeItem = dialogSizeArr.find(m => m.type === String(size).toUpperCase())
            if (dialogSizeItem) {
                this.set("maxWidth", dialogSizeItem.width);
                this.set("maxHeight", dialogSizeItem.height);
            }
        }
        return this;
    }
}
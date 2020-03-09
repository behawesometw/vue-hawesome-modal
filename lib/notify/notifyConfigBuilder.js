import notifyConfigAttribute, { typeMappingArr } from "./notifyConfigAttribute";
import ConfigBuilderBase from "../common/configBuilderBase";

export default class NotifyConfigBuilder extends ConfigBuilderBase {
    constructor(content) {
        super(content, notifyConfigAttribute)
    }

    static defaultConfig() {
        return super.defaultConfig(notifyConfigAttribute)
    }

    setTimeout(second) {
        if (typeof second === "number" && second > -1) {
            this.set("timeout", Math.ceil(second));
        }
        return this;
    }

    setType(type) {
        if (type && typeof type === "string") {
            var targetItem = typeMappingArr.find(m => m.type === String(type).toLowerCase())
            if (targetItem) {
                this.set("type", type);
                this.set("icon", targetItem.icon);
            }
        }
        return this;
    }
}
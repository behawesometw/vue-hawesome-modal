import { arrToObj } from "../common/builderHelper";

export default class ConfigBuilderBase {

    constructor(content, configAttributeArr) {
        if (!(content && typeof content == "string")) {
            throw new Error("content must be a string and required.");
        }

        if (!(Array.isArray(configAttributeArr) && configAttributeArr.length > 0)) {
            throw new Error("configAttributeArr must be an array and with at least one element.");
        }

        this._configAttributeArr = configAttributeArr;
        this._configObj = { content };
    }

    static defaultConfig(arr) {
        return arrToObj(arr);
    }

    set(attrName, val) {
        var that = this;
        var targetItem = this._configAttributeArr.find(m => m.name === attrName);
        if (targetItem) {

            if (val === null || val === undefined) {
                return this;
            }

            if (targetItem.cascadeAttr && targetItem.cascadeAttr.length > 0) {
                targetItem.cascadeAttr.forEach(attr => {
                    that._configObj[attr] = val;
                });
                return this;
            } else {
                this._configObj[attrName] = val;
            }
        }
        return this;
    }

    get config() {
        return this._configObj;
    }
}
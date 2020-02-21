import dialogConfigAttribute, { dialogSizeArr } from "./dialogConfigAttribute";


export default class DialogConfigBuilder {

    constructor(content) {

        if (!(content && typeof content == "string")) {
            throw new Error("content must be a string and required.");
        }

        this._dialogConfigObj = { content };
    }

    static defaultConfig() {
        return dialogConfigAttribute.reduce((acc, cur) => {
            acc[cur.name] = cur.defaultVal
            return acc;
        }, {})
    }

    set(attrName, val) {
        var that = this;
        var targetItem = dialogConfigAttribute.find(m => m.name === attrName);
        if (targetItem) {

            if (val === null || val === undefined) {
                return this;
            }

            if (targetItem.cascadeAttr && targetItem.cascadeAttr.length > 0) {
                targetItem.cascadeAttr.forEach(attr => {
                    that._dialogConfigObj[attr] = val;
                });
                return this;
            } else {
                this._dialogConfigObj[attrName] = val;
            }
        }
        return this;
    }

    setSize(size) {
        var dialogSizeItem = dialogSizeArr.find(m => m.type === String(size).toUpperCase())
        if (!(dialogSizeItem)) {
            return this;
        }
        this.set("maxWidth", dialogSizeItem.width);
        this.set("maxHeight", dialogSizeItem.height);
        return this;
    }

    get config() {
        return this._dialogConfigObj;
    }
}
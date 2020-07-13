interface ConfigAttribute {
    name: string;
    defaultVal: any;
    cascadeAttr?: string[];
}

export class ConfigBuilderBase {
    constructor(content: string, configAttributeArr: ConfigAttribute[])

    static defaultConfig(arr: ConfigAttribute[]): Object

    set(attrName: String, val: any): ConfigBuilderBase

    config: Object
}

export class DialogConfigBuilder extends ConfigBuilderBase {
    constructor(content: string)

    static defaultConfig(): Object
}

export class NotifyConfigBuilder extends ConfigBuilderBase {
    constructor(content: string)

    static defaultConfig(): Object

    setTimeout(second: Number)

    setType(type: String)
}

declare module 'vue/types/vue' {

    interface Vue {
        $h: {
            loader: {
                on(loaderText: String): void,
                off(): void,
            },
            dialog: {
                talk(val: String, func: (builder: DialogConfigBuilder) => void): Promise<any>,
                _talk(val: String | DialogConfigBuilder): Promise<any>,
                hangUp(): void
            },
            notify: {
                info(notiText: String, func: (builder: NotifyConfigBuilder) => void): Promise<any>,
                success(notiText: String, func: (builder: NotifyConfigBuilder) => void): Promise<any>,
                warning(notiText: String, func: (builder: NotifyConfigBuilder) => void): Promise<any>,
                error(notiText: String, func: (builder: NotifyConfigBuilder) => void): Promise<any>,
                promise(notiText: String, func: (builder: NotifyConfigBuilder) => void): Promise<any>,
                push(notiText: String, func: (builder: NotifyConfigBuilder) => void): Promise<any>,
                _push(val: String | NotifyConfigBuilder): Promise<any>,
                resolveAllNotify(): void,
                clearAllNotify(): void
            }
        }
    }
}

import DialogConfigBuilder from "./lib/dialog/dialogConfigBuilder";
import NotifyConfigBuilder from "./lib/notify/notifyConfigBuilder";

declare module 'vue/types/vue' {
    interface Vue {
        $loader: {
            on(loaderText: string): void,
            off(): void,
        },
        $dialog: {
            talk(val: string, func: (builder: DialogConfigBuilder) => void): Promise<null>,
            _talk(val: String | DialogConfigBuilder): Promise<null>,
            hangUp(): void
        },
        $notify: {
            info(notiText: string, func: (builder: NotifyConfigBuilder) => void): Promise<null>,
            success(notiText: string, func: (builder: NotifyConfigBuilder) => void): Promise<null>,
            warning(notiText: string, func: (builder: NotifyConfigBuilder) => void): Promise<null>,
            error(notiText: string, func: (builder: NotifyConfigBuilder) => void): Promise<null>,
            promise(notiText: string, func: (builder: NotifyConfigBuilder) => void): Promise<null>,
            push(notiText: string, func: (builder: NotifyConfigBuilder) => void): Promise<null>,
            _push(val: String | NotifyConfigBuilder): Promise<null>,
            resolveAllNotify(): void,
            clearAllNotify(): void
        }
    }
}
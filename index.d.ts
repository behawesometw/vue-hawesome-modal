import Vue from "vue";
import DialogConfigBuilder from "./lib/dialog/dialogConfigBuilder";
import NotifyConfigBuilder from "./lib/notify/notifyConfigBuilder";

declare module 'vue/types/vue' {
    interface Vue {
        $loader: {
            on(loaderText: string): void,
            off(): void,
        },
        $dialog: {
            talk(val: String | DialogConfigBuilder): Promise<null>,
            hangUp(): void
        },
        $notify: {
            info(notiText: string): Promise<null>,
            success(notiText: string): Promise<null>,
            warning(notiText: string): Promise<null>,
            error(notiText: string): Promise<null>,
            promise(notiText: string, type: string): Promise<null>,
            _push(val: String | NotifyConfigBuilder): Promise<null>,
        }
    }
}
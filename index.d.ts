import Vue from "vue";
import DialogConfigBuilder from "./lib/dialog/dialogConfigBuilder";

declare module 'vue/types/vue' {
    interface Vue {
        $loader: {
            on(loaderText: string): void,
            off(): void,
        },
        $dialog: {
            talk(val: String | DialogConfigBuilder): Promise<null>,
            hangUp(): void
        }
    }
}
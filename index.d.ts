import Vue from "vue";

declare module 'vue/types/vue' {
    interface Vue {
        $mask: {
            on(maskText: string): void,
            off(): void,
        }
    }
}
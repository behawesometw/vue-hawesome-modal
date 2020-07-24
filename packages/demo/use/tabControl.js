import { ref, computed } from "@vue/composition-api";

export default () => {
    const tabSync = ref(null);
    const tabs = ref([
        { tabName: "Get Started", path: "/getStarted" },
        { tabName: "Dialog", path: "/dialog" },
        { tabName: "Notify", path: "/notify" },
        { tabName: "Loader", path: "/loader" },
        { tabName: "Tutorial", path: "/tutorial" }
    ])
    const currentRouteIndex = computed(() => {
        if (tabSync.value === null) {
            return 0
        }
        var index = tabs.value.findIndex(m => m.path === tabSync.value)
        return index === -1 ? 0 : index
    })
    const isEnableTabSwipe = ref(false)

    return { tabSync, tabs, currentRouteIndex, isEnableTabSwipe }
}
import { ref, computed } from "@vue/composition-api";

export default (getContext) => {
    const that = getContext();
    const tabSync = ref(null);
    const tabs = ref([
        { tabName: "Get Started", path: "/getStarted" },
        { tabName: "Dialog", path: "/dialog" },
        { tabName: "Notify", path: "/notify" },
        { tabName: "Loader", path: "/loader" },
        { tabName: "Tutorial", path: "/tutorial" }
    ])
    const currentRouteIndex = computed(() => tabs.value.findIndex(m => m.path === that.$route.path))
    const isEnableTabSwipe = ref(false)

    return { tabSync, tabs, currentRouteIndex, isEnableTabSwipe }
}
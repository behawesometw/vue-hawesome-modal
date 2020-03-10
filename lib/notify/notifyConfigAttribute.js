export const typeMappingArr = [
    {
        type: "info",
        icon: "mdi-information-outline",
    },
    {
        type: "success",
        icon: "mdi-shield-check-outline",
    },
    {
        type: "warning",
        icon: "mdi-alert-outline",
    },
    {
        type: "error",
        icon: "mdi-skull-crossbones-outline",
    }
]

export default [
    { name: "content", defaultVal: "" },
    { name: "timeout", defaultVal: 3 },
    { name: "type", defaultVal: "info" },
    { name: "icon", defaultVal: "mdi-information-outline" },
    { name: "resolve", defaultVal: () => { } },
]
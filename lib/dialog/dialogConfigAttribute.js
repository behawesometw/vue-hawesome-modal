export const dialogSizeArr = [
    {
        type: "S",
        width: 300,
        height: 200
    },
    {
        type: "M",
        width: 300,
        height: 500
    },
    {
        type: "L",
        width: 500,
        height: 700
    },
    {
        type: "XL",
        width: 700,
        height: 1000
    }
]

export default [
    { name: "isShow", defaultVal: false },
    { name: "maxWidth", defaultVal: 300 },
    { name: "maxHeight", defaultVal: 500 },
    { name: "themeColor", defaultVal: "", cascadeAttr: ["toolbarColor", "confirmBtnColor"] },
    { name: "toolbarColor", defaultVal: "" },
    { name: "title", defaultVal: "Message" },
    { name: "content", defaultVal: "content" },
    { name: "isShowCancelBtn", defaultVal: true },
    { name: "cancelBtnColor", defaultVal: "" },
    { name: "cancelBtnTxt", defaultVal: "cancel" },
    { name: "isShowConfirmBtn", defaultVal: true },
    { name: "confirmBtnColor", defaultVal: "" },
    { name: "confirmBtnTxt", defaultVal: "confirm" },
    { name: "fullscreen", defaultVal: false },
    { name: "resolve", defaultVal: () => { } },
    { name: "reject", defaultVal: () => { } },
];
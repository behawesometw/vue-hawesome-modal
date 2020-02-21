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
    { name: "title", defaultVal: "訊息" },
    { name: "content", defaultVal: "訊息內容" },
    { name: "isShowCancelBtn", defaultVal: true },
    { name: "cancelBtnColor", defaultVal: "" },
    { name: "cancelBtnTxt", defaultVal: "取消" },
    { name: "isShowConfirmBtn", defaultVal: true },
    { name: "confirmBtnColor", defaultVal: "" },
    { name: "confirmBtnTxt", defaultVal: "確認" },
    { name: "fullscreen", defaultVal: false },
    { name: "resolve", defaultVal: () => { } },
    { name: "reject", defaultVal: () => { } },
];
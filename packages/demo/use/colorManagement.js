import { ref, computed, inject } from "@vue/composition-api";

export default () => {
    const that = inject('$root')

    const colorInput = ref("primary")

    const colorPick = ref("#1976d2FF")

    const colorInputBlur = () => {
        if (colorInput.value) {
            that.$h.theme.setColor(colorInput.value)
        }
    }

    const colorPickChange = () => {
        if (colorPick.value) {
            that.$h.theme.setColor(colorPick.value)
        }
    }

    const isDarkTheme = computed(() => that.$vuetify.theme.dark)

    const toolbarColor = computed(() => isDarkTheme.value ? "" : that.hGlobalThemeColor)

    const titleColorClass = computed(() => ({ [`${that.hGlobalThemeColor}--text`]: isDarkTheme.value }))

    const titleColorStyle = computed(() => isDarkTheme.value ? { [`color`]: that.hGlobalThemeColor } : {})

    const darkThemeToggle = () => {
        var context = that;
        context.$vuetify.theme.dark = !context.$vuetify.theme.dark;

        var prismDefaultTheme = document.getElementById("_prismDefaultTheme");
        prismDefaultTheme.disabled = context.$vuetify.theme.dark;

        document.body.style.background = context.$vuetify.theme.dark ? "#1e1e1e" : ""
    }
    return { colorInput, colorPick, colorInputBlur, colorPickChange, isDarkTheme, toolbarColor, titleColorClass, titleColorStyle, darkThemeToggle }
}
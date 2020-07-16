import { ref, computed } from "@vue/composition-api";

export default (getContext) => {
    const colorInput = ref("primary")

    const colorPick = ref("#1976d2FF")

    const colorInputBlur = () => {
        if (colorInput.value) {
            getContext().$store.commit("theme/setColor", colorInput.value);
        }
    }

    const colorPickChange = () => {
        if (colorPick.value) {
            getContext().$store.commit("theme/setColor", colorPick.value);
        }
    }

    const globalThemeColor = computed(() => getContext().$store.state.theme.color)

    const isDarkTheme = computed(() => getContext().$vuetify.theme.dark)

    const toolbarColor = computed(() => isDarkTheme.value ? "" : globalThemeColor.value)

    const titleColorClass = computed(() => ({ [`${globalThemeColor.value}--text`]: isDarkTheme.value }))

    const titleColorStyle = computed(() => isDarkTheme.value ? { [`color`]: globalThemeColor.value } : {})

    const darkThemeToggle = () => {
        var context = getContext();
        context.$vuetify.theme.dark = !context.$vuetify.theme.dark;

        var prismDefaultTheme = document.getElementById("_prismDefaultTheme");
        prismDefaultTheme.disabled = context.$vuetify.theme.dark;
    }
    return { colorInput, colorPick, colorInputBlur, colorPickChange, globalThemeColor, isDarkTheme, toolbarColor, titleColorClass, titleColorStyle, darkThemeToggle }
}
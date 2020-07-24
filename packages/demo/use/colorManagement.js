import { ref, computed, inject } from "@vue/composition-api";

export default () => {
    const that = inject('$root')

    const colorInput = ref("primary")

    const colorPick = ref("#1976d2FF")

    const colorInputBlur = () => {
        if (colorInput.value) {
            that.$store.commit("theme/setColor", colorInput.value);
        }
    }

    const colorPickChange = () => {
        if (colorPick.value) {
            that.$store.commit("theme/setColor", colorPick.value);
        }
    }

    const globalThemeColor = computed(() => that.$store.state.theme.color)

    const isDarkTheme = computed(() => that.$vuetify.theme.dark)

    const toolbarColor = computed(() => isDarkTheme.value ? "" : globalThemeColor.value)

    const titleColorClass = computed(() => ({ [`${globalThemeColor.value}--text`]: isDarkTheme.value }))

    const titleColorStyle = computed(() => isDarkTheme.value ? { [`color`]: globalThemeColor.value } : {})

    const darkThemeToggle = () => {
        var context = that;
        context.$vuetify.theme.dark = !context.$vuetify.theme.dark;

        var prismDefaultTheme = document.getElementById("_prismDefaultTheme");
        prismDefaultTheme.disabled = context.$vuetify.theme.dark;
    }
    return { colorInput, colorPick, colorInputBlur, colorPickChange, globalThemeColor, isDarkTheme, toolbarColor, titleColorClass, titleColorStyle, darkThemeToggle }
}
import { onMounted, onUnmounted, ref } from "@vue/composition-api";

export default (threshold = 50) => {
    const isTgrScrollThreshold = ref(false)
    onMounted(() => {
        document.addEventListener("scroll", scrollDetect)
    })
    onUnmounted(() => {
        document.removeEventListener("scroll", scrollDetect);
    })
    const scrollDetect = () => {
        isTgrScrollThreshold.value = document.scrollingElement.scrollTop > threshold;
    }
    return { isTgrScrollThreshold }
}
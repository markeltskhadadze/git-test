import { ref, computed, onMounted } from 'vue'

export const screen = {
    setup() {
        const width = ref(0)

        const checkScreen = computed(() => {
            return width.value >= 900
        })

        onMounted(() => {
            if (process.client) {
                width.value = window.innerWidth
                window.addEventListener('resize', () => {
                    width.value = window.innerWidth
                })
            }
        })

        return {
            checkScreen,
            width
        }
    }
}
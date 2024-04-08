import { defineStore } from 'pinia'
import { ref, reactive, type Ref } from 'vue'
import type { TMessages } from '~/types'

export const chatMessages = defineStore('chatMessages', () => {
    const messageData: Ref<string> = ref('')
    const showMobileSideNav: Ref<boolean> = ref(false)
    const loader: Ref<boolean> = ref(false)
    const showNewChat: Ref<boolean> = ref(true)
    const chatTrees = reactive<TMessages[]>([])
    const textCopied: Ref<boolean> = ref(false)
    const currentMessage = ref<number | null>(null)
    const { chatCompletion } = useChatgpt()

    async function getChatTree(exampleQuestion: string) {
        showNewChat.value = false
        loader.value = true
        const userMessage = messageData.value ? messageData.value : exampleQuestion
        if (userMessage) {
            try {
                const message: TMessages = {
                    role: 'user',
                    content: userMessage,
                }
                chatTrees.push(message)

                const response = await chatCompletion(chatTrees)
                const responseMessage = {
                    role: response[0].message.role,
                    content: response[0].message.content
                }
                loader.value = false
                messageData.value = ''
                chatTrees.push(responseMessage)
                showNewChat.value = false
            } catch(error: any) {
                chatTrees.length = 0
                loader.value = false
                push.error(error.message)
                showNewChat.value = true
            }
        }
    }

    function copyMessage(message: string, index: number) {
        navigator.clipboard.writeText(message)
            .then(() => {
                if (currentMessage.value !== null) {
                    clearTimeout(currentMessage.value)
                }
                currentMessage.value = index
                setTimeout(() => {
                    currentMessage.value = null
                }, 1500)
            })
            .catch((error) => {
                push.error(error)
            })
    }

    function speakMessage(message: string) {
        const speechSynthesis = window.speechSynthesis
        const utterance = new SpeechSynthesisUtterance(message)
        speechSynthesis.speak(utterance)
    }

    return {
        messageData,
        showMobileSideNav,
        chatTrees,
        showNewChat,
        textCopied,
        currentMessage,
        loader,
        speakMessage,
        getChatTree,
        copyMessage
    }
})
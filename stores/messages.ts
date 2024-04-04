import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import type { TMessages } from '~/types'

export const chatMessages = defineStore('chatMessages', () => {
    const messageData = ref('')
    const showMobileSideNav: Ref<boolean> = ref(false)
    const showNewChat: Ref<boolean> = ref(true)
    const chatTrees = reactive<TMessages[]>([])
    const { chatCompletion } = useChatgpt()

    async function getChatTree(exampleQuestion: string | null) {
        showNewChat.value = false
        if (messageData.value || exampleQuestion) {
            try {
                const message = {
                    role: 'user',
                    content: exampleQuestion ? exampleQuestion : messageData.value,
                }
                chatTrees.push(message)

                const response = await chatCompletion(chatTrees)
                const responseMessage = {
                    role: response[0].message.role,
                    content: response[0].message.content
                }
                messageData.value = ''
                chatTrees.push(responseMessage)
            } catch(error) {
                alert(`Join the waiting list if you want to use GPT-4 models: ${error}`)
                showNewChat.value = true
            }
        }
    }

    return {
        messageData,
        showMobileSideNav,
        chatTrees,
        showNewChat,
        getChatTree
    }
})
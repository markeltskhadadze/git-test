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

    async function getChatTree(exampleQuestion: string) {
        showNewChat.value = false
        const userMessage = messageData.value ? messageData.value : exampleQuestion
        if (userMessage) {
            try {
                const message = {
                    role: 'user',
                    content: userMessage
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
                push.error(error.message)
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
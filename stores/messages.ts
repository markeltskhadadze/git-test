import { defineStore } from 'pinia'
import {computed, ref, Ref, reactive } from 'vue'
import type { TMessages } from '~/types'

export const chatMessages = defineStore('chatMessages', () => {
    const allMessages: Ref<string[]> = ref([])
    const messageData = ref('')
    const showMobileSideNav: Ref<boolean> = ref(false)
    const showNewChat: Ref<boolean> = ref(true)
    const chatTrees = reactive<TMessages[]>([])
    const { chatCompletion } = useChatgpt()

    const getAllMessages = computed(() => allMessages.value)

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
                console.log(chatTrees)
            } catch(error) {
                alert(`Join the waiting list if you want to use GPT-4 models: ${error}`)
                showNewChat.value = true
            }
        }
    }

    return {
        allMessages,
        messageData,
        showMobileSideNav,
        chatTrees,
        getAllMessages,
        showNewChat,
        getChatTree
    }
})
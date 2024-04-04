import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import { chatMessages } from '@/stores/messages'

export const chatTree = defineStore('chatTree', () => {
    const userMessages = chatMessages()
    const chatHover: Ref<number | null> = ref(null)
    const userChats: Ref<string[]> = ref(['New chat'])
    const showModal: Ref<boolean> = ref(false)

    function showChatActions(index: number) {
        chatHover.value = chatHover.value? null : index
    }

    function showActionModal() {
        showModal.value = !showModal.value
    }

    function addNewChatGroup() {
        if (!userMessages.chatTrees.length) {
            userChats.value = [...userChats.value, 'New chat']
            userMessages.showNewChat = true
        } else {
            userChats.value = [...userChats.value, userMessages.chatTrees[0].content]
            userMessages.chatTrees.length = 0
            userMessages.showNewChat = true

        }
    }

    return {
        userChats,
        chatHover,
        showModal,
        showChatActions,
        showActionModal,
        addNewChatGroup
    }
})
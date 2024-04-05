import { defineStore } from 'pinia'
import { ref, type Ref, toRaw } from 'vue'
import { chatMessages } from '@/stores/messages'

export const chatTree = defineStore('chatTree', () => {
    const userMessages = chatMessages()
    const chatHover: Ref<number | null> = ref(null)
    const userChats: Ref<string[]> = ref(['New chat'])
    const selectedChats: Ref<boolean[]> = ref(Array(userChats.value.length).fill(false))
    const selectAll: Ref<boolean> = ref(false)
    const showActionModal: Ref<boolean[]> = ref([])

    const getSelectedChats = computed(() => {
        return selectedChats.value.some(i => i)
    })

    function addNewChatGroup() {
        if (!userMessages.chatTrees.length) {
            userChats.value = [...userChats.value, 'New chat']
            userMessages.showNewChat = true
            selectedChats.value.length = userChats.value.length
        } else {
            userChats.value = [...userChats.value, userMessages.chatTrees[0].content]
            userMessages.chatTrees.length = 0
            userMessages.showNewChat = true
            selectedChats.value.length = userChats.value.length
        }
    }

    function deleteChat (index: number | object) {
        if (typeof index === 'number') {
            userChats.value.splice(index, 1)
        } else {
            selectAll.value = false
            selectedChats.value = selectedChats.value.fill(selectAll.value)
            userChats.value.length = 0
        }
    }

    function selectAllChats() {
        const newValue = selectAll.value
        selectedChats.value = selectedChats.value.fill(newValue)
    }

    return {
        userChats,
        chatHover,
        selectedChats,
        selectAll,
        showActionModal,
        getSelectedChats,
        addNewChatGroup,
        deleteChat,
        selectAllChats
    }
})
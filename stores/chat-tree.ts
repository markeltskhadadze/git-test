import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { chatMessages } from '@/stores/messages'

export const chatTree = defineStore('chatTree', () => {
    const userMessages = chatMessages()
    const chatHover: Ref<number | null> = ref(null)
    const userChats: Ref<string[]> = ref(['New chat', 'q23123', 'asdfhjsdf', 'gdfb'])
    const selectedChats: Ref<boolean[]> = ref(Array(userChats.value.length).fill(false))
    const selectAll: Ref<boolean> = ref(false)
    const showActionModal: Ref<boolean[]> = ref([])
    const selectedChatsIndex: Ref<number[]> = ref([])
    const openAcceptModal: Ref<boolean> = ref(false)

    const getSelectedChats = computed(() => {
        return selectedChats.value.some(i => i)
    })

    const getSelectedChatCount = computed(() => {
        return selectedChatsIndex.value.length ? selectedChatsIndex.value.length : 'all'
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

    function deleteChat () {
        if (selectedChatsIndex.value.length) {
            userChats.value = userChats.value.filter((_, index) => !selectedChatsIndex.value.includes(index))
        } else {
            selectAll.value = false
            userChats.value.length = 0
        }
        selectedChats.value = selectedChats.value.fill(selectAll.value)
        openAcceptModal.value = false
    }

    function checkboxClick(index: number) {
        const indexExists = selectedChatsIndex.value.indexOf(index)
        indexExists === -1
            ? selectedChatsIndex.value.push(index)
            : selectedChatsIndex.value.splice(indexExists, 1)
    }

    function selectAllChats() {
        selectedChats.value = selectedChats.value.fill(selectAll.value)
    }

    return {
        userChats,
        chatHover,
        selectedChats,
        selectAll,
        showActionModal,
        getSelectedChats,
        openAcceptModal,
        getSelectedChatCount,
        checkboxClick,
        addNewChatGroup,
        deleteChat,
        selectAllChats
    }
})
<template>
  <div class="flex">
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
    <ChatSideNav v-if="checkScreen || userMessages.showMobileSideNav" />
    <ChatMessageContent />
  </div>
</template>

<script setup>
  import ChatSideNav from '~/components/parts/ChatSideNav.vue'
  import ChatMessageContent from '~/components/parts/ChatMessageContent.vue'
  import { screen } from '~/mixins/check-screen'
  import { chatMessages } from '~/stores/messages'

  const { checkScreen } = screen.setup()
  const userMessages = chatMessages()
</script>

<style scoped>
.message-container {
  flex: 1 0 80%;
  background: #212121;
}
</style>
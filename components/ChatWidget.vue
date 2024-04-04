<template>
  <div class="main-container">
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
.main-container {
  display: flex;
  min-height: 100vh;
}
</style>
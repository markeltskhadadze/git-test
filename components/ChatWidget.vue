<template>
  <div v-if="width" class="main-container">
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
    <transition name="fade">
      <ChatSideNav :class="{ 'hidden 2xl:block': !userMessages.showMobileSideNav, '2xl:block': userMessages.showMobileSideNav }" />
    </transition>
    <ChatMessageContent />
  </div>
</template>

<script setup>
  import ChatSideNav from '~/components/parts/ChatSideNav.vue'
  import ChatMessageContent from '~/components/parts/ChatMessageContent.vue'
  import { screen } from '~/mixins/check-screen'
  import { chatMessages } from '~/stores/messages'

  const { width } = screen.setup()
  const userMessages = chatMessages()
</script>

<style scoped>
.main-container {
  display: flex;
  min-height: 100vh;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
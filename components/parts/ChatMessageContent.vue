<template>
  <div class="message-container">
<!--    <div-->
<!--        class="hide-side-nav"-->
<!--        @click="userMessages.showMobileSideNav = !userMessages.showMobileSideNav"-->
<!--    >-->
<!--      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">-->
<!--        <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />-->
<!--      </svg>-->
<!--    </div>-->
    <MessageHeader />
    <div>
      <div
          class="messages-wrapper"
          :class="{ 'messages-wrapper-mobile mx-6': !checkScreen }"
      >
        <div
            class="flex gap-2 m-3"
            v-for="(chat, index) in userMessages.chatTrees" :key="index"
        >
          <img
              class="user-logo"
              src="../../public/admin-logo.jpeg"
              alt="chat-logo"
          />
          <div class="message-content">
            <p class="message-text">{{ chat.role }}</p>
            <p class="message-text">{{ chat.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="message-field"
      :class="{ 'message-field-mobile': !checkScreen }"
    >
      <ExampleOfQuestions v-if="userMessages.showNewChat" />
      <div class="relative">
        <input
            placeholder="Message ChatGPT…"
            v-model="userMessages.messageData"
            @keyup.enter="userMessages.getChatTree"
        />
        <div
            @click="userMessages.getChatTree"
            :style="{ 'background': !userMessages.messageData ? '#3d3d3d' : '#ffffff' }"
            class="send-arrow relative"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path class="send-arrow" stroke-linecap="round" stroke-linejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
          </svg>
          <span class="tooltip-text">Send Message</span>
        </div>
      </div>
      <p class="mistakes-text">ChatGPT can make mistakes. Consider checking important information.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import MessageHeader from '~/components/parts/MessageHeader.vue'
  import ExampleOfQuestions from '~/components/parts/ExampleOfQuestions.vue'
  import { chatMessages } from '~/stores/messages'
  import { screen } from '~/mixins/check-screen'

  const userMessages = chatMessages()
  const { checkScreen } = screen.setup()
</script>

<style scoped>
  .message-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 80%;
    background: #212121;
    position: relative;
    overflow-x: hidden;
  }
  .messages-wrapper {
    min-width: 650px;
    margin: 40px auto 0;
    flex: 1 0 80%;
    padding: 8px 16px;
    overflow-y: auto;
  }
  .message-field {
    max-width: 750px;
  }
  .message-content {
    max-width: 650px;
  }
  .message-field input {
    color: #909090;
    max-height: 52px;
    width: 100%;
    overflow-y: hidden;
    background: transparent;
    border-radius: 12px;
    border: 1px solid #909090;
    padding: 14px 48px 14px 16px;
  }
  input {
    outline:none;
  }
  .mistakes-text {
    padding: 12px 60px;
    text-align: center;
    color: #909090;
    font-size: 12px;
  }
  .message-text {
    color: #ececec;
    font-size: 16px;
  }
  .send-arrow {
    object-fit: contain;
    position: absolute;
    right: 2%;
    top: 20%;
    padding: 3px;
    border-radius: 8px;
    cursor: pointer;
    color: #1d1d1d;
  }
  .hide-side-nav {
    position: absolute;
    top: 50%;
    right: 99%;
    width: 10px;
    height: 20px;
    cursor: pointer;
    color: #ececec;
  }
  .user-logo {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  .tooltip-text {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
  }
  .send-arrow:hover .tooltip-text {
    visibility: visible;
  }
  .message-field-mobile {
    min-width: 90%;
    margin: 0 15px;
  }
  .messages-wrapper-mobile {
    min-width: 400px;
  }
</style>
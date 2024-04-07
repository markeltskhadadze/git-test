<template>
  <div class="message-container">
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
            <div
                class="flex items-center gap-2 mt-2"
                v-if="chat.role === 'assistant'"
            >
              <svg @click="userMessages.speakMessage(chat.content)" xmlns="http://www.w3.org/2000/svg" class="message-action-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <svg v-if="userMessages.currentMessage !== index" @click="userMessages.copyMessage(chat.content, index)" xmlns="http://www.w3.org/2000/svg" class="message-action-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <svg v-if="userMessages.currentMessage === index" xmlns="http://www.w3.org/2000/svg" class="message-action-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" class="message-action-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" class="message-action-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
            </div>
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
    min-width: 750px;
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
  .message-action-icon {
    color: #686868;
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
  .message-action-icon:hover {
    color: #ffffff;
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
<template>
  <div class="message-container">
    <div
        @click="userMessages.showMobileSideNav = !userMessages.showMobileSideNav"
        class="hide-side-nav"
    ></div>
    <MessageHeader />
    <div>
      <div
          class="messages-wrapper"
          :class="{ 'messages-wrapper-mobile': !checkScreen }"
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
        <img
            src="../../public/arrow-icon.png"
            :style="{ 'background': !userMessages.messageData ? '#3d3d3d' : '#ffffff' }"
            class="send-arrow"
            alt="send-message"
            @click="userMessages.getChatTree"
        />
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
    height: 100vh;
    position: relative;
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
    width: 30px;
    height: 30px;
    right: 2%;
    top: 20%;
    transform: rotate(-90deg);
    padding: 3px;
    border-radius: 8px;
    cursor: pointer;
  }
  .hide-side-nav {
    content: '';
    position: absolute;
    top: 50%;
    right: 99%;
    width: 10px;
    height: 20px;
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;
    border-left: 2px solid #3d3d3d;
    transition: transform 0.3s ease;
    cursor: pointer;
  }
  .hide-side-nav:hover {
    transform: rotate(45deg);
    height: 16px;
    width: 15px;
    border-width: 0 0 4px 4px;
    border-color: #3d3d3d;
    border-style: solid;
    border-radius: 0 0 0 4px;
    transition: transform 0.3s ease;
  }
  .user-logo {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  .message-field-mobile {
    min-width: 90%;
  }
  .messages-wrapper-mobile {
    min-width: 100%;
  }
</style>
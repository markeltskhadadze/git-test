<template>
  <div class="flex flex-col gap-20">
    <div class="flex flex-col items-center">
      <img
          class="logo"
          src="../../public/chatgpt-logo.jpeg"
          alt="help-icon"
      />
      <h2>How can I help you today?</h2>
    </div>
    <div class="flex flex-wrap gap-3 mb-3" :class="{ 'justify-center': !checkScreen }">
      <div
          class="questions-block relative"
          v-for="(question, index) in questions.examples"
          :key="index"
          @click="userMessages.getChatTree(question.title)"
      >
        <p>{{ question.title }}</p>
        <p class="opacity-50">{{ question.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { examplesOfQuestion } from '~/stores/questions-example'
  import { chatMessages } from '~/stores/messages'
  import { screen } from '~/mixins/check-screen'

  const questions = examplesOfQuestion()
  const userMessages = chatMessages()
  const { checkScreen } = screen.setup()
</script>

<style scoped>
  .questions-block {
    padding: 12px 16px;
    border: 1px solid #ececec;
    border-radius: 10px;
    flex: 1 0 45%;
    cursor: pointer;
    max-width: 365px;
  }
  .questions-block:hover {
    background: #2e2e2e;
  }
  h2 {
    color: #ececec;
    font-size: 24px;
  }
  .questions-block p {
    font-size: 14px;
    color: #ececec;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 95%;
  }
  .logo {
    max-width: 48px;
    max-height: 48px;
    border-radius: 50%;
  }
</style>
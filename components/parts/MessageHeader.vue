<template>
  <div class="message-header">
    <p
        v-if="!checkScreen"
        @click="userMessages.showMobileSideNav = !userMessages.showMobileSideNav"
    >
      Click
    </p>
    <p>ChatGPT</p>
    <img
        src="../../public/upload-icon.png"
        alt="upload-image"
        class="upload-image"
    />
  </div>
</template>

<script setup>
  import { screen } from '~/mixins/check-screen'
  import { chatMessages } from '~/stores/messages'

  const { checkScreen } = screen.setup()
  const userMessages = chatMessages()
</script>

<style scoped>
  .message-header {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: -webkit-fill-available;
    padding: 20px 15px;
  }
  .message-header p {
    font-size: 18px;
    color: #ffffffff;
  }
  .upload-image {
    width: 18px;
    height: 18px;
    padding: 15px;
  }
</style>
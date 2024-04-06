<template>
  <div class="message-header">
    <img
        src="../../public/menu-icon.webp"
        alt="upload-image"
        class="upload-image block 2xl:hidden"
        @click="userMessages.showMobileSideNav = !userMessages.showMobileSideNav"
    />
    <p>ChatGPT</p>
    <div class="upload-block">
      <svg xmlns="http://www.w3.org/2000/svg" class="upload-image h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    </div>
  </div>
</template>

<script setup>
  import { chatMessages } from '~/stores/messages'

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
    color: #ffffff;
  }
  .upload-block {
    padding: 10px;
    background: #3d3d3d;
    border-radius: 12px;
    cursor: pointer;
  }
  .upload-block:hover {
    background: #909090;
  }
</style>
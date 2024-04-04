<template>
 <div :class="{ 'mobile-side-nav': !checkScreen }" class="side-nav-container">
   <div v-if="!checkScreen" class="close-side-nav">
     <p>x</p>
   </div>
   <div class="side-nav-header" @click="userChatTree.addNewChatGroup">
     <img
         class="chat-logo"
         src="../../public/chatgpt-logo.jpeg"
          alt="chat-logo"
     />
     <p>New chat</p>
   </div>
   <div class="chat-list">
     <div
         class="user-chat"
         v-for="(chat, index) in userChatTree.userChats"
         :key="index"
         @mouseover="userChatTree.showChatActions(index)"
         @mouseleave="userChatTree.showChatActions(index)"
     >
       <p>{{ chat }}</p>
       <div
           class="relative"
            v-if="userChatTree.chatHover === index"
       >
         <p>...</p>
       </div>
     </div>
   </div>
 </div>
</template>

<script setup lang="ts">
  import { screen } from '~/mixins/check-screen'
  import { chatTree } from '~/stores/chat-tree'

  const userChatTree = chatTree()
  const { checkScreen } = screen.setup()
</script>

<style scoped>
  .side-nav-container {
    height: 100vh;
    background: #181818;
    flex: 1 0 115px;
    padding: 10px 20px;
    overflow-y: auto;
  }
  .side-nav-container::-webkit-scrollbar {
    width: 0;
  }
  .side-nav-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
  }
  .side-nav-header:hover {
    background: #212121;
    border-radius: 8px;
  }
  .side-nav-header p {
    color: #ececec;
    font-size: 14px;
  }
  .user-chat {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .user-chat:hover {
    background: #212121;
    border-radius: 8px;
  }
  .user-chat p {
    color: #ececec;
    font-size: 14px;
    padding: 8px;
    //white-space: nowrap;
    overflow: hidden;
  }
  .action-chat-modal {
    position: absolute;
    z-index: 50;
    background: #2e2e2e;
    border-radius: 12px;
  }
  .action-chat-modal p {
    margin: 6px;
    padding: 10px;
    color: #ffffff;
  }
  .close-side-nav {
    background: #181818;
  }
  .chat-list {
    margin-top: 25px;
  }
  .chat-logo {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
  .mobile-side-nav {
    position: fixed;
    z-index: 50;
    min-width: 60%;
  }
</style>
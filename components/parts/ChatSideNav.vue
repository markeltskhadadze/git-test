<template>
 <div :class="{ 'mobile-side-nav': !checkScreen }" class="side-nav-container">
   <div v-if="!checkScreen" class="close-side-nav">
     <img
         @click="userMessages.showMobileSideNav = !userMessages.showMobileSideNav"
         src="../../public/1544641784.png"
         alt="close-side-nav"
     />
   </div>
   <div class="side-nav-header" @click="userChatTree.addNewChatGroup">
     <div class="flex gap-3 items-center">
       <img
           class="chat-logo"
           src="../../public/chatgpt-logo.jpeg"
           alt="chat-logo"
       />
       <p>New chat</p>
     </div>
     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
       <path class="add-chat" stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
     </svg>
   </div>
   <div v-if="userChatTree.userChats.length" class="chat-list">
     <div class="flex items-center justify-between relative">
       <input
           type="checkbox"
           v-model="userChatTree.selectAll"
           @change="userChatTree.selectAllChats"
       />
       <p class="chat-list-title">Archive</p>
       <transition name="fade">
         <button
             class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
             @click="userChatTree.deleteChat"
             v-if="userChatTree.selectAll"
         >
           Delete all
         </button>
       </transition>
     </div>
     <div
         class="user-chat relative"
         v-for="(chat, index) in userChatTree.userChats"
         :key="index"
     >
       <input
           type="checkbox"
           v-model="userChatTree.selectedChats[index]"
       />
       <p>{{ chat }}</p>
       <p>...</p>
       <transition name="fade">
         <button
             class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
             v-if="userChatTree.selectedChats[index] && !userChatTree.selectAll"
             @click="userChatTree.deleteChat(index)"
         >
           Delete
         </button>
       </transition>
     </div>
   </div>
 </div>
</template>

<script setup lang="ts">
  import { screen } from '~/mixins/check-screen'
  import { chatTree } from '~/stores/chat-tree'
  import { chatMessages } from '~/stores/messages'

  const userChatTree = chatTree()
  const { checkScreen } = screen.setup()
  const userMessages = chatMessages()
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.4s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .side-nav-container {
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
    justify-content: space-between;
    gap: 10px;
    padding: 10px 0;
    cursor: pointer;
    width: 95%;
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
    overflow: hidden;
  }
  .add-chat {
    color: #ffffffff;
  }
  .close-side-nav {
    background: #181818;
    width: 16px;
    position: absolute;
    right: 15px;
  }
  .chat-list {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .chat-logo {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
  .chat-list-title {
    color: #e8e8e8;
    padding: 8px;
  }
  input[type=checkbox] {
    cursor: pointer;
    width: 20px;
    height: 0;
  }
  input[type=checkbox]:checked:before {
    content: "";
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    border: 4px solid #e8e8e8;
    border-radius: 20px;
    background-color: #445768;
    transition: all 0.2s linear;
  }
  input[type=checkbox]:before {
    content: "";
    display: block;
    position: absolute;
    top: 25%;
    width: 20px;
    height: 20px;
    border: 1px solid #ffffff;
    border-radius: 3px;
    background-color: #445768;
  }
  input[type=checkbox]:after {
    content: "";
    display: block;
    width: 0px;
    height: 0px;
    border: solid #e8e8e8;
    border-width: 0 0px 0px 0;
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    position: absolute;
    top: 0;
    left: 50px;
    transition: all 0.2s linear;
  }
  input[type=checkbox]:checked:after {
    content: "";
    display: block;
    width: 12px;
    height: 21px;
    border: solid #ececec;
    border-width: 0 5px 5px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    top: 3px;
    left: 7px;
  }
  .mobile-side-nav {
    position: fixed;
    z-index: 50;
    min-width: 60%;
    height: 100%;
  }
</style>
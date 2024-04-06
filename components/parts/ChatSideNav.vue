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
     <div class="flex items-center justify-between relative px-2">
       <div class="flex items-center">
         <input
             type="checkbox"
             v-model="userChatTree.selectAll"
             @change="userChatTree.selectAllChats"
         />
         <p class="chat-list-title">Yesterday</p>
       </div>
       <transition name="fade">
         <div
             @click="userChatTree.openAcceptModal = !userChatTree.openAcceptModal"
             v-if="userChatTree.selectAll || userChatTree.getSelectedChats"
         >
           <svg xmlns="http://www.w3.org/2000/svg" class="delete-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
             <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
           </svg>
         </div>
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
           @click="userChatTree.checkboxClick(index)"
       />
       <div class="flex justify-between items-center w-full">
         <input
             class="edit-chat-field"
             :value="chat"
             :disabled="!userChatTree.showActionModal.includes(index)"
             :style="{ 'border': userChatTree.showActionModal.includes(index) ? '1px solid' : 'none' }"
             @keyup.enter="userChatTree.changeChatName(index, $event)"
         />
         <svg @click="userChatTree.toggleEditName(index)" xmlns="http://www.w3.org/2000/svg" class="edit-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
           <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
         </svg>
       </div>
     </div>
   </div>
   <AcceptModal />
 </div>
</template>

<script setup lang="ts">
  import { screen } from '~/mixins/check-screen'
  import { chatTree } from '~/stores/chat-tree'
  import { chatMessages } from '~/stores/messages'
  import AcceptModal from '~/components/parts/AcceptModal.vue'

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
    padding: 10px 20px;
    overflow-y: auto;
    min-width: 300px;
  }
  .side-nav-container::-webkit-scrollbar {
    width: 0;
  }
  .side-nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 8px;
    cursor: pointer;
  }
  .side-nav-header:hover {
    background: #212121;
    border-radius: 8px;
  }
  .side-nav-header p {
    color: #ececec;
    font-size: 14px;
    font-weight:600
  }
  .delete-icon {
    color: #96393a;
    width: 20px;
    cursor: pointer;
  }
  .user-chat {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: 0 8px;
  }
  .user-chat:hover {
    background: #212121;
    border-radius: 8px;
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
  .edit-chat-field {
    background: transparent;
    border-radius: 10px;
    max-width: 75%;
    margin: 0 9px;
    color: #ececec;
    font-size: 14px;
    padding: 8px;
    font-weight: 500;
  }
  .edit-icon {
    color: #ffffff;
    margin-right: 10px;
  }
  .chat-logo {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
  .chat-list-title {
    color: #e8e8e8;
    padding: 6px 8px;
    font-weight: 600;
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
    border: 2px solid #e8e8e8;
    border-radius: 20px;
    background-color: transparent;
    transition: all 0.2s linear;
  }
  input[type=checkbox]:before {
    content: "";
    display: block;
    position: absolute;
    top: 25%;
    left: 3%;
    width: 20px;
    height: 20px;
    border: 1px solid #ffffff;
    border-radius: 3px;
    background-color: transparent;
  }
  input[type=checkbox]:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: solid #e8e8e8;
    border-width: 0 0 0 0;
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
    border-width: 0 4px 4px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    top: 3px;
    left: 15px;
  }
  .mobile-side-nav {
    position: fixed;
    z-index: 30;
    min-width: 60%;
    height: 100%;
  }
</style>
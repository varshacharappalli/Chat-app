import React, { useEffect } from 'react'
import { userChatStore } from '../store/userChatStore'
import ChatHeader from './ChatHeader';
import Input from './Input';
import MessageSkeleton from './skeletons/MessageSkeleton';



const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser}=userChatStore();

  useEffect(()=>{
    getMessages(selectedUser._id);
  },[selectedUser._id,getMessages]);

  if (isMessagesLoading) return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  );
  

  return (
    <div>
      <ChatHeader/>
      <p>Loading..</p>
      <Input/>
    </div>
  )
}

export default ChatContainer

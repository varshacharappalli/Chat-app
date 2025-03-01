import React, { useEffect } from 'react'
import { userChatStore } from '../store/userChatStore'
import ChatHeader from './ChatHeader';
import Input from './Input';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { userAuthStore } from '../store/userAuthStore';
import { formatMessageTime } from '../lib/utils';



const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser}=userChatStore();
  const {authUser}=userAuthStore();

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
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <Input/>
    </div>
  )
}

export default ChatContainer

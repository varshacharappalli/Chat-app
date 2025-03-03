import React, { useEffect, useRef } from 'react';
import { userChatStore } from '../store/userChatStore';
import ChatHeader from './ChatHeader';
import Input from './Input';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { userAuthStore } from '../store/userAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unsubscribeToMessages} = userChatStore();
  const { authUser } = userAuthStore();
  const messageEndRef = useRef(null); // Fix: Declare messageEndRef

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
      subscribeToMessages();

      return ()=>{
        unsubscribeToMessages();
      }
    }
  }, [selectedUser, getMessages]); // Fix: Use `selectedUser` directly

  // Scroll to the latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) return <div className="flex-1 flex justify-center items-center">Select a user to start chatting</div>;

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <Input />
      </div>
    );

  return (
    <div className="flex flex-col h-full w-full">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser?.profilePic || "/avatar.png"
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
        <div ref={messageEndRef} /> {/* Fix: Add reference for auto-scroll */}
      </div>
      <Input />
    </div>
  );
};

export default ChatContainer;

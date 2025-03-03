import { useEffect, useState } from "react";
import {userChatStore} from '../store/userChatStore';
import SidebarSkeleton from "./skeletons/SideBarSkeleton";
import { Users } from "lucide-react";
import { userAuthStore } from "../store/userAuthStore";

const Sidebar = () => {
  const {onlineUsers} = userAuthStore();
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = userChatStore();
    
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;
      
  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-base-300 transition-colors
                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
                {/* Always show status indicator with different colors */}
                <span
                  className={`absolute bottom-0 right-0 size-3 
                   rounded-full ring-2 ring-zinc-900
                   ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}
                />
              </div>
              
              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullname}</div>
                {/*<div className="text-sm text-zinc-400">
                  {isOnline ? "Online" : "Offline"}
                </div>*/}
              </div>
            </button>
          );
        })}
        
        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
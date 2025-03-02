
import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';
import SideBar from '../components/SideBar';

import {userChatStore} from '../store/userChatStore';
import {userAuthStore} from '../store/userAuthStore';



const HomePage = () => {
    const { selectedUser } = userChatStore();
    const {onlineUsers}=userAuthStore();
    

    return (
        <div className="h-screen bg-base-200">
            <div className="flex items-center justify-center pt-20 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-5rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <SideBar />
                        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;


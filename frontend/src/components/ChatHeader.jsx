import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullname} />
            </div>
          </div>

          {/* User info */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{selectedUser.fullname}</h3>
              {onlineUsers.includes(selectedUser._id) ? (
                <span className="size-2 bg-green-500 rounded-full" />
              ) : (
                <span className="size-2 bg-zinc-500 rounded-full" />
              )}
            </div>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Active Now" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
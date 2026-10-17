import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store/appStore";
import type { ChatLocationState, ChatMessage } from "../utils/types";
import createSocketConection from "../utils/socket";
import { getChatApi } from "../api/client";

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatError, setChatError] = useState("");
  const socketRef = useRef<ReturnType<typeof createSocketConection> | null>(
    null,
  );
  const currentUser = useSelector((state: RootState) => state.user);
  const userConnection = useSelector((state: RootState) => state.connections);
  const { targetUserId } = useParams();
  const location = useLocation();
  const locationState = location.state as ChatLocationState | null;
  const targetUser =
    locationState?.user ??
    userConnection?.find((connection) => connection._id === targetUserId);
  const currentUserId = currentUser?._id;

  useEffect(() => {
    if (!targetUserId) {
      return;
    }

    let isCurrentChat = true;
    getChatApi(targetUserId)
      .then((chatData) => {
        if (!isCurrentChat) {
          return;
        }

        setMessages(
          chatData.messages.map((message) => ({
            senderId: message.senderUserId,
            text: message.message,
          })),
        );
        setChatError("");
      })
      .catch((error: unknown) => {
        if (!isCurrentChat) {
          return;
        }

        setChatError(
          error instanceof Error ? error.message : "Failed to load chat.",
        );
      });

    return () => {
      isCurrentChat = false;
    };
  }, [targetUserId]);

  useEffect(() => {
    if (!currentUserId || !targetUserId) {
      return;
    }

    const socket = createSocketConection();
    socketRef.current = socket;
    const handleReceivedMessage = (receivedMessage: ChatMessage) => {
      setMessages((currentMessages) => [...currentMessages, receivedMessage]);
    };

    socket.emit("joinChat", { currentUserId, targetUserId });
    socket.on("receivedMessage", handleReceivedMessage);

    return () => {
      socket.off("receivedMessage", handleReceivedMessage);
      socket.disconnect();
      if (socketRef.current === socket) {
        socketRef.current = null;
      }
    };
  }, [currentUserId, targetUserId]);

  const sendMessageHandler = () => {
    const text = newMessage.trim();
    if (!text || !currentUserId || !targetUserId || !socketRef.current) {
      return;
    }

    socketRef.current.emit("sendMessage", {
      currentUserId,
      targetUserId,
      text,
    });
    setNewMessage("");
  };

  if (!targetUser) {
    return (
      <main className="mx-auto w-full max-w-4xl p-6 text-center">
        <p>Connection details are unavailable.</p>
        <Link className="link mt-2" to="/connections">
          Back to connections
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl space-y-4 px-4 py-6 sm:px-6">
      <section className="space-y-2" aria-live="polite">
        {chatError && <p role="alert">{chatError}</p>}
        {messages.map((chatMessage, index) => {
          const isSentByCurrentUser = chatMessage.senderId === currentUserId;
          const messageUser = isSentByCurrentUser ? currentUser : targetUser;
          const messageName = messageUser
            ? `${messageUser.firstName} ${messageUser.lastName}`
            : isSentByCurrentUser
              ? "You"
              : `${targetUser.firstName} ${targetUser.lastName}`;

          return (
            <div
              className={`chat ${isSentByCurrentUser ? "chat-end" : "chat-start"}`}
              key={`${index}-${chatMessage.senderId}`}
            >
              {messageUser && (
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt={messageName} src={messageUser.profilePic} />
                  </div>
                </div>
              )}
              <div className="chat-header">{messageName}</div>
              <div className="chat-bubble">{chatMessage.text}</div>
            </div>
          );
        })}
      </section>

      <div className="w-full">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <div className="join flex w-full">
            <input
              type="text"
              className="input join-item min-w-0 flex-1"
              placeholder="type message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessageHandler();
                }
              }}
            />
            <button onClick={sendMessageHandler} className="btn join-item">
              send
            </button>
          </div>
        </fieldset>
      </div>
    </main>
  );
};

export default Chat;

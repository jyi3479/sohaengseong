import { useState, useCallback, useEffect, useContext, useRef } from "react";

import MessageItem from "./MessageItem";
//import { SocketContext, SOCKET_EVENT, makeMessage } from "src/service/socket";

function MessageList() {
  const [messages, setMessages] = useState([]);
  const chatWindow = useRef(null);
//   const socket = useContext(SocketContext);

  const moveScrollToReceiveMessage = useCallback(() => {
    if (chatWindow.current) {
      chatWindow.current.scrollTo({
        top: chatWindow.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);


  return (
    <div className="chat-window card" ref={chatWindow}>
      {/* {messages.map((message, index) => {
        return <MessageItem key={index} message={message} />;
      })} */}

    <MessageItem/>
    </div>
  );
}

export default MessageList;
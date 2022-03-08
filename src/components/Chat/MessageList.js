import { useCallback, useEffect, useRef } from "react";

// 리덕스 접근
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import MessageItem from "./MessageItem";
import { actionCreators as chatAction } from "../../redux/modules/chat";

function MessageList() {
  const roomId = useParams().roomId;
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  useEffect(() => {
    dispatch(chatAction.getChatMessagesDB(roomId));
  }, [roomId]);
  const chatWindow = useRef(null);
  //   const socket = useContext(SocketContext);

  // 스크롤
  // const moveScrollToReceiveMessage = useCallback(() => {
  //   if (chatWindow.current) {
  //     chatWindow.current.scrollTo({
  //       top: chatWindow.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }
  // }, []);

  return (
    <div className="chat-window card" ref={chatWindow}>
      {messages.map((message, index) => {
        return <MessageItem key={index} {...message} />;
      })}

      <MessageItem />
    </div>
  );
}

export default MessageList;

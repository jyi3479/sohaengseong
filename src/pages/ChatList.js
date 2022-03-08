import React from "react";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import * as baseAction from "../redux/modules/base";
import { Grid } from "../elements/index";
import ChatRoomItem from "../components/Chat/ChatRoomItem";
import { actionCreators as chatAction } from "../redux/modules/chat";

const ChatList = (props) => {
  const dispatch = useDispatch();
  // 채팅 리스트 리덕스로부터 가져오기
  const chat_list = useSelector((state) => state.chat.chatInfo);
  console.log(chat_list);
  //헤더&푸터 state
  React.useEffect(() => {
    dispatch(chatAction.getChatListDB());
    dispatch(baseAction.setHeader(true, "채팅", true));

    return () => {
      dispatch(baseAction.setHeader(false, "", true));
    };
  }, []);

  const CreateRoom = () => {
    const data = {
      chatRoomImg:
        "http://www.readersnews.com/news/photo/201502/52827_9951_450.jpg",
      chatRoomName: "뛰기",
      category: ["리엑트"],
      userId: 1,
    };

    dispatch(chatAction.createRoomDB(data));
  };

  return (
    <>
      <Grid padding="28px 20px" margin="48px 0 0">
        <button onClick={CreateRoom}>채팅방 생성</button>
        {/* 채팅방 -------- */}
        {chat_list?.map((el, i) => {
          return <ChatRoomItem key={el.id} {...el} />;
        })}
      </Grid>
    </>
  );
};

export default ChatList;

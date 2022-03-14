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
  const chatInfo = useSelector((state) => state.chat.chatInfo);
  console.log(chatInfo);

  //헤더&푸터 state
  React.useEffect(() => {
    dispatch(chatAction.getChatListDB());
    dispatch(baseAction.setHeader("채팅 목록", true));

    return () => {
      dispatch(baseAction.setHeader("", false));
    };
  }, []);

  return (
    <>
      {chatInfo && (
        <Grid padding="28px 20px" margin="48px 0 0">
          {/* 채팅방 -------- */}
          {chatInfo?.map((el, i) => {
            return <ChatRoomItem key={el.id} {...el} />;
          })}
        </Grid>
      )}
    </>
  );
};

export default ChatList;

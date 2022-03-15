import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import * as baseAction from "../redux/modules/base";
import { Grid, Button } from "../elements/index";
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
        <Grid padding="24px 20px" margin="48px 0 0" bg="#fff">
          {/* 채팅방 -------- */}
          {chatInfo.length !== 0? (
            chatInfo.map((el, i) => {
              return <ChatRoomItem key={i} {...el} />;
            })
          ):(            
            <NotFound className="t_center">
              <h2>채팅 목록이 없습니다.</h2>
              <p className="sub_color mt12">원하는 챌린지를 찾지 못했다면<br/>챌린지를 직접 개설해보세요.</p>
              <Button border_btn  margin="27px 0 0" bg="transparent !important" _onClick={()=>{
                  history.push("/challengewrite");
              }}>행성 개설하기</Button>
            </NotFound>
          )}
        </Grid>
      )}
    </>
  );
};


const NotFound = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 0;
  padding: 25vh 40px 0;
  background-color: #f4f6fa;
  position: fixed;
  left: 0;
  top: 48px;
`;

export default ChatList;

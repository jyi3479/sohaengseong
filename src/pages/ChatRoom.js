import React, { useRef, useCallback, useMemo, useState } from "react";
import * as baseAction from "../redux/modules/base";

// Components
import MessageList from "../components/Chat/MessageList";
import MessageForm from "../components/Chat/MessageForm";

// elements
import { Grid } from "../elements/index";

// 채팅 관련 함수들 가져오기
import { actionCreators as chatAction } from "../redux/modules/chat";

// 쿠키
import { getCookie } from "../shared/cookie";

// 리덕스
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

// 소켓 통신
import StompJs from "stompjs";
import SockJS from "sockjs-client";
import ScrollBar from "../components/shared/ScrollBar";

const ChatRoom = ({ match }) => {
  const dispatch = useDispatch();

  // 소켓 통신 객체
  const sock = new SockJS("https://byungmin.shop/chatting");
  const client = StompJs.over(sock);

  // 방 제목 가져오기
  const currentChat = useSelector((state) => state.chat.currentChat);
  const roomId = match.params.roomId;

  // 토큰
  const token = getCookie("token");

  const userId = +localStorage.getItem("userId");

  const [isMe, setIsMe] = useState(false);
  const [isNew, setIsNew] = useState(false)

  // 헤더&푸터 state (채팅방 바뀔 때마다 헤더 바뀌도록)
  React.useEffect(() => {
    dispatch(
      baseAction.setHeader(
        currentChat.roomName,
        true,
        false,
        currentChat.currentMember
      )
    );
    dispatch(baseAction.setGnb(false));

    return () => {
      dispatch(baseAction.setHeader("", false));
      dispatch(baseAction.setGnb(true));
    };
  }, [currentChat]);

  // 서버에서 이전 메세지 가져오기
  React.useEffect(() => {
    dispatch(chatAction.getChatMessagesDB(roomId, 0, 10));
    dispatch(chatAction.isLoading(true));
    // messageRef.current.scrollIntoView();
  }, []);

  // 페이지 입장 후 스크롤 이동

  // 웹소켓 연결, 구독
  const wsConnectSubscribe = useCallback(() => {
    try {
      client.connect(
        {
          authorization: token,
        },
        async () => {
          client.subscribe(
            `/sub/chat/rooms/${roomId}`,
            (data) => {
              const newMessage = JSON.parse(data.body);
        
              if(newMessage.user.userId!==userId ){
                setIsNew(true)
              } else{
                setIsNew(false)
              }
                // 메세지 추가하는 부분 (reducer에서 push)
                dispatch(chatAction.getMessages(newMessage));
            },
            {
              authorization: token,
            }
          );
        }
      );
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, userId, client]);

  // 연결해제, 구독해제
  const wsDisConnectUnsubscribe = React.useCallback(() => {
    try {
      client.disconnect(
        () => {
          client.unsubscribe("sub-0");
        },
        {
          authorization: token,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }, [client]);

  // 렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  React.useEffect(() => {
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
      dispatch(chatAction.clearMessages());
    };
  }, [roomId]);

  // 웹소켓이 연결될 때 까지 실행하는 함수
  const waitForConnection = (waitWs, callback) => {
    setTimeout(
      () => {
        // 연결되었을 때 콜백함수 실행
        if (waitWs.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(waitWs, callback);
        }
      },
      0.1 // 밀리초 간격으로 실행
    );
  };

  // 메시지 보내기
  const sendMessage = (message) => {
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!token) {
        alert("토큰이 없습니다. 다시 로그인 해주세요.");
        history.replace("/");
      }
      // send할 데이터
      const data = {
        type: "TALK",
        userId: userId,
        roomId: roomId,
        message: message,
      };
      // 빈문자열이면 리턴
      if (message === "") {
        return;
      }
      waitForConnection(client, () => {
        client.send(
          "/pub/chat/message",
          {
            authorization: token,
          },
          JSON.stringify(data)
        );
        setIsMe(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid padding="0" margin="48px 0">
        <ScrollBar height="calc(100vh - 108px)">
          <Grid padding="28px 20px" margin="0" style={{ overflowY: "auto" }}>
            <MessageList
              roomId={roomId}
              sendMessage={sendMessage}
              setIsMe={setIsMe}
              isMe={isMe}
              setIsNew={setIsNew}
              isNew={isNew}
            />
          </Grid>
        </ScrollBar>
      </Grid>

      <MessageForm sendMessage={sendMessage} />
    </>
  );
};

export default ChatRoom;

import React, { useRef } from "react";
import * as baseAction from "../redux/modules/base";

// Components
import MessageList from "../components/Chat/MessageList";
import MessageForm from "../components/Chat/MessageForm";
// import NoRoom from "../components/Chat/NoRoom";

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
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";
const server_port = process.env.REACT_APP_CHATTING_SERVER;

const ChatRoom = (props) => {
  const dispatch = useDispatch();

  // 소켓 통신 객체
  const sock = new SockJS(server_port);
  const client = Stomp.over(sock);

  // 방 제목 가져오기
  const currentChat = useSelector((state) => state.chat.currentChat);
  const roomId = useParams().roomId;
  console.log(currentChat, "34");
  // 토큰
  const token = getCookie("token");

  // 보낼 메시지 텍스트
  const messageText = useSelector((state) => state.chat.messageText);
  // sender 정보 가져오기
  // let sender = useSelector((state)=>state.user.userInfo?.username)
  let sender = "jyi3479";
  const userId = +localStorage.getItem("userId");

  // 헤더&푸터 state
  React.useEffect(() => {
    dispatch(
      baseAction.setHeader(
        currentChat.roomName,
        true,
        currentChat.currentMember
      )
    );
    dispatch(baseAction.setGnb(false));
    return () => {
      dispatch(baseAction.setHeader("", false));
      dispatch(baseAction.setGnb(true));
    };
  }, [currentChat]);

  // 렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  React.useEffect(() => {
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, []);

  // 웹소켓 연결, 구독
  function wsConnectSubscribe() {
    try {
      client.connect(
        {
          authorization: token,
          // authorization: `Bearer ${token}`,
        },
        () => {
          client.subscribe(
            `/sub/chat/rooms/${roomId}`,
            (data) => {
              const newMessage = JSON.parse(data.body);
              // 메세지 추가하는 부분(reducer에서 push)
              dispatch(chatAction.getMessages(newMessage));
            },
            {
              authorization: token,
              // authorization: `Bearer ${token}`,
            }
          );
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // 연결해제, 구독해제
  function wsDisConnectUnsubscribe() {
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
      console.log(error);
    }
  }

  // 웹소켓이 연결될 때 까지 실행하는 함수
  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }

  // 메시지 보내기
  function sendMessage() {
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
        message: messageText,
      };
      // 빈문자열이면 리턴
      if (messageText === "") {
        return;
      }
      // 로딩 중
      dispatch(chatAction.isLoading());
      waitForConnection(client, function () {
        client.send(
          "/pub/chat/message",
          {
            authorization: token,
          },
          JSON.stringify(data)
        );
        console.log(client.ws.readyState);
        dispatch(chatAction.writeMessage(""));
      });
    } catch (error) {
      console.log(error);
      console.log(client.ws.readyState);
    }
  }

  return (
    <Grid padding="28px 20px" margin="48px 0">
      <Grid
        padding="0"
        margin="0"
        // height="calc(100vh - 48px)"
        style={{ overflowY: "auto" }}
      >
        <MessageList />
      </Grid>
      <MessageForm sendMessage={sendMessage} />
    </Grid>
  );
};

export default ChatRoom;

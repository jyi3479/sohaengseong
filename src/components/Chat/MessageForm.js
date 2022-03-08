import { useState, useCallback, useContext, useRef } from "react";
import styled from "styled-components";
import send from "../../image/icons/ic_message@2x.png";
import React from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCookie } from "../../shared/cookie";
import { history } from "../../redux/configureStore";
import { useParams } from "react-router-dom";

function MessageForm(props) {
  const roomId = useParams().roomId;
  const [typingMessage, setTypingMessage] = useState("");
  const sock = new SockJS("http://15.164.245.252:8080/chatting");
  const client = Stomp.over(sock);
  const token = getCookie("token");
  console.log(token);

  React.useEffect(() => {
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [roomId]);

  function wsConnectSubscribe() {
    try {
      client.connect(
        {
          token: token,
        },
        () => {
          client.subscribe(
            `/sub/api/chat/rooms/${roomId}`,
            (data) => {
              const newMessage = JSON.parse(data.body);
              console.log(newMessage);
            },
            { token: token }
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
        { token: token }
      );
    } catch (error) {
      console.log(error);
    }
  }

  function sendMessage() {
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!token) {
        alert("토큰이 없습니다. 다시 로그인 해주세요.");
        //history.replace("/login");
      }
      // send할 데이터
      const data = {
        type: "TALK",
        roomId: roomId,
        sender: "jyi3479",
        message: typingMessage,
        id: 1,
      };
      // 빈문자열이면 리턴
      if (typingMessage === "") {
        return;
      }
      // 로딩 중

      client.send(
        "/pub/api/chat/message",
        { token: token },
        JSON.stringify(data)
      );
      console.log(data.body);
    } catch (error) {
      console.log(error);
    }
  }
  //리사이즈 스크립트 설정
  const textArea = useRef();

  const resize = () => {
    const text = textArea.current;
    text.style.height = "auto";
    text.style.height = text.scrollHeight + "px";
  };

  // textarea에서 텍스트를 입력하면 typingMessage state를 변경합니다.
  const handleChangeTypingMessage = useCallback((event) => {
    setTypingMessage(event.target.value);
  }, []);

  // 버튼을 누르면 실행합니다.
  const handleSendMesssage = useCallback(() => {
    sendMessage();
    // 공백을 trim()으로 제거합니다.
    const noContent = typingMessage.trim() === "";

    // 아무 메시지도 없으면 아무 일도 발생하지 않습니다.
    if (noContent) {
      return;
    }
    // state값은 공백으로 변경해줍니다.

    setTypingMessage("");
  }, [props.nickname, typingMessage]);

  return (
    <Wrap>
      <MessgeInput>
        <textarea
          placeholder="메시지 보내기"
          maxLength={400}
          autoFocus
          value={typingMessage}
          onChange={handleChangeTypingMessage}
          onKeyUp={resize}
          ref={textArea}
          rows="1"
          cols="100"
        />
        <button
          type="button"
          className="send_btn"
          onClick={handleSendMesssage}
        ></button>
      </MessgeInput>
    </Wrap>
  );
}
const Wrap = styled.div`
  position: fixed;
  width: calc(100% - 40px);
  left: 20px;
  bottom: 20px;
`;
const MessgeInput = styled.div`
  padding: 18px 48px 18px 16px;
  background-color: #fff;
  border-radius: 26px;
  max-height: 100px;
  word-wrap: break-word;
  word-break: break-word;
  > textarea {
    width: 100%;
    min-height: 24px;
    outline: none;
    border: none;
    resize: none;
  }
  .send_btn {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 40px;
    height: 40px;
    background-color: #eaeaea;
    border-radius: 50%;
    border: none;
    background-image: url(${send});
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;
  }
`;

export default MessageForm;

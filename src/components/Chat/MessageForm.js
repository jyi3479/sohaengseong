import { useState, useCallback, useContext, useRef } from "react";
import styled from "styled-components";
import send from "../../image/icons/ic_message@2x.png";
import React from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCookie } from "../../shared/cookie";
import { history } from "../../redux/configureStore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatAction } from "../../redux/modules/chat";

function MessageForm(props) {
  const dispatch = useDispatch();
  // 메시지 텍스트 입력받기
  const [messageText, setMessageText] = React.useState("");

  const { sendMessage } = props;

  const loading = useSelector((state) => state.chat.loading);

  // 텍스트 기록 함수
  const handleMessageText = (e) => {
    setMessageText(e.target.value);
    dispatch(chatAction.writeMessage(e.target.value));
  };

  // 오토 포커스 대상
  const autoFocusRef = React.useRef(null);
  React.useEffect(() => {
    autoFocusRef.current?.focus();
  }, []);

  //리사이즈 스크립트 설정
  const textArea = useRef();

  const resize = () => {
    const text = textArea.current;
    text.style.height = "auto";
    text.style.height = text.scrollHeight + "px";
  };

  // 엔터 시 제출용
  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      // enter + shift 누르면 줄바꿈 되도록 하기
      if (!e.shiftKey) {
        sendMessage();
        setMessageText("");
        // 메세지를 보내고 바로 엔터 실행되어 줄바꿈 안되도록 방지
        e.preventDefault();
      }
    }
  };

  return (
    <Wrap>
      <MessgeInput>
        <textarea
          placeholder="메시지 보내기"
          maxLength={400}
          autoFocus
          rows="1"
          cols="100"
          onKeyUp={resize}
          value={messageText}
          onChange={handleMessageText}
          onKeyPress={onEnterPress}
          ref={textArea}

          // ref={autoFocusRef}
          // loading={loading}
        />
        <button
          type="button"
          className="send_btn"
          onClick={() => {
            sendMessage();
            setMessageText("");
          }}
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

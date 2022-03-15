import React, { useState, useCallback, useContext, useRef } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCookie } from "../../shared/cookie";
import { history } from "../../redux/configureStore";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatAction } from "../../redux/modules/chat";

import send from "../../image/icons/ic_message@2x.png";

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
          style={{backgroundColor:messageText? "#4149d3":"rgba(162, 170, 179, 0.5)"}}
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
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: #fff;
  box-shadow: 0 -4px 8px 0 rgba(3, 1, 2, 0.04);
  padding: 10px 20px;
`;
const MessgeInput = styled.div`
  position: relative;
  padding: 10px 20px;
  border-radius: 18px;
  background-color: rgba(124, 130, 136, 0.1);
  max-height: 100px;
  word-wrap: break-word;
  word-break: break-word;
  > textarea {
    display: block;
    width: 100%;
    background-color: initial;
    outline: none;
    border: none;
    resize: none;
    &::placeholder{
      color: #a2aab3;
    }
  }
  .send_btn {
    position: absolute;
    bottom: 6px;
    right: 4px;
    width: 28px;
    height: 28px;
    background-color: rgba(162, 170, 179, 0.5);
    border-radius: 50%;
    border: none;
    background-image: url(${send});
    background-size: 20px;
    background-position: center;
  }
`;

export default MessageForm;

import React, { useRef } from "react";
import styled from "styled-components";

import send from "../../image/icons/ic_message@2x.png";

function MessageForm(props) {
  // 메시지 텍스트 입력받기
  const [messageText, setMessageText] = React.useState("");
  // 웹소켓 연결 컴포넌트에서 만든 메세지 전송 함수 받아오기
  const { sendMessage } = props;

  // 텍스트 입력 onChange
  const handleMessageText = (e) => {
    setMessageText(e.target.value);
  };

  // 웹소켓에 전송할 메세지
  const textArea = useRef();
  const msg = textArea.current;

  //리사이즈 스크립트 설정
  const resize = () => {
    const text = textArea.current;
    text.style.height = "auto";
    text.style.height = text.scrollHeight + "px";
  };

  // 엔터 시 메세지 전송
  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      // enter + shift 누르면 줄바꿈 되도록 하기
      if (!e.shiftKey) {
        // 웹소켓에 메세지 전송
        sendMessage(msg.defaultValue);
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
        />
        <input
          type="submit"
          value=" "
          className="send_btn"
          style={{
            backgroundColor: messageText
              ? "#4149d3"
              : "rgba(162, 170, 179, 0.5)",
          }}
          onClick={() => {
            sendMessage(msg.defaultValue);
            setMessageText("");
          }}
        />
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
    &::placeholder {
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

import { useState, useCallback, useContext } from "react";
import styled from "styled-components";

function MessageForm({ nickname }) {
  const [typingMessage, setTypingMessage] = useState("");

  // textarea에서 텍스트를 입력하면 typingMessage state를 변경합니다.
  const handleChangeTypingMessage = useCallback(event => {
    setTypingMessage(event.target.value);
  }, []);

 // 버튼을 누르면 실행합니다.
  const handleSendMesssage = useCallback(() => {
    // 공백을 trim()으로 제거합니다.
    const noContent = typingMessage.trim() === "";

    // 아무 메시지도 없으면 아무 일도 발생하지 않습니다.
    if (noContent) {
      return;
    }
    // state값은 공백으로 변경해줍니다.
    setTypingMessage("");
  }, [nickname, typingMessage]);

  return (
    <form className="card">
      <div className="d-flex align-items-center">
        <textarea
          className="form-control"
          maxLength={400}
          autoFocus
          value={typingMessage}
          onChange={handleChangeTypingMessage}
        />
        <button
          type="button"
          className="send-btn"
          onClick={handleSendMesssage}
        >
          전송
        </button>
      </div>
    </form>
  );
}



export default MessageForm;
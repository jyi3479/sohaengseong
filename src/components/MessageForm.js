import { useState, useCallback, useContext, useRef } from "react";
import styled from "styled-components";
import send from "../image/icons/ic_message@2x.png";

function MessageForm({ nickname }) {
    const [typingMessage, setTypingMessage] = useState("");

    //리사이즈 스크립트 설정
    const textArea = useRef();

    const resize = () => {
        const text = textArea.current;
        const box = document.getElementById('box');
        text.style.height = 'auto';
        text.style.height = text.scrollHeight + 'px';

        if (text.style.height >= 50) {
            text.style.overflow =  "auto"
            box.style.overflow =  "hidden"           
        }else{
            text.style.overflow =  "hidden"
            box.style.overflow =  "scroll"
        }
    }

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
      <Wrap>         
        <MessgeInput id="box">
            <textarea
                placeholder="메시지 보내기"
                maxLength={400}
                autoFocus
                value={typingMessage}
                onChange={handleChangeTypingMessage}
                rows="1"
                ref={textArea}
                onKeyUp={resize}
            />
            <button
                type="button"
                className="send_btn"
                onClick={handleSendMesssage}
            >
            </button>
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
    overflow: hidden;
    > textarea {
        width: 100%;
        height: auto;
        outline: none;
        border:none;
        resize: none;        
    }
    .send_btn {
        position: absolute;
        bottom: 8px;
        right: 8px;
        width: 40px;
        height: 40px;
        background-color: #eaeaea;
        border-radius: 50%;
        border:none;
        background-image: url(${send});
        background-repeat: no-repeat;
        background-size: 24px;
        background-position: center;
    }
`;



export default MessageForm;
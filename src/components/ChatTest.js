import React, { useEffect } from "react";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { getCookie } from "../shared/cookie";

// import SockJsClient from "react-stomp";

const ChatTest = (props) => {
  const sock = SockJS("http://15.164.245.252:8080/chatting");
  // 기본 유형의 webSocket은 구버전 브라우저 에서는 지원하지 않는다, sockjs는 구버전 브라우저의 지원을 도와준다
  let client = Stomp.over(sock);

  let connectCallback = function () {
    console.log("연결 성공");
  };

  let errorCallback = function (error) {
    console.log("연결 실패", error);
  };

  let headers = {
    Authorization: getCookie("token"),
    // token: getCookie("token"),
  };

  useEffect(() => {
    client.connect(headers, connectCallback, errorCallback);
  });

  const data = {
    client: Stomp.over(sock),
    // over를 사용하여 webSocket의 유형을 sockjs로 변경해준다.
    //   roomId: props.match.params.chatRoomId, // 입장 채팅방
    // headers: {
    //   Authorization: getCookie("token"),
    // },
  };

  return <div>ㅎㅎ</div>;
  //   const $websocket = React.useRef(null);
  //   const handleMsg = (msg) => {
  //     console.log(msg);
  //   };
  //   const handleClickSendTo = () => {
  //     $websocket.current.sendMessage("/sendTo");
  //   };
  //   const handleClickSendTemplate = () => {
  //     $websocket.current.sendMessage("/Template");
  //   };

  //   return (
  //     <div>
  //       <SockJsClient
  //         url="http://15.164.245.252:8080/websocket"
  //         topics={["/topics/sendTo", "/topics/template", "/topics/api"]}
  //         // xhrFields={
  //         //     withCredentials: true
  //         // }
  //         onMessage={(msg) => {
  //           console.log(msg);
  //         }}
  //         ref={$websocket}
  //       />
  //       <button onClick={handleClickSendTo}>SendTo</button>
  //       <button onClick={handleClickSendTemplate}>SendTemplate</button>
  //     </div>
  //   );
};

export default ChatTest;

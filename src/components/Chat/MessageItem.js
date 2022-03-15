import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Image } from "../../elements";
import defaultImg from "../../image/img_profile_defalt @2x.png";
import moment from "moment";

function MessageItem(props) {
  const message = props;
  //   console.log(message);
  const userId = +localStorage.getItem("userId");
  const profileUrl = message.user.profileUrl
    ? message.user.profileUrl
    : defaultImg;
  //   React.useEffect(() => {
  //     // 로딩중
  //     if (!messageInfo) {
  //       return (
  //         <MessageWrap>
  //           <Spinner />
  //         </MessageWrap>
  //       )
  //     }

  //   }, [])

  // 타임 스탬프
  let time = "";
  if (!(message.createdAt === null)) {
    time = moment(message.createdAt, "YYYY.MM.DD kk:mm:ss").format("LT");
  }

  // 사용자 입장 메시지
  if (message.type === "ENTER") {
    return <EnterWrap className="t_center">{message.message}</EnterWrap>;
  }
  // 메시지의 유저 id 정보와 현재 유저 id가 같으면 본인 메시지 (user store에 저장되어있는거 쓰기 or localstorage)
  if (userId === message.user.userId) {
    return (
      <Item className="is_me">
        <Image profile={profileUrl}></Image>
        <Bubble className="is_me">
          <p className="small bold">{message.user ? message.user.nickname : message.sender}</p>
          <div>
            <Text className="is_me">{message.message}</Text>
            <p className="time caption_color">{time}</p>
          </div>
        </Bubble>
      </Item>
    );
  }
  // 사용자 퇴장 메시지
  if (message.type === "QUIT") {
    return <QuitWrap className="t_center">{message.message}</QuitWrap>;
  } else {
    return (
      <>
        {/* 다른 사용자가 보낸 메세지 */}
        <Item>
          <Image profile={profileUrl}></Image>
          <Bubble>
            <p className="small bold"> {message.user ? message.user.nickname : message.sender}</p>
            <div>
              <Text>{message.message}</Text>
              <p className="time caption_color">{time}</p>
            </div>
          </Bubble>
        </Item>
      </>
    );
  }
}

const Item = styled.div`
  display: flex;
  &.is_me {
    flex-direction: row-reverse;
  }
  margin: 5px 0px;
`;

const Bubble = styled.div`
  margin-left: 8px;
  margin-bottom: 16px;
  > p {
    text-align: left;
    margin-bottom: 2px;
  }
  > div {
    display: flex;
    align-items: end;
    .time {
      font-size: 12px;
    }
  }
  &.is_me {
    margin-right: 8px;
    > p {
      text-align: right;
      margin-right: 6px;
    }
    > div {
      flex-direction: row-reverse;
    }
  }
`;

const Text = styled.p`
  display: block;
  box-sizing: border-box;
  max-width: 210px;
  width: auto;
  background-color: #fff;
  padding: 14px 16px;
  border-radius: 0 8px 8px 8px;
  margin-right: 8px;
  word-break: break-all;
  white-space: pre-wrap;
  &.is_me {
    border-radius: 8px 0 8px 8px;
    margin-right: 0;
    margin-left: 8px;
  }
`;

const EnterWrap = styled.div`
  margin: 20px 0px;
  color: #7c8288;
  font-size: 12px;
`;

const QuitWrap = styled.div`
  margin: 20px 0px;
  color: #7c8288;
  font-size: 12px;
`;

export default React.memo(MessageItem);

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
    return <EnterWrap>{message.message}</EnterWrap>;
  }
  // 메시지의 유저 id 정보와 현재 유저 id가 같으면 본인 메시지 (user store에 저장되어있는거 쓰기 or localstorage)
  if (userId === message.user.userId) {
    return (
      <Item className="is_me">
        <Image profile={profileUrl}></Image>
        <Bubble className="is_me">
          <p>{message.user ? message.user.nickname : message.sender}</p>
          <div>
            <Text className="is_me">{message.message}</Text>
            <p className="time">{time}</p>
          </div>
        </Bubble>
      </Item>
    );
  }
  // 사용자 퇴장 메시지
  if (message.type === "QUIT") {
    return <QuitWrap>{message.message}</QuitWrap>;
  } else {
    return (
      <>
        {/* 다른 사용자가 보낸 메세지 */}
        <Item>
          <Image profile={profileUrl}></Image>
          <Bubble>
            <p> {message.user ? message.user.nickname : message.sender}</p>
            <div>
              <Text>{message.message}</Text>
              <p className="time">{time}</p>
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
    color: #939393;
    font-size: 14px;
    margin-bottom: 6px;
  }
  > div {
    display: flex;
    align-items: end;
    .time {
      font-size: 12px;
      color: #a8a8a8;
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
      .time {
        font-size: 12px;
        color: #a8a8a8;
      }
    }
  }
`;

const Text = styled.p`
  display: block;
  box-sizing: border-box;
  width: 220px;
  background-color: #fff;
  padding: 12px 16px;
  border-radius: 0 5px 5px 5px;
  margin-right: 4px;
  word-break: break-all;
  white-space: pre-wrap;
  font-size: 14px;
  color: #000;
  &.is_me {
    border-radius: 5px 0 5px 5px;
    margin-right: 0;
    margin-left: 4px;
  }
`;

const EnterWrap = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_row};
  justify-content: center;
  width: 40%;
  height: auto;
  padding: 5px;
  margin: 10px 0px 40px 0px;
  background-color: ${(props) => props.theme.theme_yellow};
  color: grey;
  border-radius: 40px;
  opacity: 0.6;
  @media ${(props) => props.theme.mobile} {
    width: 80%;
  }
`;

const QuitWrap = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_row};
  justify-content: center;
  width: 40%;
  height: auto;
  padding: 5px;
  margin: 10px 0px 40px 0px;
  background-color: ${(props) => props.theme.main_color_thick};
  color: grey;
  border-radius: 40px;
  opacity: 0.6;
  @media ${(props) => props.theme.mobile} {
    width: 80%;
  }
`;

export default React.memo(MessageItem);

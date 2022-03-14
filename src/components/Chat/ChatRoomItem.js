import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { Grid } from "../../elements/index";
import defaultImg from "../../image/img_profile_defalt @2x.png";

const ChatRoomItem = (props) => {
  const chatInfo = props;
  // console.log(chatInfo.roomId);
  // const currentRoomId = useSelector((state) => state.chat.currentChat.roomId);

  // 타임 스탬프
  let time = "";
  if (!(chatInfo.createdAt === null)) {
    time = chatInfo.createdAt?.split("T")[0]; //일단 생성 날짜로 해놓기
  }
  return (
    <Grid
      padding="0"
      margin="0 0 28px"
      is_flex
      style={{ alignItems: "flex-start", cursor: "pointer" }}
      _onClick={() => {
        history.push(`/chatting/${chatInfo.roomId}`);
      }}
    >
      <div style={{ width: "calc(100% - 78px)", display: "flex" }}>
        <ProfileBox>
          {/* 멤버정보 순서대로 노출 시켜줄 것 임의로 만들어둠 */}
          <div
            style={{
              backgroundImage: `url(${
                chatInfo.chatRoomImg[0] ? chatInfo.chatRoomImg[0] : defaultImg
              })`,
            }}
          ></div>
          <div
            style={{
              backgroundImage: `url(${
                chatInfo.chatRoomImg[1] ? chatInfo.chatRoomImg[1] : defaultImg
              })`,
            }}
          ></div>
        </ProfileBox>
        <Info>
          <div>
            <h3>{chatInfo.chatRoomName}</h3>
            <span>{chatInfo.currentMember}</span>
          </div>
          <p>{chatInfo.recentMessage}</p>
        </Info>
      </div>
      <span style={{ fontSize: "11px", color: "#a8a8a8" }}>{time}</span>
    </Grid>
  );
};

const ProfileBox = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  margin-right: 8px;
  div {
    position: absolute;
    left: 0;
    top: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #999;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    &:last-child {
      right: 0;
      bottom: 0;
      left: auto;
      top: auto;
      background-color: #aaa;
    }
  }
`;

const Info = styled.div`
  width: calc(100% - 56px);
  div {
    width: 100%;
    margin-bottom: 4px;
    h3 {
      display: inline-block;
      width: calc(100% - 20px);
      font-size: 14px;
      margin-right: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; //길어지면 말줄임
    }
    span {
      color: #aaa;
      font-size: 12px;
      vertical-align: top;
    }
  }
  p {
    width: 100%;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; //길어지면 말줄임
  }
`;

export default ChatRoomItem;

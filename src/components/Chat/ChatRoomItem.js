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
    <Box      
      onClick={() => {
        history.push(`/chatting/${chatInfo.roomId}`);
      }}
    >
      <div style={{ width: "calc(100% - 78px)", display: "flex" }}>
        <ProfileBox>
          {/* 멤버정보 순서대로 노출 시켜줄 것 임의로 만들어둠 */}
          {chatInfo.currentMember === 1? (
             <div
              className="one_member"
              style={{
                backgroundImage: `url(${
                  chatInfo.chatRoomImg[0] ? chatInfo.chatRoomImg[0] : defaultImg
                })`,
              }}
            ></div>
          ) : (
            <>
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
            </>
          )}
         
        </ProfileBox>
        <Info>
          <div>
            <p>{chatInfo.chatRoomName}</p>
            <span className="poppins sub_color">{chatInfo.currentMember}</span>
          </div>
          <p className="sub_color">{chatInfo.recentMessage}</p>
        </Info>
      </div>
      <span className="caption_color" style={{ fontSize: "12px"}}>{time}</span>
    </Box>
  );
};

const Box = styled.div`
  display: flex; 
  align-items: flex-start;
  justify-content: space-between;
  padding: 0;
  margin: 0 0 20px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ProfileBox = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  margin-right: 12px;
  div {
    position: absolute;
    left: 0;
    top: 0;
    width: 32px;
    height: 32px;
    border-radius: 11px;
    background-color: #999;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    &.one_member {
      width: 48px;
      height: 48px;
    }
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
    margin-bottom: 2px;
    line-height: 1;
    p {
      display: inline-block;
      width: auto;
      max-width: calc(100% - 20px);
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; //길어지면 말줄임
    }
    span {
      display: inline-block;
      font-size: 12px;
      vertical-align: top;
      margin-left: 6px;
    }
  }
  p {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; //길어지면 말줄임
  }
`;

export default ChatRoomItem;

import { useCallback, useEffect, useRef } from "react";

// 리덕스 접근
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import MessageItem from "./MessageItem";
import { actionCreators as chatAction } from "../../redux/modules/chat";
import styled from "styled-components";
import moment from "moment";

function MessageList() {
  const roomId = useParams().roomId;
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  console.log(messages);
  useEffect(() => {
    dispatch(chatAction.getChatMessagesDB(roomId));
  }, []);

  // 날짜별로 분류하기
  //1. 받아온 데이터 중 존재하는 날짜값만 가져오기
  const _dateArr = messages.map((el, idx) => el.createdAt?.split(" ")[0]);
  const dateArr = [...new Set(_dateArr)];
  let messageSortArr = [];

  console.log(_dateArr);
  //2. 분류된 날짜에 해당하는 요소들만 묶어서 구분하기
  for (let i = 0; i < dateArr.length; i++) {
    messageSortArr.push({
      date: dateArr[i],
      messageArr: messages.filter(
        (el, idx) => (el.createdAt?.split(" ")[0] || undefined) === dateArr[i]
      ),
    });
  }

  console.log(messageSortArr);

  const scrollRef = useRef();
  useEffect(() => {
    // 페이지 입장 후와 메세지가 추가될 때마다 스크롤 이동 (behavior는 전환 에니메이션 정의)
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messageSortArr]);

  return (
    <>
      {messageSortArr && (
        <>
          {messageSortArr.map((el, idx) => {
            return (
              <div key={idx}>
                {el.date && (
                  <DateText>
                    {moment(el.date).format("YYYY년 MM월 DD일")}
                  </DateText>
                )}

                <MessageBox className="chat-window card">
                  {el.messageArr.map((message, index) => {
                    return <MessageItem key={index} {...message} />;
                  })}
                </MessageBox>
              </div>
            );
          })}
          <div ref={scrollRef} />
        </>
      )}
    </>
  );
}

const DateText = styled.p`
  /* width: 81px;
  height: 18px;
  margin: 40px 127px 16px; */
  font-family: NotoSansCJKkr;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.36px;
  text-align: center;
  color: #a8a8a8;
`;

const MessageBox = styled.div`
  /* height: calc(100vh - 48px);
  overflow-y: scroll;
  padding-bottom: 60px; */

  /* display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  & :first-child {
    margin-top: auto;
  } */
`;

export default MessageList;

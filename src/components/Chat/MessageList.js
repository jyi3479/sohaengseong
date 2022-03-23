import { useEffect, useRef } from "react";

// 리덕스 접근
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatAction } from "../../redux/modules/chat";

import MessageItem from "./MessageItem";
import styled from "styled-components";
import moment from "moment";
import InfinityScroll from "../../shared/InfiniteScroll";

function MessageList(props) {
  const dispatch = useDispatch();
  // redux에 저장한 이전 메세지 가져오기
  const currentChat = useSelector((state) => state.chat.currentChat);
  const messages = useSelector((state) => state.chat.messages);

  // 날짜별로 분류하기
  //1) 받아온 데이터 중 존재하는 날짜값만 가져오기
  const _dateArr = messages.map((el) => el.createdAt?.split(" ")[0]);
  const dateArr = [...new Set(_dateArr)];

  //2) 분류된 날짜에 해당하는 요소들끼리 묶어서 구분하기
  let messageSortArr = [];
  for (let i = 0; i < dateArr.length; i++) {
    messageSortArr.push({
      date: dateArr[i],
      messageArr: messages.filter(
        (el) => (el.createdAt?.split(" ")[0] || undefined) === dateArr[i]
      ),
    });
  }

  // 스크롤할 div useRef로 접근
  const scrollRef = useRef();
  // 페이지 입장 후와 메세지가 추가될 때마다 스크롤 이동
  useEffect(() => {
    scrollRef.current.scrollIntoView();
  }, [props.roomId]);

  const getMessageList = () => {
    dispatch(chatAction.getChatMessagesDB(props.roomId, currentChat.page, 10));
  };

  return (
    <>
      {messageSortArr && (
        <>
          <InfinityScroll
            callNext={getMessageList}
            paging={{ next: currentChat.next }}
            isChat
          >
            {messageSortArr.map((el, idx) => {
              return (
                <div key={idx}>
                  {el.date && (
                    <p className="caption sub_color t_center">
                      {moment(el.date).format("YYYY년 MM월 DD일")}
                    </p>
                  )}

                  <MessageBox className="chat-window card">
                    {el.messageArr.map((message, index) => {
                      return <MessageItem key={index} {...message} />;
                    })}
                  </MessageBox>
                </div>
              );
            })}
          </InfinityScroll>
          <div ref={scrollRef} />
        </>
      )}
    </>
  );
}

const MessageBox = styled.div`
  margin-top: 20px;
`;

export default MessageList;

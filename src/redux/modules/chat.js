import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";

// api 가져오기
import { chatAPI } from "../../shared/apis";

//채팅 리스트를 다루는 액션
const GET_CHAT = "GET_CHAT";
const SET_MESSAGES = "SET_MESSAGES";

const getChat = createAction(GET_CHAT, (chatList) => ({
  chatList,
}));
const setMessages = createAction(SET_MESSAGES, (messages) => ({ messages }));

const initialState = {
  // 채팅 리스트를 받는 배열
  chatInfo: [],
  // 현재 접속 채팅 방
  currentChat: {
    roomId: null,
    roomName: null,
    category: null,
  },
  // 현재 접속 채팅 메시지
  messages: [],
  messageText: null,
  // 메시지 현재 페이지
  messageCurPage: null,
  // 메시지 총 페이지
  messageTotalPage: null,
  // 메시지 로딩
  loading: false,
  // 사용자가 설정한 카테고리(채팅방 생성시)
  selectedCategory: [],
};

// 채팅방 목록 조회
const getChatListDB = () => {
  return function (dispatch, getState, { history }) {
    chatAPI
      .getChatList()
      .then((res) => {
        dispatch(getChat(res.data));
        console.log("채팅방 목록 조회", res.data);
      })
      .catch((err) => {
        console.log("채팅방 목록 조회 오류", err);
      });
  };
};

//채팅방 생성
const createRoomDB = (data) => {
  return function (dispatch, getState, { history }) {
    chatAPI
      .createRoom(data)
      .then((res) => {
        window.alert("채팅방이 생성되었습니다.");
        dispatch(getChatListDB());
      })
      .catch((err) => {
        console.log("채팅방 생성 실패", err);
      });
  };
};

// DB에 존재하는 채팅방 메시지들 가져오기
const getChatMessagesDB = (roomId) => {
  return function (dispatch, getState, { history }) {
    chatAPI
      .getChatMessages(roomId)
      .then((res) => {
        const chatMessagesArray = res.data.content;
        dispatch(setMessages(chatMessagesArray));
        dispatch(getChat(res.data));
        console.log("채팅방 메시지 조회", res.data);
      })
      .catch((err) => {
        console.log("채팅방 메시지 조회 오류", err);
      });
  };
};

export default handleActions(
  {
    [GET_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chatInfo = action.payload.chatList;
      }),

    [SET_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = action.payload.messages;
      }),
  },
  initialState
);

const actionCreators = {
  getChatListDB,
  createRoomDB,
  getChatMessagesDB,
};

export { actionCreators };

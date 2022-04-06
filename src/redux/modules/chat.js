import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// api 가져오기
import { chatAPI } from "../../shared/apis";

// 채팅 리스트를 다루는 액션
const GET_CHAT = "GET_CHAT";
// 채팅방의 대화 내용을 가져오기 (채팅하면서 추가)
const GET_MESSAGES = "GET_MESSAGES";
// 저장한 대화 내용 없애기
const CLEAR_MESSAGES = "CLEAR_MESSAGES";
// DB의 채팅방의 대화 내용 넣어놓기
const SET_MESSAGES = "SET_MESSAGES";
// 로딩을 다루는 액션
const IS_LOADING = "IS_LOADING";
// 입장한 채팅방 정보를 없애기
const CLEAR_CURRENTCHAT = "CLEAR_CURRENTCHAT";

const getChat = createAction(GET_CHAT, (chatInfo) => ({
  chatInfo,
}));

const getMessages = createAction(GET_MESSAGES, (messages) => ({ messages }));

const clearMessages = createAction(CLEAR_MESSAGES, () => ({}));

const setMessages = createAction(SET_MESSAGES, (chatRoomInfo, messages, page) => ({
  chatRoomInfo,
  messages,
  page,
}));

const isLoading = createAction(IS_LOADING, (loading) => ({ loading }));

const clearCurrentChat = createAction(CLEAR_CURRENTCHAT, () => ({}));

const initialState = {
  // 채팅 리스트를 받는 배열
  chatInfo: [],
  // 현재 접속 채팅 방
  currentChat: {
    currentMember: null,
    lastMessageId: null,
    next: false,
    page: 0,
    roomId: null,
    roomName: null,
  },
  // 현재 접속 채팅 메시지
  messages: [],
  // 메시지 로딩
  loading: false,
};

//채팅방 생성
const createRoomDB = (data) => {
  return function (dispatch, getState, { history }) {
    chatAPI
      .createRoom(data)
      .then((res) => {
        console.log("채팅방 생성", res);
      })
      .catch((err) => {
        console.log("채팅방 생성 실패", err);
      });
  };
};

// 채팅방 목록 조회
const getChatListDB = () => {
  return function (dispatch, getState, { history }) {
    chatAPI
      .getChatList()
      .then((res) => {
        dispatch(getChat(res.data));
      })
      .catch((err) => {
        console.log("채팅방 목록 조회 오류", err);
      });
  };
};

// DB에 존재하는 채팅방 메시지들 가져오기
const getChatMessagesDB = (roomId, page, size) => {
  return function (dispatch, getState, { history }) {
    chatAPI
      .getChatMessages(roomId, page, size)
      .then((res) => {
        console.log(res.data.messageList[res.data.messageList.length - 1]);
        const chatRoomInfo = {
          currentMember: res.data.currentMember,
          lastMessageId: res.data.messageList[res.data.messageList.length - 1].id,
          next: res.data.next,
          roomId: res.data.roomId,
          roomName: res.data.roomName,
        };
        const chatMessagesArray = res.data.messageList;
        dispatch(setMessages(chatRoomInfo, chatMessagesArray, page + 1));
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
        draft.chatInfo = action.payload.chatInfo;
      }),

    [GET_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.messages.push(action.payload.messages);
        // state.loading = false;
      }),

    [CLEAR_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = [];
        draft.currentChat.page = 0;
        draft.currentChat.roomId = null;
        draft.currentChat.roomName = null;
      }),

    [SET_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.page > 1) {
          // 무한스크롤로 쌓이는 메세지들만 따로 모아두기
          draft.messages.unshift(...action.payload.messages);
        } else {
          draft.messages = action.payload.messages;
        }
        // 서버에서 주는 페이지 별 채팅 정보(+새로 불러온 메세지만 넣어둠)
        draft.currentChat = action.payload.chatRoomInfo;
        draft.currentChat.page = action.payload.page;
        draft.loading = false;
      }),

    [IS_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = action.payload.loading;
      }),

    [CLEAR_CURRENTCHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.currentChat.roomId = null;
        draft.currentChat.roomName = null;
      }),
  },
  initialState
);

const actionCreators = {
  getChatListDB,
  createRoomDB,
  getChatMessagesDB,
  getMessages,
  clearMessages,
  isLoading,
  clearCurrentChat,
  getChat,
};

export { actionCreators };

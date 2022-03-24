import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// api 가져오기
import { chatAPI } from "../../shared/apis";

// 채팅 리스트를 다루는 액션
const GET_CHAT = "GET_CHAT";
// 채팅방을 옮기는 액션
const MOVE_CHAT = "MOVE_CHAT";
// 채팅방의 대화 내용을 가져오기 (채팅하면서 추가)
const GET_MESSAGES = "GET_MESSAGES";
// 저장한 대화 내용 없애기
const CLEAR_MESSAGES = "CLEAR_MESSAGES";
// DB의 채팅방의 대화 내용 넣어놓기
const SET_MESSAGES = "SET_MESSAGES";
// 로딩을 다루는 액션
const IS_LOADING = "IS_LOADING";
// 로딩 완료 액션
const IS_LOADED = "IS_LOADED";
// 입장한 채팅방 정보를 없애기
const CLEAR_CURRENTCHAT = "CLEAR_CURRENTCHAT";

const getChat = createAction(GET_CHAT, (chatInfo) => ({
  chatInfo,
}));
const moveChat = createAction(MOVE_CHAT, (currentChat) => ({ currentChat }));

const getMessages = createAction(GET_MESSAGES, (messages) => ({ messages }));

const clearMessages = createAction(CLEAR_MESSAGES, () => ({}));

const setMessages = createAction(
  SET_MESSAGES,
  (chatRoomInfo, messages, page) => ({
    chatRoomInfo,
    messages,
    page,
  })
);

const isLoading = createAction(IS_LOADING, () => ({}));

const isLoaded = createAction(IS_LOADED, () => ({}));

const clearCurrentChat = createAction(CLEAR_CURRENTCHAT, () => ({}));

const initialState = {
  // 채팅 리스트를 받는 배열
  chatInfo: [],
  // 현재 접속 채팅 방
  currentChat: {
    roomId: null,
    roomName: null,
    category: null,
    page: 0,
    next: false,
  },
  // 현재 접속 채팅 메시지
  messages: [],

  messageCurPage: null,
  // 메시지 총 페이지
  messageTotalPage: null,
  // 메시지 로딩
  loading: false,
  // 사용자가 설정한 카테고리(채팅방 생성시)
  selectedCategory: [],
  // 메세지 하나 추가되면 true
  editDone: false,
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
        const chatRoomInfo = res.data;
        const chatMessagesArray = chatRoomInfo.messageList;
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
    //roomId 받는 곳?
    [MOVE_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.currentChat = action.payload.currentChat;
      }),

    [GET_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.messages.push(action.payload.messages);
        // state.loading = true;
        draft.editDone = true;
      }),

    [CLEAR_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = [];
      }),

    [SET_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.page > 1) {
          draft.messages.unshift(...action.payload.messages);
        } else {
          draft.messages = action.payload.messages;
        }
        draft.currentChat = action.payload.chatRoomInfo;

        draft.currentChat.page = action.payload.page;
      }),

    [IS_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = false;
      }),
    [IS_LOADED]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = true;
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
  moveChat,
  getMessages,
  clearMessages,
  isLoading,
  isLoaded,
  clearCurrentChat,
  getChat,
};

export { actionCreators };

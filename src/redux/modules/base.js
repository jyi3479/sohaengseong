import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const SET_HEADER = "SET_HEADER";
const SET_GNB = "SET_GNB";
const SET_COPY = "SET_COPY";

export const setHeader = createAction(
  SET_HEADER,
  (text, search_btn, notice, currentMember) => ({
    text,
    search_btn,
    notice,
    currentMember,
  })
);
export const setGnb = createAction(SET_GNB, (state) => ({ state }));
export const setCopy = createAction(SET_COPY, (copy) => ({copy}));

const initialState = {
  header: {
    text: "",
    search_btn: false,
    notice:false,
    currentMember: 1,
  },
  gnb: true,
  copy:false,
};

export default handleActions(
  {
    [SET_HEADER]: (state, action) =>
      produce(state, (draft) => {
        draft.header.text = action.payload.text;
        draft.header.search_btn = action.payload.search_btn;
        draft.header.notice = action.payload.notice;
        draft.header.currentMember = action.payload.currentMember;
      }),
    [SET_GNB]: (state, action) =>
      produce(state, (draft) => {
        draft.gnb = action.payload.state;
      }),
    [SET_COPY]: (state, action) =>
      produce(state, (draft) => {
        draft.copy = action.payload.copy;
      }),
  },
  initialState
);

const actionCreators = {
  //액션 생성자 내보내기
  setHeader,
  setGnb,
};

export { actionCreators };

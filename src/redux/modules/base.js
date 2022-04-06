import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SET_HEADER = "SET_HEADER";
const SET_GNB = "SET_GNB";
const SET_COPY = "SET_COPY";

//헤더 타입별 분기 (text=타이틀,search_btn=검색버튼,notice=알림버튼,currentMember=채팅멤버수)
export const setHeader = createAction(
  SET_HEADER,
  (text, search_btn, notice, currentMember) => ({
    text,
    search_btn,
    notice,
    currentMember,
  })
);
//GNB(footer) 분기 (true면 보이고 false면 안보임)
export const setGnb = createAction(SET_GNB, (state) => ({ state }));
//공유기능 실행 시 클립보드에 주소가 잘 복사 됐는지 확인하는 액션
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

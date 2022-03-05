import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const SET_HEADER = "SET_HEADER";
const SET_GNB = "SET_GNB";


export const setHeader = createAction(SET_HEADER, (detail,text,search_btn)=>({detail,text,search_btn}));
export const setGnb = createAction(SET_GNB, (state)=>({state}));

const initialState = {
    header:{
        detail:true,
        search_btn:false,
        text:"",
        
    },
    gnb: true,
};

export default handleActions(
  {
    [SET_HEADER]: (state, action) =>
      produce(state, (draft) => {
        draft.header.detail = action.payload.detail;
        draft.header.search_btn = action.payload.search_btn;
        draft.header.text = action.payload.text;

    }),
    [SET_GNB]: (state, action) => produce(state, (draft) => {
        draft.gnb = action.payload.state;        
    }),
},initialState);

const actionCreators = {
  //액션 생성자 내보내기
  setHeader,
};

export { actionCreators };

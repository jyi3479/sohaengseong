import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";

const SET_HEADER = "SET_HEADER";
export const setHeader = createAction(SET_HEADER, (detail,text)=>({detail,text}));

const initialState = {
    header:{
        detail:false,
        text:"",
    }    
};


export default handleActions ({
    [SET_HEADER]: (state, action) => produce(state, (draft) => {
        draft.header.detail = action.payload.detail;
        draft.header.text = action.payload.text;
    }),
},initialState);


const actionCreators = { //액션 생성자 내보내기
    
};

export {actionCreators};
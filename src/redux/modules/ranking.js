import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { mainApis } from "../../shared/apis";

const GET_RANK = "GET_RANK";
//DB에서 가져온 랭킹 정보 리덕스에 넣기
const getRank = createAction(GET_RANK, (rank_list)=>({rank_list}));

const initialState = {
    list:[]
};


const getRankingDB = () => {
    return function (dispatch, getState, {history}) {
        mainApis.ranking()
        .then((res)=>{
            dispatch(getRank(res.data));
        }).catch((err)=>{
            console.log("랭킹불러오기 실패",err);
        })
    };
};




export default handleActions ({
    [GET_RANK]: (state,action) => produce(state, (draft)=>{
        draft.list = action.payload.rank_list;
    }),
},initialState);


const actionCreators = { //액션 생성자 내보내기
    getRankingDB, 
};

export {actionCreators};
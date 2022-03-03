import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const GET_RANK = "GET_RANK";

const getRank = createAction(GET_RANK, (rank_list)=>({rank_list}));


const initialState = {
    list:[
        {
            userId:"aaa@aaa.com",
            nickname:"마늘빵아몬드",
            profileImage:"https://www.garyqi.com/wp-content/uploads/2017/01/default-avatar-500x500.jpg",
            point:"564",
            level:"5",
            rank:"up"
        },
        {
            userId:"aaa2@aaa.com",
            nickname:"안진희",
            profileImage:"https://www.garyqi.com/wp-content/uploads/2017/01/default-avatar-500x500.jpg",
            point:"564",
            level:"4",
            rank:"up"
        },
        {
            userId:"aaa3@aaa.com",
            nickname:"개발신",
            profileImage:"https://www.garyqi.com/wp-content/uploads/2017/01/default-avatar-500x500.jpg",
            point:"564",
            level:"3",
            rank:"down"
        },
        {
            userId:"aaa6@aaa.com",
            nickname:"내닉네임",
            profileImage:"http://cdn.edujin.co.kr/news/photo/202102/35063_66368_1421.jpg",
            point:"21",
            level:"1",
            rank:"up",
            myRank:"20"
        },
    ]
};


export default handleActions ({
    [GET_RANK]: (state,action) => produce(state, (draft)=>{
        draft.list = action.payload.rank_list;
    }),
},initialState);


const actionCreators = { //액션 생성자 내보내기
    
};

export {actionCreators};
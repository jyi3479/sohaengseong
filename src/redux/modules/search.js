import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";


const GET_SEARCH = "GET_SEARCH";
const GET_RECOMMEND = "GET_RECOMMEND";

const getSearch = createAction(GET_SEARCH, (search_list)=> ({search_list}));
const getRecommend = createAction(GET_RECOMMEND, (recommend_list) => ({recommend_list}));


const initialState = {
    list:[
        {
            challengeId:"0",
            title:"제목이 길다면?",
            content:"우리의 운동조건은 열심히 하는 것 단 하나 입니다",   
            category:"일상",
            challengeImage:"http://www.readersnews.com/news/photo/201502/52827_9951_450.jpg",
            maxMember:10,
            currentMember:0,
            startDate:"2022-02-28",
            endDate:"2022-03-10",
            isPrivate:false,
            password:1234,
            tagName:["해시태그1", "해시태그2", "해시태그3"],
            status:"ing"
        },
        {
            challengeId:"1",
            title:"일상2",
            content:"공부하자!공부!",   
            category:"일상",
            challengeImage:"http://www.readersnews.com/news/photo/201502/52827_9951_450.jpg",
            maxMember:20,
            currentMember:10,
            startDate:"2022-02-28",
            endDate:"2022-03-10",
            isPrivate:false,
            password:1234,
            tagName:["해시태그1", "해시태그2", "해시태그3"],
            status:"ing"
        },
    ],    
    recommend:[
        "추천 검색어1", 
        "추천 검색어2",
        "추천 검색어3",
        "추천 검색어4",
        "추천 검색어5",
    ],
};

export default handleActions ({
    [GET_SEARCH]: (state,action) => produce (state,(draft)=>{
        draft.list = action.payload.search_list;
    }),
    [GET_RECOMMEND]: (state,action) => produce (state,(draft)=>{
        draft.recommend = action.payload.recommend_list;
    }),
},initialState);


const actionCreators = { //액션 생성자 내보내기
    
};

export {actionCreators};
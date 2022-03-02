import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";
import { challengeApis } from "../../shared/apis";

const GET_CHALLENGE = "GET_CHALLENGE";
const TARGET_CHALLENGE = "TARGET_CHALLENGE";
const GET_CATEGORY = "GET_CATEGORY";
const GET_CATEGORY_LIST = "GET_CATEGORY_LIST";
const ADD_CHALLENGE = "ADD_CHALLENGE";
const EDIT_CHALLENGE = "ADD_CHALLENGE";
const DELETE_CHALLENGE = "DELETE_CHALLENGE";

const getChallenge = createAction(GET_CHALLENGE, (challenge_list)=>({challenge_list}));
const targetChallenge = createAction(TARGET_CHALLENGE, (target) => ({target}));
const addChallenge = createAction(ADD_CHALLENGE, (challenge)=>({challenge}));
const editChallenge = createAction(EDIT_CHALLENGE, (challengeId, challenge) =>({challengeId, challenge}));
const deleteChallenge = createAction(DELETE_CHALLENGE, (challengeId,) =>({challengeId}));
const getCategory = createAction(GET_CATEGORY, (category)=> ({category}));
const getCategoryList = createAction(GET_CATEGORY_LIST, (categoryId,category_list)=> ({categoryId,category_list}));

const initialState = {
    list:[
        {
            challengeId:"0",
            title:"일상",
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
        {
            challengeId:"2",
            title:"루틴",
            content:"우리의 운동조건은 열심히 하는 것 단 하나 입니다",   
            category:"루틴",
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
            challengeId:"3",
            title:"루틴",
            content:"공부하자!공부!",   
            category:"루틴",
            challengeImage:"http://www.readersnews.com/news/photo/201502/52827_9951_450.jpg",
            maxMember:20,
            currentMember:10,
            startDate:"2022-02-28",
            endDate:"2022-03-10",
            isPrivate:false,
            password:1234,
            tagName:["해시태그1", "해시태그2", "해시태그3"],
            status:"ing"
        }

    ],
    category:[
        {
            categoryId:0,
            categoryIcon:"https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
            categoryLabel:"일상"
        },
        {
            categoryId:1,
            categoryIcon:"https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
            categoryLabel:"루틴"
        },
        {
            categoryId:2,
            categoryIcon:"https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
            categoryLabel:"운동"
        },
        {
            categoryId:3,
            categoryIcon:"https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
            categoryLabel:"스터디"
        },
        {
            categoryId:4,
            categoryIcon:"https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
            categoryLabel:"식습관"
        },
        {
            categoryId:5,
            categoryIcon:"https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
            categoryLabel:"힐링"
        },
        {
            categoryId:6,
            categoryIcon:"https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
            categoryLabel:"취미"
        },
        {
            categoryId:7,
            categoryIcon:"https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
            categoryLabel:"셀프케어"
        },
        {
            categoryId:8,
            categoryIcon:"https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
            categoryLabel:"펫"
        },
        {
            categoryId:9,
            categoryIcon:"https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
            categoryLabel:"친환경"
        },
    ],
    category_list:[
        [
            {
                challengeId:"0",
                title:"일상",
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
            }
        ],
        [
            {
                challengeId:"2",
                title:"루틴",
                content:"우리의 운동조건은 열심히 하는 것 단 하나 입니다",   
                category:"루틴",
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
                challengeId:"3",
                title:"루틴",
                content:"공부하자!공부!",   
                category:"루틴",
                challengeImage:"http://www.readersnews.com/news/photo/201502/52827_9951_450.jpg",
                maxMember:20,
                currentMember:10,
                startDate:"2022-02-28",
                endDate:"2022-03-10",
                isPrivate:false,
                password:1234,
                tagName:["해시태그1", "해시태그2", "해시태그3"],
                status:"ing"
            }
        ],
    
    ],
    target:{
        challengeId:"0",
        userId:"0",
        title:"일상",
        content:"우리의 운동조건은 열심히 하는 것 단 하나 입니다",   
        category:"일상",
        challengeImage:"http://www.readersnews.com/news/photo/201502/52827_9951_450.jpg",
        maxMember:10,
        currentMember:0,
        startDate:"2022-02-28",
        endDate:"2022-03-10",
        isPrivate:true,
        password:1234,
        tagName:["해시태그1", "해시태그2", "해시태그3"],
        members:[
            {
                userId:"0",
                nickname:"닉네임1",
                profileImage:"http://www.readersnews.com/news/photo/201502/52827_9951_450.jpg"
            },
            {
                userId:"1",
                nickname:"닉네임2",
                profileImage:"http://www.readersnews.com/news/photo/201502/52827_9951_450.jpg"
            },
            {
                userId:"2",
                nickname:"닉네임2",
                profileImage:"http://www.readersnews.com/news/photo/201502/52827_9951_450.jpg"
            },
            {
                userId:"3",
                nickname:"닉네임2",
                profileImage:"http://www.readersnews.com/news/photo/201502/52827_9951_450.jpg"
            },
            {
                userId:"4",
                nickname:"닉네임2",
                profileImage:"http://www.readersnews.com/news/photo/201502/52827_9951_450.jpg"
            },
            {
                userId:"5",
                nickname:"닉네임2",
                profileImage:"http://www.readersnews.com/news/photo/201502/52827_9951_450.jpg"
            },
        ],
        status:"ing"
    },
};

const getOneChallengeDB = (challengeId) => {
    return function (dispatch, getState, {history}) {
        // challengeApis.getOneChallenge(challengeId)
        // .then((res)=>{
        //     console.log("특정 챌린지 조회",res);
        // }).catch((err)=>{
        //     console.log("특정 챌린지 조회 오류",err);
        // });
    };
};

const joinChallengeDB = (challengeId) => {
    return function (dispatch, getState, {history}) {
        // challengeApis.joinChallenge(challengeId)
        // .then((res)=>{
        //     console.log("챌린지 참여하기",res);
        // }).catch((err)=>{
        //     console.log("챌린지 참여하기 오류",err);
        // });
    };
}


export default handleActions ({
    [GET_CHALLENGE]: (state,action) => produce(state, (draft) => {
        draft.list = action.payload.challenge_list;
    }),
    [TARGET_CHALLENGE]:(state,action) => produce(state, (draft) => {
        draft.target = action.payload.target;
    }),
    [GET_CATEGORY]: (state,action) => produce(state, (draft) => {
        draft.category = action.payload.category;
    }),
    [GET_CATEGORY_LIST]: (state,action) => produce(state, (draft) => {
        const categoryId = action.payload.categoryId;
        const category_list = action.payload.category_list;
        draft.category_list[categoryId] = category_list;
    }),

},initialState);


const actionCreators = { //액션 생성자 내보내기
    getChallenge,
    getCategory,
    getOneChallengeDB,
    joinChallengeDB
};

export {actionCreators};
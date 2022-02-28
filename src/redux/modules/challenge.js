import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";

const GET_CHALLENGE = "GET_CHALLENGE";
const ADD_CHALLENGE = "ADD_CHALLENGE";
const EDIT_CHALLENGE = "ADD_CHALLENGE";
const DELETE_CHALLENGE = "DELETE_CHALLENGE";

const getChallenge = createAction(GET_CHALLENGE, (challenge_list)=>({challenge_list}));
const addChallenge = createAction(ADD_CHALLENGE, (challenge)=>({challenge}));
const editChallenge = createAction(EDIT_CHALLENGE, (challengeId, challenge) =>({challengeId, challenge}));
const deleteChallenge = createAction(DELETE_CHALLENGE, (challengeId,) =>({challengeId}));


const initialState = {
    list:[
        {
            challengeId:"0",
            title:"같이 운동해요",
            content:"우리의 운동조건은 열심히 하는 것 단 하나 입니다",   
            category:"운동",
            challengeImage:"http://www.readersnews.com/news/photo/201502/52827_9951_450.jpg",
            maxMember:10,
            currentMember:0,
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
};


export default handleActions ({
    [GET_CHALLENGE]: (state,action) => produce(state, (draft) => {
        draft.list = action.payload.challenge_list;
    }),
},initialState);


const actionCreators = { //액션 생성자 내보내기
    getChallenge,
};

export {actionCreators};
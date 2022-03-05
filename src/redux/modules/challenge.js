import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";
import { challengeApis } from "../../shared/apis";

const GET_CHALLENGE = "GET_CHALLENGE";
const TARGET_CHALLENGE = "TARGET_CHALLENGE";
const GET_CATEGORY = "GET_CATEGORY";
const GET_CATEGORY_LIST = "GET_CATEGORY_LIST";
const ADD_CHALLENGE = "ADD_CHALLENGE";
const EDIT_CHALLENGE = "EDIT_CHALLENGE";
const DELETE_CHALLENGE = "DELETE_CHALLENGE";

const getChallenge = createAction(GET_CHALLENGE, (challenge_list) => ({
  challenge_list,
}));
const targetChallenge = createAction(TARGET_CHALLENGE, (target) => ({
  target,
}));
const addChallenge = createAction(ADD_CHALLENGE, (challenge) => ({
  challenge,
}));
const editChallenge = createAction(
  EDIT_CHALLENGE,
  (challengeId, challenge) => ({ challengeId, challenge })
);
const deleteChallenge = createAction(DELETE_CHALLENGE, (challengeId) => ({
  challengeId,
}));
const getCategory = createAction(GET_CATEGORY, (category) => ({ category }));
const getCategoryList = createAction(
  GET_CATEGORY_LIST,
  (categoryId, category_list) => ({ categoryId, category_list })
);

const initialState = {
  list: [],
  category: [
    {
      categoryId: 0,
      categoryIcon:
        "https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
      categoryLabel: "일상 루틴",
    },
    {
      categoryId: 1,
      categoryIcon:
        "https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
      categoryLabel: "운동",
    },
    {
      categoryId: 2,
      categoryIcon:
        "https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
      categoryLabel: "스터디",
    },
    {
      categoryId: 3,
      categoryIcon:
        "https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
      categoryLabel: "식습관",
    },
    {
      categoryId: 4,
      categoryIcon:
        "https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
      categoryLabel: "힐링",
    },
    {
      categoryId: 5,
      categoryIcon:
        "https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
      categoryLabel: "취미",
    },
    {
      categoryId: 6,
      categoryIcon:
        "https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
      categoryLabel: "셀프케어",
    },
    {
      categoryId: 7,
      categoryIcon:
        "https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
      categoryLabel: "펫",
    },
    {
      categoryId: 8,
      categoryIcon:
        "https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-exercise-icon-for-your-project-png-image_1532821.jpg",
      categoryLabel: "친환경",
    },
  ],
  target:null,
};

const getChallengeDB = () => {
  return function (dispatch, getState, {history}){
    challengeApis.getChallenge()
    .then((res)=>{
      const challenge_list = res.data;
      dispatch(getChallenge(challenge_list));
      //console.log("전체 챌린지 조회",res);
    }).catch((err)=>{
      console.log("전체 챌린지 조회 오류",err);
    })
  };
}


const getOneChallengeDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    challengeApis.getOneChallenge(challengeId)
    .then((res)=>{
        const target = res.data;
        dispatch(targetChallenge(target));
        console.log("특정 챌린지 조회",res.data);
    }).catch((err)=>{
        console.log("특정 챌린지 조회 오류",err);
    });
  };
};

const joinChallengeDB = (challengeId) => {
  return function (dispatch, getState, { history }) {

    console.log("챌린지참여", challengeId);
    // challengeApis.joinChallenge(challengeId)
    // .then((res)=>{
    //     console.log("챌린지 참여하기",res);
    // }).catch((err)=>{
    //     console.log("챌린지 참여하기 오류",err);
    // });
  };
};

const addChallengeDB = (challenge) => {
  return function (dispatch, getState, { history }) {
    console.log(challenge);
    challengeApis
      .addChallenge(challenge)
      .then((res) => {
        console.log("챌린지 등록", res);
      })
      .catch((err) => {
        console.log("챌린지 등록 오류", err);
      });
  };
};

const editChallengeDB = (challengeId, challenge) => {
  return function (dispatch, getState, { history }) {
    challengeApis
      .editChallenge(challengeId, challenge)
      .then((res) => {
        console.log("챌린지 수정", res);
      })
      .catch((err) => {
        console.log("챌린지 수정 오류", err);
      });
  };
};

export default handleActions(
  {
    [GET_CHALLENGE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.challenge_list;
      }),

    [ADD_CHALLENGE]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.challenge);
      }),

    [EDIT_CHALLENGE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.challengeId === action.payload.challengeId
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.challenge };
      }),

    [TARGET_CHALLENGE]: (state, action) =>
      produce(state, (draft) => {
        draft.target = action.payload.target;
      }),
    [GET_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        draft.category = action.payload.category;
      }),
    [GET_CATEGORY_LIST]: (state, action) =>
      produce(state, (draft) => {
        const categoryId = action.payload.categoryId;
        const category_list = action.payload.category_list;
        draft.category_list[categoryId] = category_list;
      }),
  },
  initialState
);

const actionCreators = {
  //액션 생성자 내보내기
  getChallengeDB,
  getCategory,
  getOneChallengeDB,
  joinChallengeDB,
  addChallenge, //실험용 -> 서버랑 연결 후 지울 것
  addChallengeDB,
  editChallengeDB,
  editChallenge,
};

export { actionCreators };

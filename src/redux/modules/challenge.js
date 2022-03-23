import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { challengeApis } from "../../shared/apis";
import { mainApis } from "../../shared/apis";

import { actionCreators as chatAction } from "./chat";

const GET_CHALLENGE = "GET_CHALLENGE";
const TARGET_CHALLENGE = "TARGET_CHALLENGE";
const GET_CATEGORY = "GET_CATEGORY";
const GET_CATEGORY_LIST = "GET_CATEGORY_LIST";
const ADD_CHALLENGE = "ADD_CHALLENGE";
const EDIT_CHALLENGE = "EDIT_CHALLENGE";
const DELETE_CHALLENGE = "DELETE_CHALLENGE";

const getChallenge = createAction(GET_CHALLENGE, (challenge_data) => ({
  challenge_data,
}));
export const targetChallenge = createAction(TARGET_CHALLENGE, (target) => ({
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
  target: null,
  category_list: [],
  page: 0,
  has_next: false,
  is_loading:false,
};

const getChallengeDB = (page) => {
  return function (dispatch, getState, { history }) {
    const size = 6;
    console.log(page, size)
    challengeApis
      .getChallenge(page)
      .then((res) => {
        let is_next = null
        if(res.data[0].next){
          is_next = true
        } else {
          is_next = false
        }
        const challenge_data = 
        {
          challenge_list : res.data,
          page: page + 1,
          next: is_next,
        }
        

        dispatch(getChallenge(challenge_data));
      })
      .catch((err) => {
        console.log("전체 챌린지 조회 오류", err);
      });
  };
};

const getOneChallengeDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    challengeApis
      .getOneChallenge(challengeId)
      .then((res) => {
        const target = res.data;
        dispatch(targetChallenge(target));
        console.log("특정 챌린지 조회", res.data);
      })
      .catch((err) => {
        console.log("특정 챌린지 조회 오류", err);
      });
  };
};

const joinChallengeDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    challengeApis
      .joinChallenge(challengeId)
      .then((res) => {
        console.log("챌린지 참여하기", res);
        history.push(`/member/${challengeId}`);
      })
      .catch((err) => {
        console.log("챌린지 참여하기 오류", err);
        window.alert(err.response.data.message);
        history.replace("/");
      });
  };
};

const addChallengeDB = (challenge) => {
  return function (dispatch, getState, { history }) {
    console.log(challenge);
    challengeApis
      .addChallenge(challenge)
      .then((res) => {
        dispatch(
          chatAction.createRoomDB({ challengeId: res.data.challengeId })
        );
        console.log("챌린지 등록", res);
        history.replace("/today");
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
        history.replace(`/member/detail/${challengeId}`);
      })
      .catch((err) => {
        console.log("챌린지 수정 오류", err);
      });
  };
};

const deleteChallengeDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    console.log("챌린지 삭제", challengeId);
    challengeApis
      .deleteChallenge(challengeId)
      .then((res) => {
        console.log("챌린지 삭제", res);
        history.replace("/");
      })
      .catch((err) => {
        window.alert("챌린지 삭제 오류입니다!");
        console.log("챌린지 삭제 오류", err);
      });
  };
};

const categoryChallengeDB = (categoryId) => {
  return function (dispatch, getState, { history }) {
    console.log("카테고리", categoryId);

    challengeApis
      .categoryChallenge(categoryId)
      .then((res) => {
        console.log("카테고리 챌린지", res);
        dispatch(getCategoryList(categoryId, res.data));
      })
      .catch((err) => {
        console.log("카테고리 챌린지 오류", err);
      });
  };
};

const getCategoryDB = () => {
  mainApis
    .category()
    .then((res) => {
      console.log("카테고리", res);
    })
    .catch((err) => {
      console.log("카테고리", err);
    });
};

export default handleActions(
  {
    [GET_CHALLENGE]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.challenge_data.challenge_list);
        draft.page = action.payload.challenge_data.page
        draft.has_next = action.payload.challenge_data.next
        draft.is_loading = false
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
  deleteChallengeDB,
  categoryChallengeDB,
  getCategoryDB,
};

export { actionCreators };

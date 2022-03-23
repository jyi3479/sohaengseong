import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";
import { mypageApis } from "../../shared/apis";

const GET_MYINFO = "GET_MYINFO";
const GET_MYCHALLENGE  = "GET_MYCHALLENGE";

const getMyInfo = createAction(GET_MYINFO, (myInfo) => ({ myInfo }));
const getMyChallenge = createAction(GET_MYCHALLENGE, (myList) => ({ myList }));

const initialState = {
  myInfo:null,
  list: [],
};


const getMyInfoDB = (userId) => {
  return function (dispatch, getState, { history }) {
    mypageApis
      .getMyInfo(userId)
      .then((res) => {
        console.log("마이페이지 유저 정보 조회 성공", res);
        dispatch(getMyInfo(res.data));
      })
      .catch((err) => {
        console.log("마이페이지 유저 정보 조회 실패", err);
      });
  };
};

const getMyChallengeDB = (userId) => {
  return function (dispatch, getState, { history }) {
    mypageApis
      .getMyChallenge(userId)
      .then((res) => {
        console.log("마이페이지 챌린지 조회 성공", res);
        const list = res.data;
        dispatch(getMyChallenge(list));
      })
      .catch((err) => {
        console.log("마이페이지 챌린지 조회 실패", err);
      });
  };
};

export default handleActions(
  {
    [GET_MYINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.myInfo = action.payload.myInfo;
      }),
    [GET_MYCHALLENGE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.myList;
      }),
  },
  initialState
);

const actionCreators = {
  //액션 생성자 내보내기
  getMyInfoDB,
  getMyChallengeDB
};

export { actionCreators };

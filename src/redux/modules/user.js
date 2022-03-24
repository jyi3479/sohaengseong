import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";
import { userApis } from "../../shared/apis";
import { setCookie, deleteCookie } from "../../shared/cookie";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_USER = "SET_USER";
const NICK_CHECK = "NICK_CHECK";
const SET_WARNING = "SET_WARNING";

const logIn = createAction(LOGIN, (is_login) => ({ is_login }));
const logOut = createAction(LOGOUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (user, is_login) => ({
  user,
  is_login,
}));
const nickCheck = createAction(NICK_CHECK, (nickCheckres) => ({
  nickCheckres,
}));
const setWarning = createAction(SET_WARNING, (detail, text) => ({
  detail,
  text,
}));

const initialState = {
  user: null,
  is_login: null,
  nickCk: null,
  setwarning: {
    detail: false,
    text: "",
  },
};

//로그인
const loginDB = (email, password) => {
  return function (dispatch, getState, { history }) {
    userApis
      .login(email, password)
      .then((res) => {
        //console.log("로그인",res);
        setCookie("token", res.data.token);

        userApis
          .useInfo()
          .then((res) => {
            // 다른 페이지 새로고침 시에 userId를 바로 사용할 수 있도록 저장
            localStorage.setItem("userId", res.data.userId);
            dispatch(
              setUser({
                //유저정보를 다시 세팅
                userId: res.data.userId,
                email: res.data.email,
                nickname: res.data.nickname,
                profileUrl: res.data.profileUrl,
                count: res.data.dailyCount,
                level: res.data.levelName,
              })
            );
          })
          .catch((error) => console.log("유저정보저장오류", error));
        history.push("/");
      })
      .catch((code, message) => {
        console.log("로그인오류입니다!", code, message);
        dispatch(setWarning(true, "이메일 또는 비밀번호를 다시 확인해주세요."));
      });
  };
};

//닉네임 중복체크
const nicknameCheck = (nickname) => {
  return function (dispatch, getState, { history }) {
    console.log(nickname);
    userApis
      .nicknameCheck(nickname)
      .then((res) => {
        console.log(res.data);
        dispatch(nickCheck(res.data));
      })
      .catch((err) => {
        console.log("닉네임 중복확인 에러", err);
        dispatch(nickCheck(err.response.data));
      });
  };
};
//인증 메일 확인
const emailCheckToken = () => {
  return function (dispatch, getState, { history }) {
    console.log(emailCheckToken);

    userApis
      .emailCheckToken()
      .then((res) => {
        alert("인증메일이 전송되었습니다");
      })
      .catch((code, message) => {
        console.error(code, message);
        alert("인증메일이 전송되지 않았습니다");
      });
  };
};
//인증 메일 재전송
const emailCheckResend = (email) => {
  return function (dispatch, getState, { history }) {
    const mail = {
      email: email,
    };
    console.log(mail);
    userApis
      .emailCheckResend(mail)
      .then((res) => {
        console.log(res);
        alert("인증메일이 재전송되었습니다");
      })
      .catch((code, message) => {
        console.log(code, message);
        alert("인증메일이 재전송되지 않았습니다");
      });
  };
};

//로그인유저확인
const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    userApis
      .useInfo()
      .then((res) => {
        if (!localStorage.getItem("userId")) {
          localStorage.setItem("userId", res.data.userId);
        }
        dispatch(
          setUser({
            //유저정보를 다시 세팅
            userId: res.data.userId,
            email: res.data.email,
            nickname: res.data.nickname,
            profileUrl: res.data.profileUrl,
            count: res.data.dailyCount,
            level: res.data.levelName,
          })
        );
      })
      .catch((error) => console.log("유저정보저장오류", error));
  };
};

//카카오 로그인
const loginBykakao = (code) => {
  return function (dispatch, getState, { history }) {
    userApis
      .loginByKakao(code)
      .then((res) => {
        console.log(res);
        const ACCESS_TOKEN = res.data.token;
        setCookie("token", ACCESS_TOKEN);
        history.push("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
        // 바로 유저정보 저장하기
        userApis
          .useInfo()
          .then((res) => {
            if (!localStorage.getItem("userId")) {
              localStorage.setItem("userId", res.data.userId);
            }
            dispatch(
              setUser({
                //유저정보를 다시 세팅
                userId: res.data.userId,
                email: res.data.email,
                nickname: res.data.nickname,
                profileUrl: res.data.profileUrl,
                count: res.data.dailyCount,
                level: res.data.levelName,
              })
            );
          })
          .catch((error) => console.log("유저정보저장오류", error));
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        history.replace("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
      });
  };
};
//로그아웃 get
const logOutAction = () => {
  return function (dispatch, getState, { history }) {
    console.log("로그아웃 눌림");
    deleteCookie("token"); // 쿠키에서 토큰 삭제
    localStorage.removeItem("userId");
    dispatch(logOut());
    history.replace("/");
  };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [NICK_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.nickCk = action.payload.nickCheckres.result;
      }),
    [SET_WARNING]: (state, action) =>
      produce(state, (draft) => {
        draft.setwarning.detail = action.payload.detail;
        draft.setwarning.text = action.payload.text;
      }),
  },
  initialState
);

const ActionCreators = {
  //액션 생성자 내보내기
  loginDB,
  loginCheckDB,
  nicknameCheck,
  logOutAction,
  emailCheckToken,
  loginBykakao,
  emailCheckResend,
};

export { ActionCreators };

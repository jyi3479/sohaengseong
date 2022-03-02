import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axios from "axios";
import { userApis } from "../../shared/apis";
import { setCookie, deleteCookie } from "../../shared/cookie";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_USER = "SET_USER";
const VALID_EMAIL = "VALID_EMAIL";
const VERIFICATION_CODE = "VERIFICATION_CODE";

const logIn = createAction(LOGIN, (user) => ({ user }));
const logOut = createAction(LOGOUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const validEmail = createAction(VALID_EMAIL, (validemail) => ({ validemail }));
const verificationCode = createAction(
  VERIFICATION_CODE,
  (verification_code) => ({ verification_code })
);
const initialState = {
  user: null,
  is_login: null,
  validemail: false,
  verification_code: "",
};

//로그인
const loginDB = (email, password) => {
  return function (dispatch, getState, { history }) {
    console.log(email, password);

    userApis
      .login(email, password)
      .then((res) => {
        //console.log(res.headers, "로그인 토큰확인");
        setCookie("token", res.headers["authorization"], 1);

        dispatch(
          setUser({
            email: res.data.email,
            nickname: res.data.nickname,
          })
        );
      })
      /* }) */
      .catch((code, message) => {
        console.log("로그인오류입니다!", code, message);
        window.alert("로그인에 실패했습니다");
      });
  };
};

//회원가입
export const signupDB = (email, nickname, password, passwordcheck) => {
  return function (dispatch, getState, { history }) {
    console.log(email, nickname, password, passwordcheck);
    userApis
      .signup(email, nickname, password, passwordcheck)
      .then((res) => {
        //console.log(res,"회원가입");
        window.alert("회원가입 되셨습니다.");
        history.push("/login");
      })
      .catch((error) => {
        window.alert("회원가입 오류입니다!");
        //console.log("회원가입 실패:",error);
      });
  };
};

//이메일 인증 (아이디 중복체크)
const emailCheck = (email) => {
  return function (dispatch, getState, { history }) {
    console.log(email);

    userApis
      .emailCheck(email)
      .then((res) => {
        alert("사용 가능한 이메일입니다");
        dispatch(validEmail(true));
      })
      .catch((code, message) => {
        console.error(code, message);
        alert("사용 가능한 이메일이 아닙니다");
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
        alert("사용 가능한 닉네임입니다");
      })
      .catch((code, message) => {
        console.error(code, message);
        alert("사용 가능한 닉네임이 아닙니다");
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
    userApis
      .emailCheckResend(email)
      .then((res) => {
        alert("인증메일이 재전송되었습니다");
      })
      .catch((code, message) => {
        console.log(code, message);
        alert("인증메일이 재전송되지 않았습니다");
      });
  };
};
//임시 비밀번호 발급
const tempPasswordSend = (email) => {
  return function (dispatch, getState, { history }) {
    userApis
      .emailCheckResend(email)
      .then((res) => {
        alert("메일로 임시 비밀번호가 발급되었습니다");
      })
      .catch((code, message) => {
        console.log(code, message);
        alert("메일로 임시 비밀번호가 발급되지 않았습니다");
      });
  };
};
//비밀번호 찾기
const findPassword = (password) => {
  return function (dispatch, getState, { history }) {
    console.log(password);

    userApis
      .pwdCheck(password)
      .then((res) => {
        alert("비밀번호가 전송되었습니다");
      })
      .catch((code, message) => {
        console.error(code, message);
      });
  };
};

//로그인유저확인
const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    userApis
      .useInfo()

      .then((res) => {
        dispatch(
          setUser({
            //유저정보를 다시 세팅
            userId: res.data.PK,
            email: res.data.email,
            nickname: res.data.nickname,
            profileUrl: res.data.profileImage,
          })
        );
      })
      .catch((error) => console.log(error));
  };
};
//카카오 로그인
const loginBykakao = () => {
  return function (dispatch, getState, { history }) {
    userApis.loginByKakao().then((res) => {});
  };
};
//로그아웃 get
const logOutAction = () => {
  return function (dispatch, getState, { history }) {
    console.log("로그아웃 눌림");
    deleteCookie("token"); // 쿠키에서 토큰 삭제
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
    [VALID_EMAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.validemail = true;
      }),
    [VERIFICATION_CODE]: (state, action) =>
      produce(state, (draft) => {
        draft.verification_code = action.payload.verification_code;
      }),
  },
  initialState
);

const ActionCreators = {
  //액션 생성자 내보내기
  signupDB,
  loginDB,
  loginCheckDB,
  emailCheck,
  nicknameCheck,
  logOutAction,
  findPassword,
  emailCheckToken,
  loginBykakao,
  emailCheckResend,
  tempPasswordSend,
};

export { ActionCreators };
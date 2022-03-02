import axios from "axios";

const apis = axios.create({
  baseURL: process.env.REACT_APP_SERVER_PORT, //서버 주소
});

const imageApis = axios.create({
  baseURL: process.env.REACT_APP_SERVER_PORT,
});

apis.interceptors.request.use(function (config) {
  //const token = getCookie("token");
  config.headers["Content-Type"] =
    "application/json;charset=UTF-8; charset=UTF-8";
  //config.headers.common["authorization"] = `Bearer ${token}`;
  return config;
});

imageApis.interceptors.request.use(function (config) {

  //const token = getCookie("token");
  config.headers["Content-Type"] = "multipart/form-data";
  //config.headers.common["authorization"] = `Bearer ${token}`;
  return config;


});

export const userApis = {
  //로그인요청
  login: (email, password) => apis.post("/auth/signin", { email, password }),
  // 회원가입 요청
  signup: (email, nickname, password, passwordCheck) =>
    apis.post("/auth/signup", { email, nickname, password, passwordCheck }),
  //이메일 인증 (아이디 중복체크)
  emailCheck: (email) => apis.post("/auth/email-check", email),

  //닉네임 중복체크
  nicknameCheck: (nickname) => apis.post("/auth/nickname-check", nickname),

  //비밀번호 찾기
  pwdCheck: (password) => apis.post("/auth/password", password),

  //로그인 유저 확인
  useInfo: () => apis.get("/auth/user-info"),


  //인증 메일 확인
  emailCheckToken: () => apis.get("/auth/check-email-token"),

  //인증 메일 재전송
  emailCheckResend: (email) => apis.get("/auth/resend-check-email"),

  //임시 비밀번호 발급
  tempPasswordSend: (email) => apis.post("/auth/send-temp-password"),

  //소셜로그인(카카오)
  loginByKakao: () =>
    apis.post(
      "https://kauth.kakao.com/oauth/authorize?client_id=74db9f0835ac0be7fa34c1dfb64beafc&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code"
    ),

};

export const challengeApis = {
  //챌린지 전체 조회
  getChallenge: () => apis.get("/challenge"),

  //카테고리와 일치하는 챌린지 조회
  categoryChallenge: (categoryId) =>
    apis.get(`/challenge/category/${categoryId}`),

  //특정 챌린지 조회
  getOneChallenge: (challengeId) => apis.get(`/challenge/${challengeId}`),

  //챌린지 등록
  addChallenge: (challenge) => imageApis.post("/challenge", challenge),

  //챌린지 참여하기
  joinChallenge: (challengeId) => apis.post(`/challenge/${challengeId}/user`),

  //챌린지 수정하기
  editChallenge: (challengeId, challenge) =>
    imageApis.put(`/challenge/${challengeId}`, challenge),
};

export const memberApis = {
  //인증게시글(sns) 전체 조회
  getPost: (challengeId) => apis.get(`/challenge/${challengeId}/posts`),

  //인증게시글 등록
  addPost: (challengeId) => imageApis.post(`/challenge/${challengeId}/posts`),

  //인증게시글 수정
  editPost: (postId, post) => imageApis.put(`/posts/${postId}`, post),

  //인증게시글 삭제
  deletePost: (postId) => apis.delete(`/posts/${postId}`),

  //댓글 작성
  addComment: (postId, comment) =>
    apis.post(`/posts/${postId}/comments`, comment),

  //댓글 삭제
  deleteComment: (commentId) => apis.delete(`/comments/${commentId}`),

  //챌린지 참여취소(나가기)
  exitChallenge: (challengeId) => apis.delete(`/challenge/${challengeId}/user`),
};

export const searchApis = {
  //추천 검색어 (태그 - 최다 등록순)
  recommend: () => apis.get("/challenge/recommend"),

  //검색 결과 조회
  getSearch: (searchWord) => apis.get(`/challenge?search=${searchWord}`),
};

export const mainApis = {
  //카테고리 조회
  category: () => apis.get("/category"),

  //랭킹 조회
  ranking: () => apis.get("/ranking"),
};

export const mypageApis = {
  //마이페이지 챌린지 조회
  getMyChallenge: (userId) => apis.get(`/mypage/challenge/${userId}`),

  //마이페이지 유저 정보 조회
  getMyInfo: (userId) => apis.get(`/mypage/users/${userId}`),

  //프로필 수정
  editMyInfo: (userId, info) => imageApis.put(`/users/${userId}`, info),

  //프로필 수정 전 비밀번호 확인
  checkPwd: (password) => apis.post("/users/password-check", password),
};

export const chatApis = {
  //챌린지 멤버 채팅
};

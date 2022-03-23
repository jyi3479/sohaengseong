import axios from "axios";
import { getCookie } from "./cookie";
const server_port = process.env.REACT_APP_SERVER_PORT;

export const apis = axios.create({
  baseURL: "https://byungmin.shop", //서버 주소
  // baseURL: "http://15.164.245.252:8080", //소켓용 서버
});
const token = getCookie("token");
const imageApis = axios.create({
  baseURL: "https://byungmin.shop",
  // baseURL: "http://15.164.245.252:8080", //소켓용 서버

  headers: {
    "Content-type": "multipart/form-data",
    accept: "application/json",
    authorization: `Bearer ${token}`,
  },
});

apis.interceptors.request.use(function (config) {
  const token = getCookie("token");
  config.headers["Content-Type"] =
    "application/json;charset=UTF-8; charset=UTF-8";
  config.headers.common["authorization"] = `Bearer ${token}`;
  return config;
});

imageApis.interceptors.request.use(function (config) {
  const token = getCookie("token");
  // config.headers["Content-Type"] = "multipart/form-data";
  config.headers.common["authorization"] = `Bearer ${token}`;
  return config;
});

export const userApis = {
  //로그인요청
  login: (email, password) => apis.post("/auth/signin", { email, password }),

  // 회원가입 요청
  signup: (signup) => apis.post("/auth/signup", signup),

  //이메일 인증 (아이디 중복체크)
  emailCheck: (email) =>
    apis.post("/auth/email-check", {
      email: email,
    }),

  //닉네임 중복체크
  nicknameCheck: (nickname) =>
    apis.post("/auth/nickname-check", { nickname: nickname }),

  //로그인 유저 확인
  useInfo: () => apis.get("/auth/user-info"),

  //인증 메일 확인
  emailCheckToken: () => apis.get("/auth/check-email-token"),

  //인증 메일 재전송
  emailCheckResend: (email) => apis.post("/auth/resend-check-email", email),

  //임시 비밀번호 발급
  tempPasswordSend: (email) => apis.post("/auth/send-temp-password", email),

  // 소셜로그인(카카오)
  // loginByKakao: (code) => apis.get(`/auth/kakao/callback?code=${code}`),
  loginByKakao: (code) => apis.get(`/auth/kakao/callback?code=${code}`),
};

export const challengeApis = {
  //챌린지 전체 조회
  getChallenge: (page, size) =>
    apis.get(`/challenge?page=${page}&size=${size}`),

  //카테고리와 일치하는 챌린지 조회
  categoryChallenge: (categoryId, page, size) =>
    apis.get(`/challenge/category/${categoryId}?page=${page}&size=${size}`),

  //특정 챌린지 조회
  getOneChallenge: (challengeId) => apis.get(`/challenge/${challengeId}`),

  //챌린지 등록
  addChallenge: (challenge) => imageApis.post("/challenge", challenge),

  //챌린지 참여하기
  joinChallenge: (challengeId) => apis.post(`/challenge/${challengeId}/user`),

  //챌린지 수정하기
  editChallenge: (challengeId, challenge) =>
    imageApis.patch(`/challenge/${challengeId}`, challenge),

  //챌린지 삭제하기
  deleteChallenge: (challengeId) => apis.delete(`/challenge/${challengeId}`),
};

export const memberApis = {
  //인증게시글(sns) 전체 조회
  getPost: (challengeId, page, size) =>
    apis.get(`/challenge/${challengeId}/posts?page=${page}&size=${size}`),

  //특정 인증게시글(sns) 조회
  getOnePost: (challengeId, postId, page, size) =>
    apis.get(
      `/challenge/${challengeId}/posts/${postId}?page=${page}&size=${size}`
    ),

  //인증게시글 등록
  addPost: (challengeId, post) =>
    imageApis.post(`/challenge/${challengeId}/posts`, post),

  //인증게시글 수정
  editPost: (postId, post) => imageApis.patch(`/posts/${postId}`, post),

  //인증게시글 삭제
  deletePost: (postId) => apis.delete(`/posts/${postId}`),

  //댓글 작성
  addComment: (postId, comment) =>
    apis.post(`/posts/${postId}/comments`, comment),

  //댓글 삭제
  deleteComment: (commentId) => apis.delete(`/comments/${commentId}`),

  //챌린지 참여취소(나가기)
  exitChallenge: (challengeId) => apis.delete(`/challenge/${challengeId}/user`),

  //챌린지 팀원 리포트
  getReport: (challengeId, startDate) =>
    apis.post(`/challenge/${challengeId}/report`, { startDate: startDate }),
};

export const searchApis = {
  //추천 검색어 (태그 - 최다 등록순)
  recommend: () => apis.get("/challenge/recommend"),

  //검색 결과 조회
  getSearch: (searchWord) =>
    apis.get(`/challenge/search?keyword=${searchWord}`),
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
  editMyInfo: (userId, info) => imageApis.patch(`/users/${userId}`, info),

  //프로필 수정 전 비밀번호 확인
  checkPwd: (password) => apis.post("/users/password-check", password),
};

export const chatAPI = {
  //채팅방 생성
  createRoom: function (data) {
    return apis.post(`/chat/rooms`, data);
  },
  //채팅방 삭제
  deleteRoom: function (roomId) {
    return apis.delete(`/chat/rooms/${roomId}`);
  },
  //멤버 중도 하차

  //채팅방 조회
  getChatList: function () {
    return apis.get(`/chat/rooms`);
  },
  //이전 메세지 조회
  getChatMessages: function (roomId, page, size) {
    return apis.get(`/chat/rooms/${roomId}/messages?page=${page}&size=${size}`);
  },
};

const CLIENT_ID = "51ba1c37eea7f19a389098d248824455";
// const REDIRECT_URL = "http://sohangsung.co.kr/auth/kakao/callback";
const REDIRECT_URL = "http://localhost:3000/auth/kakao/callback";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;

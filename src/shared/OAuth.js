const CLIENT_ID = "8ff3bc07db2d56b28fc82cb026ccd135";
const REDIRECT_URL = "http://sohangsung.co.kr/auth/kakao/callback";
export const KAKAO_AUTH_URL =
  `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;

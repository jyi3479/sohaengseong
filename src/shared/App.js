import React, { useEffect, useRef } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

//css
import { GlobalStyle } from "../styles/globalStyle";
import logo from "../image/logo_xl@2x.png";
import backgroundImg from "../image/background.png";
import star from "../image/img_star2@2x.png";

import { getCookie } from "./cookie";

//page import
import MobileFrame from "../components/shared/MobileFrame";
import { ActionCreators as userActions } from "../redux/modules/user";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Main from "../pages/Main";
import DailyCertify from "../pages/DailyCertify";
import ChallengeDetail from "../pages/ChallengeDetail";
import CategoryTab from "../pages/CategoryTab";
import MyPage from "../pages/MyPage";
import MemberMain from "../pages/MemberMain";
import MemberPostList from "../pages/MemberPostList";
import ChallengeWrite from "../pages/ChallengeWrite";
import CategoryMain from "../pages/CategoryMain";
import Find from "../pages/Find";
import OAuth2RedirectHandler from "./OAuth2RedirectHandeler";
import ChatRoom from "../pages/ChatRoom";
import ChatList from "../pages/ChatList";
import MyCompleted from "../pages/MyCompleted";
import TodayChallenge from "../pages/TodayChallenge";
import MyEdit from "../pages/MyEdit";
import MyProfile from "../pages/MyProfile";
import MemberPostWrite from "../pages/MemberPostWrite";
import MemberPostDetail from "../pages/MemberPostDetail";
import MemberDetail from "../pages/MemberDetail";
import Notice from "../pages/Notice";
import SignComplete from "../pages/SignComplete";
import Intro from "../pages/Intro";
import Guide from "../pages/Guide";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = getCookie("token");
  const router = useSelector((state) => state.router.location.pathname);
  const scrollRef = useRef();

  useEffect(() => {
    if (token && !user) {
      dispatch(userActions.loginCheckDB());
    }
    scrollRef.current.scrollIntoView();
  }, [router]);

  return (
    <>
      <GlobalStyle />
      {/* 전역 스타일컴포넌트 */}
      <Wrapper>
        <ConnectedRouter history={history}>
          <BackgroundOpacity>
            <div className="titleBox t_center">
              <h1>나를 변화시키는 습관</h1>
              <img src={logo} alt="소행성 로고"/>
            </div>
            <img src={star} className="star1" alt="별똥별이미지"></img>
            <img src={star} className="star2" alt="별똥별이미지"></img>
            <img src={star} className="star3" alt="별똥별이미지"></img>
          </BackgroundOpacity>
          <MobileFrame className="MobileFramePage">
            <div ref={scrollRef} />
            <Switch>              
              <Route path="/login" exact component={Login} />
              {/* 로그인 */}
              <Route path="/signup/complete" exact component={SignComplete} />
                {/* 회원가입 완료 - 인증메일 확인용 */}
              <Route path="/" exact component={Main} />
              {/* 메인 */}
              <Route path="/category" exact component={CategoryMain} />
              {/* 카테고리메인*/}
              <Route
                path="/category/:categoryId"
                exact
                component={CategoryTab}
              />
              {/* 카테고리리스트 */}
              <Route path="/search" exact component={CategoryTab} />
              {/* 검색페이지 */}
              <>
                <Wrap>
                  <Header />
                  <Footer />
                  <Route path="/guide/intro" exact component={Intro} />
                  {/* 가이드 - 인트로 */}
                  <Route path="/guide/main" exact component={Guide} />
                  {/* 가이드 */}
                  <Route path="/signup" exact component={Signup} />
                  {/* 회원가입 */}                           
                  <Route path="/today" exact component={TodayChallenge} />
                  {/* 메인 > 오늘의 소행성 */}
                  <Route path="/daily" exact component={DailyCertify} />
                  {/* 메인 > 오늘의 인증 */}
                  <Route path="/notice" exact component={Notice} />
                  {/* 알림페이지 */}
                  <Route
                    path="/auth/kakao/callback"
                    component={OAuth2RedirectHandler}
                  ></Route>
                  {/* 카카오톡 로그인 */}
                  <Route
                    path="/challenge/:challengeId"
                    exact
                    component={ChallengeDetail}
                  />
                  {/* 챌린지 소개 */}
                  <Route path="/mypage" exact component={MyPage} />
                  {/* 마이페이지 */}
                  <Route
                    path="/member/:challengeId"
                    exact
                    component={MemberMain}
                  />
                  {/* 챌린지 멤버 전용 */}
                  <Route
                    path="/member/detail/:challengeId"
                    exact
                    component={MemberDetail}
                  />
                  {/* 챌린지 멤버 전용 상세*/}
                  <Route
                    path="/post/:challengeId/:roomId"
                    exact
                    component={MemberPostList}
                  />
                  {/* 챌린지 멤버 전용 속 인증 페이지 */}
                  <Route
                    path="/postwrite/:challengeId/:roomId"
                    exact
                    component={MemberPostWrite}
                  />
                  {/* 인증 페이지 속 인증글 작성 페이지 */}
                  <Route
                    path="/postwrite/:challengeId/:roomId/:postId"
                    exact
                    component={MemberPostWrite}
                  />
                  {/* 인증 페이지 속 인증글 수정 페이지 */}
                  <Route
                    path="/post/:challengeId/detail/:postId/:roomId"
                    exact
                    component={MemberPostDetail}
                  />
                  {/* 인증 페이지 속 인증글 상세 페이지*/}
                  <Route
                    path="/challengewrite"
                    exact
                    component={ChallengeWrite}
                  />
                  {/* 챌린지 작성 페이지 */}
                  <Route
                    path="/challengewrite/:challengeId"
                    exact
                    component={ChallengeWrite}
                  />
                  {/* 챌린지 수정 페이지 */}
                  <Route path="/find" exact component={Find} />
                  {/* 비밀번호찾기 */}
                  <Route path="/chatting" exact component={ChatList} />
                  {/* 채팅리스트 */}
                  <Route path="/chatting/:roomId" exact component={ChatRoom} />
                  {/* 채팅방*/}
                  <Route
                    path="/mypage/completed"
                    exact
                    component={MyCompleted}
                  />
                  {/* 마이페이지 - 성공실패 */}
                  <Route path="/mypage/profile" exact component={MyEdit} />
                  {/* 마이페이지 - 프로필수정 비번확인 */}
                  <Route
                    path="/mypage/profile/edit"
                    exact
                    component={MyProfile}
                  />
                  {/* 마이페이지 - 프로필수정 */}
                </Wrap>
              </>
            </Switch>
          </MobileFrame>
        </ConnectedRouter>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  .MobileFramePage {
    z-index: 999;
  }
`;

const BackgroundOpacity = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(250, 250, 250, 0.5);
  background-image: url(${backgroundImg});
  background-size: cover;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .titleBox {
    position: absolute;
    top: 120px;
    left: 150px;
    z-index: 3;
    h1 {
      font-weight: normal;
      color: #fff;
    }
    img {
      width: 169px;
    }
  }
  .star1 {
    animation: star1 4s ease-out infinite;
    width: 158px;
    position: absolute;
  }
  .star2 {
    animation: star2 2.5s ease-out infinite;
    width: 158px;
    position: absolute;
  }
  .star3 {
    animation: star3 2.5s ease-out infinite;
    width: 158px;
    position: absolute;
  }
  @keyframes star1 {
    from {
      opacity: 1;
      top: 0;
      left: 40vw;
      transform: scale(0.8);
    }
    to {
      opacity: 0;
      top: 100vh;
      left: -30vw;
      transform: scale(0);
    }
  }
  @keyframes star2 {
    from {
      opacity: 1;
      top: 0;
      left: 80vw;
      transform: scale(1.5);
    }
    to {
      opacity: 0;
      top: 100vh;
      left: 0;
      transform: scale(1);
    }
  }
  @keyframes star3 {
    from {
      opacity: 1;
      top: 0;
      left: 100vw;
      transform: scale(0.5);
    }
    to {
      opacity: 0;
      top: 50vh;
      left: 60vw;
      transform: scale(0);
    }
  }
`;

const Wrap = styled.div`
  margin-bottom: 56px;
`;

export default App;

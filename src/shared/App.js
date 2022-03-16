import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

//css
import { GlobalStyle } from "../styles/globalStyle";

//page import
import MobileFrame from "../components/MobileFrame";
import { ActionCreators as userActions } from "../redux/modules/user";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Main from "../pages/Main";
import ChallengeDetail from "../pages/ChallengeDetail";
import CategoryTab from "../pages/CategoryTab";
import MyPage from "../pages/MyPage";
import MemberMain from "../pages/MemberMain";
import MemberPostList from "../pages/MemberPostList";
import ChallengeWrite from "../pages/ChallengeWrite";
import Search from "../pages/Search";
import CategoryMain from "../pages/CategoryMain";
import Find from "../pages/Find";
import OAuth2RedirectHandler from "./OAuth2RedirectHandeler";
import { getCookie } from "./cookie";
import ChatRoom from "../pages/ChatRoom";
import ChatList from "../pages/ChatList";
import MyCompleted from "../pages/MyCompleted";
import TodayChallenge from "../pages/TodayChallenge";
import MyEdit from "../pages/MyEdit";
import MyProfile from "../pages/MyProfile";
import MemberPostWrite from "../pages/MemberPostWrite";
import PostDetail from "../components/Member/PostDetail";
import MemberPostDetail from "../pages/MemberPostDetail";
import MemberDetail from "../pages/MemberDetail";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = getCookie("token");

  React.useEffect(() => {
    if (token && user === null) {
      dispatch(userActions.loginCheckDB());
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      {/* 전역 스타일컴포넌트 */}
      <Wrapper>
        <ConnectedRouter history={history}>          
          <BackgroundOpacity />
          {/* <Background className="BackgroundPage" /> */}
          <MobileFrame className="MobileFramePage">
            <Switch>
              <Route path="/login" exact component={Login} />
              {/* 로그인 */}
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
                  <Route path="/signup" exact component={Signup} />
                  {/* 회원가입 */}
                  <Route path="/today" exact component={TodayChallenge} />
                  {/* 메인 > 오늘의 소행성 */}
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #2b2b2b;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  /* .BackgroundPage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -999;
  } */

  .MobileFramePage {
    z-index: 999;
  }
`;

const BackgroundOpacity = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(250, 250, 250, 0.5);
  background-size: contain;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Wrap = styled.div`
  margin-bottom: 56px;
`;

export default App;

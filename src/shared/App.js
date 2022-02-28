import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route , Switch} from "react-router-dom";
import { history } from "../redux/configureStore";
import styled from "styled-components";

//page import
import MobileFrame from "../components/MobileFrame";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Main from "../pages/Main";
import ChallengeDetail from "../pages/ChallengeDetail";



function App() {
  return (
    <>
      <Wrapper>
        <ConnectedRouter history={history}>
          <BackgroundOpacity />
          {/* <Background className="BackgroundPage" /> */}
          <MobileFrame className="MobileFramePage">
            
            <Route path="/login" exact component={Login} />{/* 로그인 */}
            <Route path="/signup" exact component={Signup} />{/* 회원가입 */}            
            <Header/>
            <Footer/>
            <Wrap>
              <Route path="/" exact component={Main} />{/* 메인 */}
              <Route path="/challenge/:challengeId" exact component={ChallengeDetail} />{/* 챌린지 소개 */}
            </Wrap>          
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
  margin: 60px 0 ;
  height: calc(100vh - 120px);
`;

export default App;

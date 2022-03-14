import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import MyChallenge from "../components/MyChallenge";
import MyLevel from "../components/MyLevel";
import { Grid, Button } from "../elements";
import { actionCreators as baseAction } from "../redux/modules/base";
import {ActionCreators as userActions} from "../redux/modules/user";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId"); 
  const logout = () => {
    dispatch(userActions.logOutAction(userId));
  };

  React.useEffect(() => {
    dispatch(baseAction.setHeader("마이행성"));
  }, []);
  return (
    <Grid margin="48px 0px 64px" padding="0px" style={{position:"relative"}}>
      <MyLevel />
      <Container>
        <MyChallenge />
      </Container>
      <Grid margin="0 20px 24px" padding="36px 0 0" width="calc(100% - 40px)" style={{borderTop:"1px solid #e4e5e6"}}>
        <Button line_btn onClick={logout}>로그아웃</Button>
      </Grid>
    </Grid>
  );
};

const Container = styled.div`
  padding: 24px 20px 0;
  
`;

const Logout = styled.button`
  width:100%;
  height: 42px;
  border-radius: 22px;
  border: solid 1px #a2aab3;
  background-color: #f4f6fa;
`;


export default MyPage;

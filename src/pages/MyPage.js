import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Grid, Button } from "../elements";
import { actionCreators as baseAction } from "../redux/modules/base";
import {ActionCreators as userActions} from "../redux/modules/user";
import MyChallenge from "../components/MyChallenge";
import MyLevel from "../components/MyLevel";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId"); 
  const logout = () => {
    dispatch(userActions.logOutAction(userId));
  };

  React.useEffect(() => {
    dispatch(baseAction.setHeader("마이행성", false,true));
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

export default MyPage;

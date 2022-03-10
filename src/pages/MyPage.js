import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import MyChallenge from "../components/MyChallenge";
import MyLevel from "../components/MyLevel";
import { Grid , Button} from "../elements";
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
    <Grid margin="48px 0px 64px" padding="0px" bg="#c4c4c4" style={{position:"relative"}}>
      <MyLevel />
      <Container>
        <MyChallenge />
      </Container>
      <Fixed>
        <Button bg="#fff" _onClick={logout}>로그아웃 하기</Button>
      </Fixed>
    </Grid>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  padding: 32px 20px;
`;

const Fixed = styled.div`
    width: 100%;
    position:absolute;
    background-color: #fff;
    border-top:1px solid #ddd;
    bottom:0;
    left:0;
    padding:28px 20px;
    button {
        border-radius: 5px;
        color:#bbb;
        border:1px solid #bbb;
    }
`;

export default MyPage;

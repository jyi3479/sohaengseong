import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import MyChallenge from "../components/MyChallenge";
import MyLevel from "../components/MyLevel";
import { Grid } from "../elements";
import { actionCreators as baseAction } from "../redux/modules/base";

const MyPage = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(baseAction.setHeader(true, "마이행성"));
  }, []);
  return (
    <Grid margin="48px 0px 0px" padding="0px" bg="#c4c4c4">
      <MyLevel />
      <Container>
        <MyChallenge />
      </Container>
    </Grid>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  padding: 32px 20px;
`;

export default MyPage;

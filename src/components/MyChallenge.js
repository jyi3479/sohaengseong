import React from "react";
import styled from "styled-components";
import { Grid } from "../elements";

const MyChallenge = (props) => {
  return (
    <>
      <Wrap>
        <Grid>
          <p>오늘의 챌린지</p>
        </Grid>

        <Grid>
          <p>모집 중인 챌린지</p>
        </Grid>

        <Grid>
          <p>지난 챌린지</p>
        </Grid>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  background-color: red;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default MyChallenge;

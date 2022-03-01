import React from "react";
import styled from "styled-components";
import MyChallenge from "../components/MyChallenge";
import MyLevel from "../components/MyLevel";
import { Grid } from "../elements";

const MyPage = (props) => {
  return (
    <Grid>
      <MyLevel />
      <MyChallenge />
    </Grid>
  );
};

export default MyPage;

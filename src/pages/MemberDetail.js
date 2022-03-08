import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";

import { actionCreators as challengeAction } from "../redux/modules/challenge";
import ChallengeInfo from "../components/Member/ChallengeInfo";
import MemberReport from "../components/Member/MemberReport";
import MemberPost from "../components/Member/TodayPost";

const MemberDetail = (props) => {
  const challengeId = +useParams().challengeId;
  // 인증사진 나열 부분

  return (
    <Grid margin="48px 0 0">
      <ChallengeInfo challengeId={challengeId} />
      <MemberReport />
      <div>입주민 랭킹</div>
      <MemberPost challengeId={challengeId} />
    </Grid>
  );
};

export default MemberDetail;

import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Grid, Button } from "../elements";
import { history } from "../redux/configureStore";

import { useDispatch } from "react-redux";
import { actionCreators as baseAction } from "../redux/modules/base";
import { actionCreators as challengeAction } from "../redux/modules/challenge";
import ChallengeInfo from "../components/Member/ChallengeInfo";
import MemberReport from "../components/Member/MemberReport";
import TodayPost from "../components/Member/TodayPost";

const MemberMain = (props) => {
  const dispatch = useDispatch();
  const challengeId = +useParams().challengeId;
  // 인증사진 나열 부분

  React.useEffect(() => {
    dispatch(baseAction.setHeader("", true));
    dispatch(baseAction.setGnb(false));
    return () => {
      dispatch(baseAction.setHeader(""));
      dispatch(baseAction.setGnb(true));
    };
  }, []);

  return (
    <Grid margin="48px 0 0">
      <ChallengeInfo challengeId={challengeId} />
      <MemberReport />
      {/* <div>입주민 랭킹</div> */}
      <TodayPost challengeId={challengeId} />
      <Fixed>
        <Grid padding="0" is_flex>
          <Button
            width="calc(30% - 5px)"
            bg="#fff"
            style={{ color: "#666", border: "1px solid #666" }}
            _onClick={() => {
              history.push("/chatting");
              // history.push("/chatting/${roomId}");
            }}
          >
            실시간 톡
          </Button>
          <Button
            width="calc(70% - 5px)"
            _onClick={() => {
              history.push(`/post/${challengeId}/write`);
            }}
          >
            인증하기
          </Button>
        </Grid>
      </Fixed>
    </Grid>
  );
};

const Fixed = styled.div`
  width: 100%;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  padding: 12px 20px;
  box-shadow: 0 -5px 6px 0 rgba(0, 0, 0, 0.04);
  button {
    border-radius: 5px;
  }
`;

export default MemberMain;

import React from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as baseAction } from "../redux/modules/base";
import { actionCreators as challengeAction } from "../redux/modules/challenge";
import { actionCreators as chatAction } from "../redux/modules/chat";

import { Grid, Button } from "../elements";
import ChallengeInfo from "../components/Member/ChallengeInfo";
import MemberReport from "../components/Member/MemberReport";
import TodayPost from "../components/Member/TodayPost";

const MemberMain = (props) => {
  const dispatch = useDispatch();
  const challengeId = +useParams().challengeId;
  const target = useSelector((state) => state.challenge.target);

  // header, footer 부분
  React.useEffect(() => {
    dispatch(challengeAction.getOneChallengeDB(challengeId));
    dispatch(baseAction.setHeader("", true,true));
    dispatch(baseAction.setGnb(false));
    return () => {
      dispatch(baseAction.setHeader(""));
      dispatch(baseAction.setGnb(true));
    };
  }, []);

  return (
    <>
      {target && (
        <Grid margin="48px 0 0">
          <ChallengeInfo challengeId={challengeId} target={target} />
          <MemberReport status={target.status} startDate={target.startDate} />
          {/* <div>입주민 랭킹</div> */}
          {target.status !== "모집중" && (
            <>
              <TodayPost challengeId={challengeId} roomId={target.roomId} />
              {target.status === "진행중" && (
                <Fixed>
                  <Grid padding="0" is_flex>
                    <Button
                      width="calc(30% - 5px)"
                      bg="#fff"
                      style={{ color: "#030102", border: "1px solid #666" }}
                      _onClick={() => {
                        history.push(`/chatting/${target.roomId}`);
                        dispatch(chatAction.moveChat(true));
                      }}
                    >
                      실시간 톡
                    </Button>
                    <Button
                      width="calc(70% - 5px)"
                      _onClick={() => {
                        history.push(
                          `/postwrite/${challengeId}/${target.roomId}`
                        );
                      }}
                    >
                      인증하기
                    </Button>
                  </Grid>
                </Fixed>
              )}              
            </>
          )}
        </Grid>
      )}
    </>
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
  z-index: 5;
`;

export default MemberMain;

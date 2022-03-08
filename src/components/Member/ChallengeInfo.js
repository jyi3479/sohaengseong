import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { actionCreators as challengeAction } from "../../redux/modules/challenge";
import { Grid } from "../../elements";

const ChallengeInfo = (props) => {
  const dispatch = useDispatch();
  // router 경로 설정한 challengeId 가져오기 (string 이어서 +연산자로 숫자 변환)
  // 특정 챌린지 조회할 때 사용하면 됨
  const challengeId = props.challengeId;
  // 특정 챌린지 state 가져오기
  const target = useSelector((state) => state.challenge.target);
  console.log(target);
  // 특정 챌린지 조회 + member 데이터 조회 필요함. : useEffect
  useEffect(() => {
    dispatch(challengeAction.getOneChallengeDB(challengeId));
  }, []);
  return (
    <Grid padding="0px">
      <Grid is_flex padding="0" margin="19px 0px">
        <Title>{target.title}</Title>
        <DetailBtn> 상세보기</DetailBtn>
      </Grid>
      <StatusContainer>
        <Grid padding="14px">
          <Grid padding="0" center>
            <p>기간</p>
            <p>15일</p>
          </Grid>
        </Grid>
        <div
          style={{
            borderRight: "1px solid #c7c7c7",
            height: "20px",
            margin: "auto 0px",
          }}
        />
        <Grid padding="14px">
          <Grid padding="0" center>
            <p>멤버</p>
            <p>
              {target.currentMember}/{target.maxMember}
            </p>
          </Grid>
        </Grid>
        <div
          style={{
            borderRight: "1px solid #c7c7c7",
            height: "20px",
            margin: "auto 0px",
          }}
        />
        <Grid padding="14px">
          <Grid padding="0" center>
            <p>공개여부</p>
            <p>{target.isPrivate ? "비공개" : "공개"}</p>
          </Grid>
        </Grid>
      </StatusContainer>
    </Grid>
  );
};

const Title = styled.h3`
  margin: 0 8px 8px 1px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.44;
  letter-spacing: -0.36px;
  text-align: left;
  color: #000;
`;

const DetailBtn = styled.button`
  /* width: 59px;
  height: 26px; */

  padding: 4px 8px;
  opacity: 0.5;
  border-radius: 5px;
  border: solid 1px #707070;

  font-size: 12px;
  font-family: inherit;
  line-height: 1.83;
  letter-spacing: -0.36px;
  text-align: left;
  color: #7b7b7b;
`;

const StatusContainer = styled.div`
  display: flex;
  width: 335px;
  height: 69px;
  border-radius: 8px;
  background-color: #f7f7f7;
  p:first-child {
    font-size: 12px;
    color: #808080;
  }
  p:last-child {
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }
`;

export default ChallengeInfo;

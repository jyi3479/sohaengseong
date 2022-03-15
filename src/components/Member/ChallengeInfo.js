import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { actionCreators as challengeAction } from "../../redux/modules/challenge";
import { Grid, Button } from "../../elements";
import { history } from "../../redux/configureStore";

const ChallengeInfo = (props) => {
  const dispatch = useDispatch();
  // router 경로 설정한 challengeId 가져오기 (string 이어서 +연산자로 숫자 변환)
  // 특정 챌린지 조회할 때 사용하면 됨
  const challengeId = props.challengeId;
  const target = props.target;

  return (
    <>
      {target && (
        <Grid padding="0px">
          <Grid is_flex padding="0" margin="19px 0px">
            <h1>{target.title}</h1>
            <Button
              small_btn
              onClick={() => {
                history.push(`/member/detail/${challengeId}`);
              }}
            >
              {" "}
              상세보기
            </Button>
          </Grid>
          <StatusContainer>
            <div>
              <Grid center>
                <p className="caption caption_color mb4">기간</p>
                <p className="poppins">15일</p>
              </Grid>
            </div>
            <div>
              <Grid center>
                <p className="caption caption_color mb4">멤버</p>
                <p className="poppins">
                  {target.currentMember}/{target.maxMember}
                </p>
              </Grid>
            </div>
            <div>
              <Grid center>
                <p className="caption caption_color mb4">공개여부</p>
                <p className="poppins">
                  {target.isPrivate ? "비공개" : "공개"}
                </p>
              </Grid>
            </div>
          </StatusContainer>
        </Grid>
      )}
    </>
  );
};

const StatusContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
  border-radius: 8px;
  background-color: rgba(162, 170, 179, 0.1);
  margin: 20px 0;
  > div {
    width: 33%;
    border-right: 1px solid #e4e5e6;
    &:last-child {
      border: none;
    }
  }
`;

export default ChallengeInfo;

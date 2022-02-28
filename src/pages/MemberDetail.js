import React from "react";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";

const MemberDetail = (props) => {
  return (
    <>
      멤버전용 상세페이지
      <Grid>챌린지 제목 + 내용 부분</Grid>
      <Grid>멤버 report 부분</Grid>
      <Grid>
        <Grid is_flex>
          <p>오늘의 인증</p>
          <p
            // 리덕스 연결할 때, challengeId param으로 넣어주세용
            onClick={() => {
              history.push(`/post/0`); // 멤버 전용 챌린지 인증페이지로 이동
            }}
          >
            인증하러가기
          </p>
        </Grid>
        <Grid>인증 사진 나열</Grid>
      </Grid>
    </>
  );
};

export default MemberDetail;

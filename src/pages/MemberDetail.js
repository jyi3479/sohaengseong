import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";
import { challengeApis } from "../shared/apis";

const MemberDetail = (props) => {
  // router 경로 설정한 challengeId 가져오기 (string 이어서 +연산자로 숫자 변환)
  // 특정 챌린지 조회할 때 사용하면 됨
  const challengeId = +useParams().challengeId;
  // 특정 챌린지 state 가져오기
  const target = useSelector((state) => state.challenge.target);

  // 인증사진 나열 부분
  const postList = useSelector((state) => state.member.postList);
  // 인증 게시글에 사진 있는 post만 가져오기
  const postImageList = postList.filter((l) => l.postImage);

  // 특정 챌린지 조회 + member 데이터 조회 필요함. : useEffect
  useEffect(() => {
    challengeApis
      .getOneChallenge(challengeId)
      .then((res) => {
        console.log("특정 챌린지 조회", res);
      })
      .catch((err) => {
        console.log("특정 챌린지 조회 오류", err);
      });
  }, []);
  return (
    <>
      멤버전용 상세페이지
      <Grid>챌린지 제목 : {target.title}</Grid>
      <Grid>챌린지 내용 : {target.content}</Grid>
      <Grid>
        <Grid>멤버 report 부분</Grid>
        <Grid>
          {target.members.map((el, i) => {
            return <div key={el.userId}>{el.nickname}</div>;
          })}
        </Grid>
      </Grid>
      <Grid>
        <Grid is_flex>
          <p>오늘의 인증</p>
          <p
            onClick={() => {
              history.push(`/post/${challengeId}`); // 멤버 전용 챌린지 인증페이지로 이동
            }}
          >
            인증하러가기
          </p>
        </Grid>
        <Grid>
          {postImageList.map((el, i) => {
            return <ImageBox key={el.postId} src={el.postImage} />;
          })}
        </Grid>
      </Grid>
    </>
  );
};

const ImageBox = styled.img`
  display: inline-block;
  width: calc(50% - 30px);
  border: 1px solid #000;
  padding: 10px;
  cursor: pointer;
`;

export default MemberDetail;

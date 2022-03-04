import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";
import { Grid } from "../elements";
import Card from "./Card";
import { challengeApis } from "../shared/apis";

const MyChallenge = (props) => {
  const my_list = useSelector((state) => state.mypage.list);
  const before_list = my_list.filter((l) => l.status === "before"); //모집 중인 챌린지
  const ing_list = my_list.filter((l) => l.status === "ing"); // 진행 중인 챌린지(오늘의 챌린지)
  const completed_list = my_list.filter(
    (l) => l.status === "success" || l.status === "fail"
  ); // 지난 챌린지(success+fail)
  console.log(completed_list);

  useEffect(() => {
    challengeApis
      .getChallenge()
      .then((res) => {
        console.log("챌린지 전체 조회", res);
      })
      .catch((err) => {
        console.log("챌린지 전체 조회 오류", err);
      });
  });

  return (
    <>
      <Wrap>
        <Grid>
          <p>오늘의 챌린지</p>
          {ing_list.map((el, i) => {
            return (
              <Card
                key={el.challengeId}
                {...el}
                _onClick={() => {
                  history.push(`/member/${el.challengeId}`); //멤버 전용 페이지로 이동
                }}
              ></Card>
            );
          })}
        </Grid>

        <Grid>
          <p>모집 중인 챌린지</p>
          {before_list.map((el, i) => {
            return (
              <Card
                key={el.challengeId}
                {...el}
                _onClick={() => {
                  history.push(`/challenge/${el.challengeId}`); //소개 페이지로 이동
                }}
              ></Card>
            );
          })}
        </Grid>

        <Grid>
          <p>지난 챌린지</p>
          {completed_list.map((el, i) => {
            // 지난 챌린지 중 성공일 경우
            if (el.status === "success") {
              return (
                <Card
                  key={el.challengeId}
                  {...el}
                  _onClick={() => {
                    history.push(`/member/${el.challengeId}`); // 멤버 전용 페이지로 이동
                  }}
                  bg="orange"
                ></Card>
              );
            }
            // 지난 챌린지 중 실패일 경우
            return (
              <Card
                key={el.challengeId}
                {...el}
                _onClick={() => {
                  history.push(`/member/${el.challengeId}`); // 멤버 전용 페이지로 이동
                }}
                bg="red"
              ></Card>
            );
          })}
        </Grid>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default MyChallenge;

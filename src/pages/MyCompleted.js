import React from "react";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Card from "../components/Card";

const MyCompleted = (props) => {
  const my_list = useSelector((state) => state.mypage.list);
  const completed_list = my_list.filter(
    (l) => l.status === "성공" || l.status === "실패"
  ); // 지난 챌린지(success+fail)
  const success_list = my_list.filter((l) => l.status === "성공");
  const fail_list = my_list.filter((l) => l.status === "실패");
  return (
    <Grid margin="48px 0">
      {" "}
      <StatusContainer>
        <Grid padding="14px">
          <Grid center>
            <p>성공</p>
            <p>{success_list.length}</p>
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
          <Grid center>
            <p>실패</p>
            <p>{fail_list.length}</p>
          </Grid>
        </Grid>
      </StatusContainer>
      {completed_list.map((el, i) => {
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
  );
};

const StatusContainer = styled.div`
  margin: 16px 0;
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

export default MyCompleted;

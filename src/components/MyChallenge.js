import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button } from "../elements";
import ChallengeCard from "./ChallengeCard";
import { actionCreators as myActions } from "../redux/modules/mypage";

import arrow from "../image/icons/small_arrow.png";

const MyChallenge = (props) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const myInfo = useSelector((state) => state.mypage.myInfo);
  const my_list = useSelector((state) => state.mypage.list);
  const admin_list =
    my_list &&
    my_list.filter((l) => l.status === "모집중" && l.userId === +userId); //모집 중 & 내가 방장
  const before_list =
    my_list &&
    my_list.filter((l) => l.status === "모집중" && l.userId !== +userId); //모집 중 & 내가 참여자
  const ing_list = my_list && my_list.filter((l) => l.status === "진행중"); // 진행 중인 챌린지(오늘의 챌린지)
  const completed_list =
    my_list &&
    my_list.filter((l) => l.status === "성공" || l.status === "실패"); // 지난 챌린지(success+fail)

  //탭 클릭하면 활성화  & 탭 내용 보여주기
  const tabClick = (event, tabName) => {
    let i, x, tablinks;
    x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
  };

  useEffect(() => {
    dispatch(myActions.getMyChallengeDB(userId));
  }, []);

  return (
    <>
      {my_list && myInfo && (
        <>
          <Grid padding="0" margin="0 0 66px">
            <StatusContainer>
              <Grid padding="14px">
                <Grid padding="0" center>
                  <p>진행예정</p>
                  <p>{before_list.length}</p>
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
                  <p>진행중</p>
                  <p>{ing_list.length}</p>
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
                  <p>개설</p>
                  <p>{admin_list.length}</p>
                </Grid>
              </Grid>
            </StatusContainer>
            <Tabs>
              <li
                className="tablink active"
                onClick={(e) => {
                  tabClick(e, "ing");
                }}
              >
                진행중
              </li>
              <li
                className="tablink"
                onClick={(e) => {
                  tabClick(e, "before");
                }}
              >
                진행예정
              </li>
              <li
                className="tablink"
                onClick={(e) => {
                  tabClick(e, "admin");
                }}
              >
                개설
              </li>
            </Tabs>
            <Wrap>
              <ul>
                <li id="ing" className="tab">
                  {ing_list.map((el, i) => {
                    return (
                      <ChallengeCard
                        key={el.challengeId}
                        {...el}
                        _onClick={() => {
                          history.push(`/member/${el.challengeId}`); //멤버 전용 페이지로 이동
                        }}
                      ></ChallengeCard>
                    );
                  })}
                </li>
                <li id="before" className="tab" style={{ display: "none" }}>
                  {before_list.map((el, i) => {
                    return (
                      <ChallengeCard
                        key={el.challengeId}
                        {...el}
                        _onClick={() => {
                          history.push(`/member/${el.challengeId}`); //멤버 전용 페이지로 이동
                        }}
                      ></ChallengeCard>
                    );
                  })}
                </li>
                <li id="admin" className="tab" style={{ display: "none" }}>
                  {admin_list.map((el, i) => {
                    return (
                      <ChallengeCard
                        key={el.challengeId}
                        {...el}
                        _onClick={() => {
                          history.push(`/member/${el.challengeId}`); //멤버 전용 페이지로 이동
                        }}
                      ></ChallengeCard>
                    );
                  })}
                </li>
              </ul>
            </Wrap>
            <MyReport
              onClick={() => {
                history.push("/mypage/completed");
              }}
            >
              <h6>마이 리포트</h6>
              <p>{myInfo.nickname} 님의 지난 기록들 확인하기</p>
            </MyReport>
          </Grid>
        </>
      )}
    </>
  );
};

const Wrap = styled.div``;

const Tabs = styled.ul`
  margin: 28px 0 20px;
  li {
    display: inline-block;
    font-size: 16px;
    margin-right: 8px;
    padding-bottom: 4px;
    cursor: pointer;
  }
  li.active {
    font-weight: bold;
    border-bottom: 2px solid #000;
  }
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

const MyReport = styled.div`
  position: relative;
  margin: 39px 0 36px;
  padding: 17px 20px;
  background-color: #fcfcfc;
  background-image: url(${arrow});
  background-repeat: no-repeat;
  background-size: 19px;
  background-position: right 12px center;
  border-radius: 5px;
  cursor: pointer;
  h6 {
    font-size: 16px;
    margin-bottom: 4px;
  }
  p {
    font-size: 14px;
  }
`;

export default MyChallenge;

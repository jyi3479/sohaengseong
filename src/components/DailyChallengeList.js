import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as myActions } from "../redux/modules/mypage";

import Card from "./Card";

const DailyChallengeList = (props) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const my_list = useSelector((state) => state.mypage.list);
  const ing_list = my_list && my_list.filter((l) => l.status === "진행중"); // 진행 중인 챌린지(오늘의 챌린지)
  const daily_list = ing_list.filter((l) => l.dailyAuth === "false");

  React.useEffect(() => {
    dispatch(myActions.getMyChallengeDB(userId));
  }, []);

  return (   
    <>
        <TopBox>
            <p className="small sub_color mb4">진행중</p>
            <p className="poppins">{daily_list.length}</p>
        </TopBox>
        <div className={props.className}>
            {daily_list.map((el, i) => {
                return (
                <Card
                    key={el.challengeId}
                    {...el}
                    _onClick={() => {
                      history.push(`/member/${el.challengeId}`);
                    }}
                ></Card>
                );
            })}
        </div>
    </>   
  );
};

const TopBox = styled.div`
  padding: 20px 0;
  background-color: #fff;
  margin: 20px 0 16px;
  text-align: center;
  border-radius: 8px;
`;

export default DailyChallengeList;

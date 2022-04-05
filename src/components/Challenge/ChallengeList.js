import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { actionCreators as challengeAction } from "../../redux/modules/challenge";

import Card from "./Card";
import InfinityScroll from "../../shared/InfiniteScroll";

const ChallengeList = (props) => {
  const params = window.location.pathname;
  const dispatch = useDispatch();
  const challengeInfo = useSelector((state) => state.challenge);
  const challenge_list = challengeInfo.list;

  // 무한스크롤 콜백함수
  const getChallengeList = () => {
    dispatch(challengeAction.getChallengeDB(challengeInfo.page, 6));
  };

  React.useEffect(() => {
    if (params === "/") {
      // 메인페이지에서는 5개만 보여주기 (첫 페이지만 호출하기)
      dispatch(challengeAction.getChallengeDB(0, 5));
    } else {
      dispatch(challengeAction.getChallengeDB(0, 6));
    }
  }, []);

  return (
    <>
      {params === "/" ? (
        <Box className={props.className}>
          {challenge_list.map((el, i) => {
            return (
              <Card
                key={el.challengeId}
                {...el}
                _onClick={() => {
                  history.push(`/challenge/${el.challengeId}`);
                }}
              ></Card>
            );
          })}
        </Box>
      ) : (
        <InfinityScroll callNext={getChallengeList} paging={{ next: challengeInfo.next }}>
          <Box className={props.className}>
            {challenge_list.map((el, i) => {
              return (
                <Card
                  key={el.challengeId}
                  {...el}
                  _onClick={() => {
                    history.push(`/challenge/${el.challengeId}`);
                  }}
                ></Card>
              );
            })}
          </Box>
        </InfinityScroll>
      )}
    </>
  );
};

const Box = styled.div`
  &.main {
    .card:nth-child(n + 6) {
      display: none !important;
    }
  }
`;

export default React.memo(ChallengeList);

import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as challengeAction } from "../redux/modules/challenge";

import Card from "./Card";
import InfinityScroll from "../shared/InfiniteScroll";

const ChallengeList = (props) => {
  const dispatch = useDispatch();
  const challengeInfo = useSelector((state) => state.challenge);
  const challenge_list = challengeInfo.list;

  const getChallengeList = () => {
    console.log(challengeInfo.page);
    dispatch(challengeAction.getChallengeDB(challengeInfo.page, 6));
  };

  React.useEffect(() => {
    if (!challengeInfo.page) {
      dispatch(challengeAction.getChallengeDB(0, 6));
    }
  }, []);

  return (
    <InfinityScroll
      callNext={getChallengeList}
      paging={{ next: challengeInfo.has_next }}
    >
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

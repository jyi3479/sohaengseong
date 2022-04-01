import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actionCreators as challengeAction } from "../../redux/modules/challenge";

import { Grid } from "../../elements";
import ChallengeCard from "../ChallengeCard";
import { history } from "../../redux/configureStore";
import ScrollBar from "../shared/ScrollBar";

const RecommendList = (props) => {
  const dispatch = useDispatch();
  const challengeId = useParams().challengeId;
  const recommendList = useSelector((state) => state.challenge.recommendList);
  const is_login = useSelector((state) => state.user.user);
  React.useEffect(() => {
    if (is_login !== null) {
      dispatch(challengeAction.getRecommendDB(challengeId));
    }
  }, []);

  if (recommendList.length && is_login !== null) {
    return (
      <>
        <Grid padding="32px 20px">
          <h2>다른 행성도 둘러보기</h2>
          <ScrollBar width="500px" direction="ltr">
            <Container>
              {recommendList.map((el, i) => {
                return (
                  <ChallengeCard
                    key={el.challengeId}
                    {...el}
                    _onClick={() => {
                      history.push(`/challenge/${el.challengeId}`);
                    }}
                    className="isRecommend"
                  />
                );
              })}
            </Container>
          </ScrollBar>
        </Grid>
      </>
    );
  }

  return null;
};

const Container = styled.div`
  white-space: nowrap;
  padding-top: 12px;
`;

export default RecommendList;

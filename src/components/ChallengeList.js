import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import {actionCreators as challengeAction} from "../redux/modules/challenge";
import Card from "./Card";
import {Grid} from "../elements/index";
import styled from "styled-components";
import InfinityScroll from "../shared/InfinityScroll";

const ChallengeList = (props) => {
    const dispatch = useDispatch();
    const challenge_list = useSelector(state => state.challenge.list);
    const paging = useSelector((state) => state.challenge.paging);
    const is_loading = useSelector((state) => state.challenge.is_loading);
    
    React.useEffect(()=>{
        dispatch(challengeAction.getChallengeDB());
    },[]);

    return (
      <Box className={props.className}>
        <InfinityScroll
          callNext={() => {
            console.log("next!");
            dispatch(challengeAction.getChallengeDB(paging.next));
            console.log(paging.next);
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {challenge_list.map((el, i) => {
            return (
              <Card
                key={i}
                {...el}
                _onClick={() => {
                  history.push(`/challenge/${el.challengeId}`);
                }}
              ></Card>
            );
          })}
        </InfinityScroll>
      </Box>
    );
};

const Box = styled.div`
    &.main {
        .card:nth-child(n+6) {
            display: none !important;
        }
    }    
`;



export default ChallengeList;
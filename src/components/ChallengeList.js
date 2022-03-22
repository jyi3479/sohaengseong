import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import {actionCreators as challengeAction} from "../redux/modules/challenge";

import Card from "./Card";
import InfinityScroll from "../shared/InfiniteScroll";


const ChallengeList = (props) => {
    const dispatch = useDispatch();
    const challenge_Info = useSelector(state => state.challenge);
    const challenge_list = challenge_Info.list

    const getChallengeList = () => {
        console.log(challenge_Info.page)
        dispatch(challengeAction.getChallengeDB(challenge_Info.page))
    }

    React.useEffect(()=>{
        dispatch(challengeAction.getChallengeDB(0));
    },[]);


    return(
        <InfinityScroll callNext={getChallengeList} paging={{next: challenge_Info.has_next}} >
        <Box className={props.className}>
            
            {challenge_list.map((el,i)=>{
                return(
                    <Card 
                        key={el.challengeId}
                        {...el}
                        _onClick={()=>{
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
        .card:nth-child(n+6) {
            display: none !important;
        }
    }    
`;



export default ChallengeList;
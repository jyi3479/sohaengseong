import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import {actionCreators as challengeAction} from "../redux/modules/challenge";
import Card from "./Card";
import {Grid} from "../elements/index";
import styled from "styled-components";

const ChallengeList = (props) => {
    const dispatch = useDispatch();
    const challenge_list = useSelector(state => state.challenge.list);
    
    React.useEffect(()=>{
        dispatch(challengeAction.getChallengeDB());
    },[]);

    return(
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
    );
};

const Box = styled.div`
    &.main {
        .card:nth-child(n+11) {
            display: none !important;
        }
    }    
`;



export default ChallengeList;
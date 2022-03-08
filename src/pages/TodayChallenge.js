import React from "react";
import styled from "styled-components";
import {Grid,Button} from "../elements/index";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import * as baseAction from "../redux/modules/base";
import ChallengeList from "../components/ChallengeList";

const TodayChallenge = (props) => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.challenge.list);

    React.useEffect(()=>{
        dispatch(baseAction.setHeader("오늘의 소행성"));
        dispatch(baseAction.setGnb(false));
        return()=>{
            dispatch(baseAction.setHeader(false,""));
            dispatch(baseAction.setGnb(true));
        }
    });
    return(        
        <Grid margin="48px 0 0">
            <TopBox>
                <p>진행중</p>
                <p>{list.length}</p>
            </TopBox>
            <ChallengeList/>
        </Grid>        
    );
};

const  TopBox = styled.div`
    padding: 14px;
    background-color : #f7f7f7;
    margin : 16px 0 20px;
    text-align: center;
    border-radius:8px;
    p:first-child {
        font-size: 12px;
        color: #808080;
    }
    p:last-child {
        font-size: 16px;
        font-weight: bold;
        color: #000;
        line-height: 20px;
    }
`;

export default TodayChallenge;
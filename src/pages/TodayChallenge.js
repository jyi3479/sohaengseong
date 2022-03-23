import React from "react";
import styled from "styled-components";
import {Grid} from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import * as baseAction from "../redux/modules/base";
import ChallengeList from "../components/ChallengeList";

const TodayChallenge = (props) => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.challenge.list);

    React.useEffect(()=>{
        dispatch(baseAction.setHeader("오늘의 행성"));
        dispatch(baseAction.setGnb(false));
        return()=>{
            dispatch(baseAction.setHeader(false,""));
            dispatch(baseAction.setGnb(true));
        }
    });
    
    return(        
        <Grid margin="48px 0 0">
            <TopBox>
                <p className="small sub_color mb4">진행중</p>
                <p className="poppins">{list.length}</p>
            </TopBox>
            <ChallengeList/>
        </Grid>        
    );
};

const  TopBox = styled.div`
    padding: 20px 0;
    background-color : #fff;
    margin : 20px 0 16px;
    text-align: center;
    border-radius:8px;
`;

export default React.memo(TodayChallenge);
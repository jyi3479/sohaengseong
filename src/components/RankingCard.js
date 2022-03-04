import React from "react";
import styled from "styled-components";
import { Grid, Image } from "../elements/index";

const RankingCard = (props) => {
    const {nickname, profileImage, point, level, rank, myRank, ranking} = props;

    if(ranking === 4){
        return(
            <Grid padding="16px" margin="0 0 8px" style={{display:"flex"}} bg="#f5f5f5">
                <RankWrap >
                    <Rank className="myrank">{myRank}</Rank>
                    <State>{rank!=="none"?rank==="up"?(
                        "▲" 
                    ):(
                        "▼"
                    ):(
                        "-"
                    )}</State>
                    <Image profile={profileImage}/>
                    <Info>                        
                        <p>{nickname} <span>Me</span></p>
                        <p>Level {level}</p>                        
                    </Info>
                </RankWrap>        
                <Point>{point}</Point>
            </Grid>
        );
    }
    return(        
        <Grid padding="16px" margin="0 0 8px" style={{display:"flex"}}>
            <RankWrap >
                <Rank>{ranking}</Rank>
                <State>{rank!=="none"?rank==="up"?(
                    "▲" 
                ):(
                    "▼"
                ):(
                    "-"
                )}</State>
                <Image profile={profileImage}/>
                <Info>
                    <p>{nickname}</p>
                    <p>Level {level}</p>
                </Info>
            </RankWrap>        
            <Point>{point}</Point>
        </Grid>
    );
};

const MyRank = styled.div`
    margin: 0;
`;
const RankWrap = styled.div`
    width: calc(100% - 100px);
    display: flex;
    align-items: center;
`;
const Rank = styled.p`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    font-size: 12px;
    background-color: #c1c1c1;
    color: #fff;
    text-align: center;
    line-height: 22px;
    &.myrank {
        font-size: 12px;
        background-color: transparent;
        color: #000;
    }
`;
const State = styled.p`
    margin: 0 10px ;
    width: 10px;
    text-align: center;
    color: #7b7b7b;
    font-size:12px;
`;
const Info = styled.div`
    margin: 0 10px;

    > p:first-child {
        font-size: 14px;
        >span {
            display: inline-block;
            text-align: center;
            width: 25px;
            color: #fff;
            font-size: 12px;
            background-color: #b7b7b7;
            border-radius: 3px;
        }
    }
    p:last-child {
        color:#9d9d9d;
        font-size: 12px;
    }    
`;

const Point = styled.p`
    width: 100px;
    text-align: right;
    font-weight: bold;
    font-size: 16px;
    line-height: 37px;
`;



export default RankingCard;
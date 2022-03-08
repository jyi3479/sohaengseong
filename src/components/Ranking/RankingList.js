import React from "react";
import styled from "styled-components";
import { Grid, Image } from "../../elements/index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/modules/ranking";
import defaultImg from "../../image/img_profile_defalt @2x.png";
import RankingCard from "./RankingCard";

const RankingList = () => {
    const dispatch = useDispatch();
    const ranking = useSelector(state => state.ranking.list);  
    const userId = localStorage.getItem("userId");
    const myRank = ranking.find((m) => m.userId === userId);

    React.useEffect(()=>{
        dispatch(actionCreators.getRankingDB());
    },[]);  

    console.log(ranking);

    return(
        <Grid padding="0">
            {ranking?ranking.map((el,i)=>{
                return(
                    <RankingCard
                        key={el.userId}
                        {...el}
                        ranking={i+1}
                    />                    
                );
            }):(
                <>
                    <p>앗 랭킹이 업서용</p>
                </>
            )}
            {/* <Grid padding="16px" margin="0 0 8px" style={{display:"flex"}} bg="#f5f5f5">
                <RankWrap >
                    <Rank className="myrank">{myRank}</Rank>
                    <State>{myRank.rank!=="none"?myRank.rank==="up"?(
                        "▲" 
                    ):(
                        "▼"
                    ):(
                        "-"
                    )}</State>
                    <Image profile={myRank.profileImage !== null? myRank.profileImage : defaultImg}/>
                    <Info>                        
                        <p>{myRank.nickname} <span>Me</span></p>
                        <p>Level {myRank.level}</p>                        
                    </Info>
                </RankWrap>        
                <Point>{myRank.rankingPoint}</Point>
            </Grid> */}
        </Grid>
    );
};

const RankWrap = styled.div`
    width: calc(100% - 30px);
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
    margin: 0 6px 0 8px;
    width: 10px;
    text-align: center;
    color: #7b7b7b;
    font-size:12px;
`;
const Info = styled.div`
    margin: 0 12px;
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
    width: 30px;
    text-align: right;
    font-weight: bold;
    font-size: 16px;
    line-height: 37px;
`;

export default RankingList;
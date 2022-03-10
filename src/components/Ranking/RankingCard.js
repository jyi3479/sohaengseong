import React from "react";
import styled from "styled-components";
import { Grid, Image } from "../../elements/index";
import { useDispatch, useSelector } from "react-redux";

import down from "../../image/icon/ic_down@2x.png";
import up from "../../image/icon/ic_up@2x.png";
import same from "../../image/icon/ic_same@2x.png";
import defaultImg from "../../image/img_profile_defalt @2x.png";

const RankingCard = (props) => {
    const ranking = useSelector(state => state.ranking.list);
    const userId = localStorage.getItem("userId");
    const myRank = ranking.find((m) => m.userId === +userId);


    return(   
        <>
            <Box className={props.className}>                
                <RankWrap>
                    <div style={{display:"flex", alignItems: "center"}}>
                        <Rank className={props.className.includes("is_me")? "poppins bold is_me" : "poppins bold"} >{props.ranking}1</Rank>
                        <State>{props.rank!=="유지"?props.rank==="상승"?(
                           <img src={up}/>
                        ):(
                            <img src={down}/>         
                        ):(
                            <img src={same}/>
                        )}</State>
                        <Image shape="border" size="42" profile={props.profileImage !== null? props.profileImage : defaultImg}/>
                    </div>
                    <Info>
                        <p>{props.nickname}</p>
                        <p className="small caption_color">{props.level}</p>
                    </Info>
                </RankWrap>        
                <Point className="poppins">{props.rankingPoint}</Point>
            </Box>        
        </>
    );
};

const Box = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eff0f2;
    :last-child {
        border:none;
    }
`;

const RankWrap = styled.div`
    width: calc(100% - 30px);
    display: flex;
    align-items: center;
    padding: 12px;
`;
const Rank = styled.p`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgba(14, 32, 49, 0.7);
    color: #fff;
    text-align: center;
    line-height: 23px;
    &.is_me {
        background-color: transparent;
        color: #50566d;
    }
`;
const State = styled.div`
    width: 16px;
    height: 16px;
    margin: 0 12px 0 8px;
    >img {
        width: 100%;
    }
`;
const Info = styled.div`
    margin: 0 8px;
`;

const Point = styled.p`
    width: 30px;
    text-align: right;
    font-weight: bold;
    font-size: 16px;
    line-height: 37px;
`;



export default RankingCard;
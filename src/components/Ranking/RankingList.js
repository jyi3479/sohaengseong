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
    const myRank = ranking.findIndex((m) => m.userId === +userId);


    React.useEffect(()=>{
        dispatch(actionCreators.getRankingDB());
    },[]);  

    return(
        <Wrap>                 
            {ranking&&ranking?ranking.map((el,i)=>{
                return(                    
                    <RankingCard
                        key={i}
                        {...el}
                        className={i === 3? "is_me rankCard":"rankCard"}
                    />                    
                );
            }):(
                <>
                    <p>앗 랭킹이 업서용</p>
                </>
            )}            
        </Wrap>
    );
};

const Wrap = styled.div`
    background-color: #fff;
    border-radius: 8px;
    padding: 8px 20px;
`;
export default RankingList;
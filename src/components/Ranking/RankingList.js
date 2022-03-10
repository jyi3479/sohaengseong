import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { Button } from "../../elements/index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/modules/ranking";
import defaultImg from "../../image/img_profile_defalt @2x.png";
import RankingCard from "./RankingCard";

const RankingList = () => {
    const dispatch = useDispatch();
    const ranking = useSelector(state => state.ranking.list);  
    const userId = localStorage.getItem("userId");


    React.useEffect(()=>{
        dispatch(actionCreators.getRankingDB());
    },[]);  

    return(
        <Wrap>                 
            {ranking&&ranking &&userId?ranking.map((el,i)=>{
                return(                    
                    <RankingCard
                        key={i}
                        {...el}
                        className={i === 3? "is_me rankCard":"rankCard"}
                    />                    
                );
            }):(
                <>
                    <div style={{textAlign:"center", padding:"10px"}}>                    
                        <p className="" >로그인하고 실시간 랭킹 정보를 확인해보세요!</p>
                        <Button width="80px" height="35px" margin="10px 0 0" border_btn _onClick={()=>{history.push("/login")}}>로그인</Button>
                    </div>
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
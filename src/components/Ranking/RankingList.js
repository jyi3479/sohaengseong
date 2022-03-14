import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { Button, Grid } from "../../elements/index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/modules/ranking";
import defaultImg from "../../image/img_profile_defalt @2x.png";
import RankingCard from "./RankingCard";

const RankingList = () => {
    const dispatch = useDispatch();
    const ranking = useSelector(state => state.ranking.list);  
    const userInfo = useSelector(state => state.user.user);  


    React.useEffect(()=>{
        dispatch(actionCreators.getRankingDB());
    },[]);  

    return(
        <Wrap>                 
            {ranking&&ranking &&userInfo?ranking.map((el,i)=>{
                return(                    
                    <RankingCard
                        key={i}
                        {...el}
                        className={i === 3? "is_me rankCard":"rankCard"}
                    />                    
                );
            }):(
                <>
                    <Grid padding="0" height="auto" margin="39px 0 35px" style={{textAlign:"center"}}>
                        <p className="sub_color">로그인하고 실시간 랭킹 정보를 확인해보세요!</p>
                        <Button small_btn margin="20px 0 0"
                        _onClick={()=>{
                            history.push("/login");
                        }}>로그인</Button>
                    </Grid>
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
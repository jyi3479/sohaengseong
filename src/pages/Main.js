import React from "react";
import {Grid,Button} from "../elements/index";
import ChallengeList from "../components/ChallengeList";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import RankingCard from "../components/RankingCard";
import plus from "../image/icons/ic_more_l@2x.png";
const Main = (props) => {    
    const dispatch = useDispatch();
    const ranking = useSelector(state => state.ranking.list);   
    const userInfo = useSelector(state => state.user.user);   

    //console.log(userInfo);
    return(
        <Grid style={{background:"linear-gradient(to bottom, #999, #585858)"}} padding="48px 0 0">
            <Grid >
                <Banner>
                    <h2>작은 것부터 하나씩<br/>나를 변화시키는 소소한 습관 행성</h2>
                </Banner>
                <Planet></Planet>
            </Grid>
            <Wrap>
                <Grid style={{overflow: "hidden"}}>
                    <Info>
                        <Grid padding="0" is_flex height="auto" margin="0 0 16px">
                            <p>{userInfo&&userInfo.nickname} 님의 오늘의 습관</p>
                            <p><b>1</b>개</p>
                        </Grid>
                       <Button font_size="14px" style={{fontWeight:"bold"}} 
                       _onClick={()=>{
                           history.push("/mypage");
                       }}>인증하기</Button>
                    </Info>

                    <Grid padding="0" margin="90px 0 28px" >  
                        <Grid padding="0">
                            <CategoryWrap>
                                <li>
                                    <a href={`/category/0`}>
                                        <div></div>
                                        <p>일상</p>
                                    </a>
                                </li>
                                <li>
                                    <a href={`/category/1`}>
                                        <div></div>
                                        <p>루틴</p>
                                    </a>
                                </li>
                                <li>    
                                    <a href={`/category/2`}>
                                        <div></div>
                                        <p>운동</p>
                                    </a>
                                </li>
                                <li>
                                    <a href={`/category`}>
                                        <div><img src={plus} style={{width:"32px",paddingTop:"22px"}}/></div>
                                        <p>전체보기</p>
                                    </a>
                                </li>
                            </CategoryWrap>
                        </Grid>
                        <Ranking>
                            <Title>실시간 랭킹</Title>
                            <SubTitle>다른 입주민들 보며 동기부여하기</SubTitle>
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
                            </Grid>
                        </Ranking>
                        <div>
                            <Grid is_flex padding="0">
                                <Title>오늘의 소행성</Title>
                                <a href={`/category/all`} style={{fontSize:"12px", fontWeight:"bold"}}>더보기</a>
                            </Grid>                            
                            <SubTitle>따끈따끈한 습관 챌린지</SubTitle>                            
                            <Grid padding="0">
                                <ChallengeList/>
                            </Grid>
                            
                        </div>
                    </Grid>
                </Grid>
            </Wrap>
            
        </Grid>
    );
};

const Banner = styled.div`
    width: 100%;
    height: 235px;    
    padding: 14px 0;
    >h2 {
        margin: 0;
        font-size: 20px;
        letter-spacing: -0.6px;
        color: #fff;
        font-weight: 300;
    }
`;

const Planet = styled.div`
    position: absolute;
    background-color: #eee;
    width: 289px;
    height: 289px;
    border-radius: 50%;
    top:144px;
    left:133px;
    background-image: url("https://cdn.notefolio.net/img/10/4c/104c1250c58a5d35d0725696bedb2ce6d4f273bfc3a4949f1405a1a5c7b3bc13_v1.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    animation: target_image 20s; 
    animation-iteration-count: infinite;
    transform-origin: 50% 50%;
    @keyframes target_image {
        0% { transform: rotate(0deg); }
        50% { transform: rotate(180deg); }
        100% { transform: rotate(360deg); }
    }
`;

const Wrap = styled.div`
    background-color: white;
    border-radius: 38px 38px 0 0;
    position: relative;
    box-sizing: border-box;
    margin-top: 60px;
`;
const Info = styled.div`
    width: calc(100% - 40px);
    height: 116px;
    padding: 20px;
    box-sizing: border-box;
    position: absolute;
    left:20px;
    top: -60px;
    border-radius: 5px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
    background-color: #fff;
    p {
        font-size: 14px;
    }
`;

const CategoryWrap = styled.ul`
    display: flex;
    justify-content: space-around;
    li {        
        text-align: center;
        div{
            width: 76px;
            height: 76px;
            border-radius: 50%;
            background-color: #eee;
        }
        p {
            font-size: 12px;
            margin-top: 4px;
        }
    }
`;

const Ranking = styled.div`
    margin:56px 0 56px;
`;

const Title = styled.h3`
    font-size: 18px;
`;
const SubTitle = styled.p`
    font-size: 13px;
    color: #989797;
    margin:4px 0 16px;
`;

export default Main;
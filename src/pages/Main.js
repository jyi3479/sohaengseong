import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";

import {Grid,Button} from "../elements/index";
import ChallengeList from "../components/ChallengeList";
import plus from "../image/icons/ic_more_l@2x.png";
import bgImg from "../image/img_bg@2x.png"; 
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import RankingList from "../components/Ranking/RankingList";

const Main = (props) => {
    const userInfo = useSelector(state => state.user.user);

    return(
        <>
        <MainHeader/>
        <Container className="bg_color">
            <Grid padding="0 24px">
                <Banner>
                    <h1>소소하지만 확실한 행복<br/>행동 습관 형성 챌린지</h1>
                    <p>나를 변화시키는 습관</p>
                </Banner>
            </Grid>
            <Wrap >
                <Grid style={{overflow: "hidden"}}>
                    {userInfo?(
                        <Info>
                            <h2>안녕하세요. {userInfo&&userInfo.nickname} 님</h2>
                            <Grid padding="0" is_flex height="auto" margin="0 0 16px">
                                <p>인증 가능한 행성</p>
                                <p><b>1</b>개</p>
                            </Grid>
                        <Button
                        _onClick={()=>{
                            history.push("/mypage");
                        }}>인증하기</Button>
                        </Info>
                    ):(
                        <Info>
                            <Grid padding="0" height="auto" margin="0 0 16px" style={{textAlign:"center"}}>
                                <p>로그인 하시고 나의 인증정보를 확인하세요.</p>
                            </Grid>
                        <Button font_size="14px" style={{fontWeight:"bold"}} 
                        _onClick={()=>{
                            history.push("/login");
                        }}>로그인</Button>
                        </Info>
                    )}
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
                            {/* 랭킹 */}
                            <RankingList/>
                        </Ranking>
                        <div>
                            <Grid is_flex padding="0">
                                <Title>오늘의 소행성</Title>
                                <a href="/today" style={{fontSize:"12px", fontWeight:"bold"}}>더보기</a>
                            </Grid>                            
                            <SubTitle>따끈따끈한 습관 챌린지</SubTitle>                            
                            <Grid padding="0">
                                <ChallengeList className="main"/>
                            </Grid>
                            
                        </div>
                    </Grid>
                </Grid>
            </Wrap>            
        </Container>
        <Footer/>
        </>
    );
};

const Container = styled.div`   
    padding: 48px 0 64px;
    background-image: url(${bgImg});
    background-size: contain;
`;


const Banner = styled.div`
    width: 100%;
    height: 235px;    
    padding: 14px 0;
    * {
        color: #fff;
    }    
    h1{
        margin-bottom: 6px;
    }
`;

const Wrap = styled.div`
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
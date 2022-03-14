import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";

import {Grid,Button} from "../elements/index";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import RankingList from "../components/Ranking/RankingList";
import ChallengeList from "../components/ChallengeList";

import plus from "../image/icon/ic_plus_l@2x.png";
import bgImg from "../image/img_bg@2x.png"; 
import arrow from "../image/icon/ic_arrow_s@2x.png";


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
                            <h2>안녕하세요. <b>{userInfo&&userInfo.nickname}</b> 님</h2>
                            <Grid padding="0" is_flex height="auto" margin="0 0 22px">
                                <p className="sub_color">인증 가능한 행성</p>
                                <p className="poppins"><b className="point_color" style={{opacity:"0.8"}}>{userInfo.count}</b>개</p>
                            </Grid>
                        <Button bg="#17abd6"
                        _onClick={()=>{
                            history.push("/mypage");
                        }}>인증하기</Button>
                        </Info>
                    ):(
                        <Info>
                            <Grid padding="0" height="auto" margin="22px 0 35px" style={{textAlign:"center"}}>
                                <p className="sub_color">로그인 하시고 나의 인증정보를 확인하세요.</p>
                                <Button small_btn margin="20px 0 0"
                                _onClick={()=>{
                                    history.push("/login");
                                }}>로그인</Button>
                            </Grid>                            
                        </Info>
                    )}
                    <Grid padding="0" margin="150px 0 28px" >  
                        <Grid padding="0">
                            <CategoryWrap>
                                <li>
                                    <a href={`/category/0`}>
                                        <div></div>
                                        <p className="small">일상 루틴</p>
                                    </a>
                                </li>
                                <li>
                                    <a href={`/category/1`}>
                                        <div></div>
                                        <p className="small">운동</p>
                                    </a>
                                </li>
                                <li>    
                                    <a href={`/category/2`}>
                                        <div></div>
                                        <p className="small">스터디</p>
                                    </a>
                                </li>
                                <li>
                                    <a href={`/category`}>
                                        <div><img src={plus} style={{width:"32px",paddingTop:"20px"}}/></div>
                                        <p>전체보기</p>
                                    </a>
                                </li>
                            </CategoryWrap>
                        </Grid>
                        <Ranking>
                            <TitleBox>
                                <h2>입주민 실시간 랭킹</h2>
                                <p className="sub_color">다른 입주민들 보며 동기부여하기</p>
                            </TitleBox>             
                            {/* 랭킹 */}
                            <RankingList/>
                            <p className="small caption_color">집계기준 : 총 누적 경험치</p>
                        </Ranking>
                        <div>
                            <TitleBox>
                                <Grid is_flex padding="0">
                                    <h2>오늘의 소행성</h2>
                                    <a href="/today" style={{fontSize:"14px"}}>전체보기</a>
                                </Grid>   
                                <p className="sub_color">따끈따끈한 신규 챌린지를 만나보세요.</p>
                            </TitleBox>                                                   
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
    padding: 48px 0 56px;
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
    height: 160px;
    padding: 24px 20px;
    box-sizing: border-box;
    position: absolute;
    left:20px;
    top: -40px;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(3, 1, 2, 0.08);
    background-color: #fff;
    border-radius: 8px;
    h2 {
        font-weight: normal;
    }
`;

const CategoryWrap = styled.ul`
    display: flex;
    justify-content: space-around;
    li {        
        text-align: center;
        div{
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background-color: #0e2031;
        }
        p {
            font-size: 12px;
            margin-top: 4px;
        }
    }
`;

const Ranking = styled.div`
    margin:40px 0;
    >p {
        text-align: right;
        margin-top:8px;
    }
`;

const TitleBox = styled.div`
    margin-bottom: 12px;
    a {
        position: relative;
        padding-right: 16px;
        &::after {
            position: absolute;
            width: 16px;
            height: 16px;
            top: 1px;
            right: 0;
            content: '';
            background-image: url(${arrow});
            background-size: 16px;
        }
    }
`;

export default Main;
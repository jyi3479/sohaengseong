import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import {Grid,Button} from "../elements/index";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import RankingList from "../components/Ranking/RankingList";
import ChallengeList from "../components/ChallengeList";

import plus from "../image/icon/ic_plus_l@2x.png";
import bgImg from "../image/main_bg.png"; 
import arrow from "../image/icon/ic_arrow_s@2x.png";

//카테고리이미지
import category_01 from "../image/icon/category/ic_category_daily_l@2x.png";
import category_02 from "../image/icon/category/ic_category_health_l@2x.png";
import category_03 from "../image/icon/category/ic_category_study_l@2x.png";

const Main = (props) => {
    const userInfo = useSelector(state => state.user.user);
    const yesterday =  moment().subtract(1, 'days').format('YYYY.MM.DD');

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
                                <p className="sub_color">로그인하고 나의 인증 정보를 확인해보세요!</p>
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
                                    <a href="/category/1">
                                        <img src={category_01}/>
                                        <p className="small mt4">일상 루틴</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/category/2">
                                        <img src={category_02}/>
                                        <p className="small mt4">운동</p>
                                    </a>
                                </li>
                                <li>    
                                    <a href="/category/3">
                                        <img src={category_03}/>
                                        <p className="small mt4">스터디</p>
                                    </a>
                                </li>
                                <li>
                                    <a href={`/category`}>
                                        <div>
                                            <div><img src={plus}/></div>
                                        </div>
                                        <p className="small mt4">전체보기</p>
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
                            <p className="small caption_color">집계기준 : {yesterday} 24:00 누적 경험치</p>
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
        img{
            width: 72px;
            height: 72px;
        }
        &:last-child {
            a>div{
                width: 72px;
                height: 72px;
                >div{
                    width: 60px;
                    height: 60px;
                    background-color: #899fe8;
                    border-radius: 50%;
                    padding-top: 13px;
                    margin:5px auto 7px;
                    img { 
                        width: 32px;
                        height: 32px;
                    }
                }         
            }   
            
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
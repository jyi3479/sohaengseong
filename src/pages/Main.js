import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

//날짜 라이브러리
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { Grid, Button } from "../elements/index";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import RankingList from "../components/Ranking/RankingList";
import ChallengeList from "../components/ChallengeList";
import Banner from "../components/Banner";

import plus from "../image/icon/ic_plus_l@2x.png";
import bgImg from "../image/main_bg.png";
import arrow from "../image/icon/ic_arrow_s@2x.png";
import arrow_w from "../image/icon/arrow_ws@2x.png";
import feedbackIcon from "../image/icon/ic_feedback_b@2x.png";
import popIcon from "../image/icon/ic_popup_b@2x.png";

//카테고리이미지 (순서대로 앞 3번째까지만 노출)
import category_01 from "../image/icon/category/ic_category_daily_l@2x.png";
import category_02 from "../image/icon/category/ic_category_health_l@2x.png";
import category_03 from "../image/icon/category/ic_category_study_l@2x.png";


const Main = (props) => {
  dayjs.extend(customParseFormat); //날짜 포맷 맞추기 (파폭, 모바일 등에도 맞도록)

  const userInfo = useSelector((state) => state.user.user);
  const yesterday = dayjs().subtract(1, "day").format("YYYY.MM.DD");
  return (
    <>
      <MainHeader />
      <Container className="bg_color" id="main_wrap">
        <Grid padding="0 24px">
          <Hero>
            <h1>작은 것부터 하나씩<br/>나를 바꾸는 습관 챌린지</h1>
            <p>이루고 싶은 목표가 있으신가요?<br/>토비가 함께 도와드릴게요!</p>
            <button className="small mt16" onClick={()=>{
                history.push({                                
                  pathname: "/category/all",
                  //state: {notfocus: true},
              })
              }}>시작하기</button>
          </Hero>
        </Grid>
        <Wrap>
          <Grid style={{ overflow: "hidden" }}>
            <Info>
              {userInfo ? ( //유저 정보가 있다면 유저 정보 노출
                <>
                  <h2>
                    안녕하세요. <b>{userInfo && userInfo.nickname}</b> 님
                  </h2>
                  <Grid padding="0" is_flex height="auto" margin="0 0 22px">
                    <p className="sub_color">인증 가능한 행성</p>
                    <p className="poppins">
                      <b className="point_color" style={{ opacity: "0.8" }}>
                        {userInfo.count}
                      </b>
                      개
                    </p>
                  </Grid>
                  <Button
                    bg="#17abd6"
                    _onClick={() => {
                      history.push("/daily");
                    }}
                  >
                    인증하기
                  </Button>
                </>
              ) : (
                //유저 정보가 없다면 로그인 유도
                <Grid
                  padding="0"
                  height="auto"
                  margin="22px 0 35px"
                  style={{ textAlign: "center" }}
                >
                  <p className="sub_color">
                    로그인하고 나의 인증 정보를 확인해보세요!
                  </p>
                  <Button
                    small_btn
                    margin="20px 0 0"
                    _onClick={() => {
                      history.push("/login");
                    }}
                  >
                    로그인
                  </Button>
                </Grid>
              )}
            </Info>
            <Grid padding="0" margin="150px 0 28px">
              <CategoryWrap>
                <li>
                  <a href="/category/1">
                    <img src={category_01} />
                    <p className="small mt4">일상 루틴</p>
                  </a>
                </li>
                <li>
                  <a href="/category/2">
                    <img src={category_02} />
                    <p className="small mt4">운동</p>
                  </a>
                </li>
                <li>
                  <a href="/category/3">
                    <img src={category_03} />
                    <p className="small mt4">스터디</p>
                  </a>
                </li>
                <li>
                  <a href={`/category`}>
                    <div>
                      <div>
                        <img src={plus} />
                      </div>
                    </div>
                    <p className="small mt4">전체보기</p>
                  </a>
                </li>
              </CategoryWrap>
              <Ranking>
                <TitleBox>
                  <h2>입주민 오늘의 랭킹</h2>
                  <p className="sub_color">다른 입주민들 보며 동기부여하기</p>
                </TitleBox>
                {/* 랭킹 */}
                <RankingList />
                <p className="small caption_color">
                  집계기준 : {yesterday} 24:00 누적 경험치
                </p>
              </Ranking>
              <Banner/>
              <div>
                <TitleBox>
                  <Grid is_flex padding="0">
                    <h2>오늘의 소행성</h2>
                    <a href="/today" style={{ fontSize: "14px" }}>
                      전체보기
                    </a>
                  </Grid>
                  <p className="sub_color">
                    따끈따끈한 신규 챌린지를 만나보세요.
                  </p>
                </TitleBox>
                <Grid padding="0">
                  <ChallengeList className="main" />
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Wrap>
      </Container>
      <FeedBack>
        <img src={popIcon}/>
        <a href="https://forms.gle/kw8zpnphdhfQ7NwQ6" target="_blank"/>
      </FeedBack>
      <Footer />
    </>
  );
};

const Container = styled.div`
  padding: 48px 0 56px;
  background-image: url(${bgImg});
  background-size: contain;
`;

const Hero = styled.div`
  width: 100%;
  height: 235px;
  padding: 32px 0;
  * {
    color: #fff;
  }
  h1 {
    margin-bottom: 6px;
  }
  button {
    width: 74px;
    height: 28px;
    border-radius: 22px;
    border: solid 1px #a2aab3;
    background-image: url(${arrow_w});
    background-size: 16px;
    background-position: right 4px top 5px;
    background-color: transparent;
    color: #fff;
    padding: 5px 17px 5px 10px;
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
  left: 20px;
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
    img {
      width: 72px;
      height: 72px;
    }
    &:last-child {
      a > div {
        width: 72px;
        height: 72px;
        > div {
          width: 60px;
          height: 60px;
          background-color: #899fe8;
          border-radius: 50%;
          padding-top: 13px;
          margin: 5px auto 7px;
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
  margin: 40px 0;
  > p {
    text-align: right;
    margin-top: 8px;
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
      top: 3px;
      right: 0;
      content: "";
      background-image: url(${arrow});
      background-size: 16px;
    }
  }
`;

const FeedBack = styled.div`
  position: fixed;
  right: 0;
  bottom: 60px;
  padding-right: 15px;
  a {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-image: url(${feedbackIcon});
    background-size: cover;
    margin-left: 5px;
    cursor: pointer;
  }
  img {
    visibility: hidden;
    height: 40px;
    transition: 0.2s;
    width: 0;
  }
  &:hover {
    img {
      visibility: inherit;
  
      width: 201px;
      display: inline-block;
    }
  }
  
`;

export default Main;

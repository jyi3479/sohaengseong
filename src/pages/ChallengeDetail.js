import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";

//이미지 슬라이더(Swiper) import 
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore,{  Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

//사용자 import
import {Grid, Image} from "../elements/index";
import { actionCreators as challengeAction } from "../redux/modules/challenge";
import * as baseAction from '../redux/modules/base';
import lock from "../image/icons/ic_lock@2x.png";

const ChallengeDetail = (props) => {
    const dispatch = useDispatch();
    const challengeId = props.match.params.challengeId;
    const target = useSelector(state => state.challenge.target);
    const tagList = target.tagName;
    const members = target.members;
    const member_idx = members.findIndex((m) => m.userId === target.userId);
    const admin = members[member_idx];  

    console.log(admin);

    const confirm = () => {
        window.confirm("다른 사람들을 위해 신중하게 선택하세요! 확인을 클릭 시 챌린지에 입장합니다");
        if(confirm){
            console.log("확인누름");
            //dispatch(challengeAction.joinChallengeDB(challengeId));
            //history.push(``); //상세페이지 (멤버전용)으로 이동
        }
    };
    const prompt = () => {
        const pwd = window.prompt("비밀번호를 입력하세요");        
        console.log(pwd);
        //dispatch(challengeAction.joinChallengeDB(challengeId));
        //history.push(``); //상세페이지 (멤버전용)으로 이동        
    } 

    
    //특정 챌린지 1개 조회하기
    // React.useEffect(()=>{
    //     dispatch(challengeAction.getOneChallengeDB(challengeId));
    // },[]);

    //헤더&푸터 state
    React.useEffect(() => {
        dispatch(baseAction.setHeader(true,true,target.title));
        return()=>{
            dispatch(baseAction.setHeader(false,""));
        }
    }, []);

    
    return(
        <Grid padding="0" margin="48px 0 64px" bg="#eee">
            <Grid padding="0">
                <Swiper
                    modules={[ Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    >
                    <SwiperSlide><Image shape="rectangle" padding="250px" src={target.challengeImage}></Image></SwiperSlide>
                    <SwiperSlide><Image shape="rectangle" padding="250px" src={target.challengeImage}></Image></SwiperSlide>
                    <SwiperSlide><Image shape="rectangle" padding="250px" src={target.challengeImage}></Image></SwiperSlide>
                </Swiper>
            </Grid>
            <Grid bg="#fff" margin="0 0 10px" padding="20px">
                <TitleBox>
                    <h1>{target.title}</h1>
                    <img src={lock} style={{display:target.isPrivate?"block":"none"}}></img>
                </TitleBox>
                <p style={{fontSize:"14px", color:"#666"}}>{target.category}</p>
                <Grid padding="0" margin="12px 0">
                    {tagList.map((el, i) => {
                        return <Tag key={i}>{el}</Tag>;
                    })}
                </Grid>
                <Grid padding="0">
                    <Info>챌린지 기간 <span>{target.startDate} ~ {target.endDate}</span></Info>
                    <Info style={{marginTop:"4px"}}>모집 인원 <span>{target.currentMember}/{target.maxMember}명</span></Info>
                </Grid>                
            </Grid>

            <Grid bg="#fff" padding="20px">
                <Title>챌린지 설명</Title>
                <ContentBox style={{marginBottom:"20px"}}>
                    <div>
                        <div style={{backgroundImage:`url(${admin.profileImage})`}}></div>
                        <p>어드민닉네임</p>
                    </div>
                    <p>저녁 9~10시 1시간 동안 미드 프렌즈 보면서 같이 영어 쉐도잉 할 멤버분들 구합니다!! 시즌1~5까지 대본 준비 되어있으니 공부할 의지만 있으시면 됩니다! </p>
                </ContentBox>
                {/* 현재인원 - 디자인 확정 후 작업예정 */}
                <Title>현재 인원</Title>
                <ContentBox>
                    
                </ContentBox>
            </Grid>            
            
            {/* <Grid padding="0">
                {members.map((el, i) => {
                    return (
                        //만약에 방을 만든 userId와 멤버의 userId가 같은 경우(방장인 경우) className을 붙여준다.
                        <Member key={el.userId} className={admin === el.userId? "admin" : ""} src={el.profileImage}>    
                        </Member>
                    );
                })}
            </Grid> */}
            {/* <Grid padding="0">
                {target.isPrivate? ( //비밀방이라면 비밀번호 입력창 show                
                    <button type="button" onClick={
                        prompt
                    }>챌린지 참여하기</button>                    
                ):(
                    <button type="button" onClick={
                        confirm
                    }>챌린지 참여하기</button>
                )}
            </Grid> */}
            
        </Grid>

    );
};
const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom:5px;
    h1 {
        font-size:20px;
        line-height:25px;
        width: 232px;
        font-weight: 500;
    }
    img {
        width: 20px;
    }
`;

const Info = styled.p`
    color: #666;
    font-size:12px;
    >span {
        color: #000;
        font-weight: 500;
    }
`;
const Tag = styled.p`
  display: inline-block;
  margin: 0;
  margin-right: 6px;
  font-size:12px;
  color: #7b7b7b;
  border-radius: 5px;
  padding: 2px 4px;
  background-color: #ededed;
`;

const Title = styled.h2`
    font-size:18px;
    margin-bottom:9px;
    font-weight: 500;
    line-height:1.5;
`;

const ContentBox = styled.div`
    padding: 15px;
    border-radius: 15px;
    background-color: #efefef;
    >div{
        display: flex;
        align-items: center;
        margin-bottom:10px;
        div{
            width: 35px;
            height: 35px;
            margin: 0 10px 0 0;
            border: solid 1px #999;
            border-radius:50%;
            background-size: cover;
            background-position: center;
            position: relative;
            &::after {
                content: '';
                width:14px;
                height: 14px;
                border-radius: 50%;
                background-color: #5d5d5d;
                position: absolute;
                bottom:0;
                right: -3px;
            }
        }
    }
    p {
        font-size: 14px;
        color:#333;    
    }

`;
const Member = styled.div` 
    display: inline-block;
    width:30px;
    height:30px;
    border-radius:50%;    
    overflow: hidden;
    &:nth-child(n+6) {//5번째 멤버 이후로는 미노출
        display: none;
    }
    &.admin { //방장일 경우
        border: 3px solid #000;
    }
    background-image: url("${(props) => props.src}");
    background-size: cover;
    background-position: center;
`;

export default ChallengeDetail;
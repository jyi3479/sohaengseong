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
import {Grid} from "../elements/index";
import { actionCreators as challengeAction } from "../redux/modules/challenge";

const ChallengeDetail = (props) => {
    const dispatch = useDispatch();
    const challengeId = props.match.params.challengeId;
    const target = useSelector(state => state.challenge.target);
    const tagList = target.tagName;
    const members = target.members;
    const admin = target.userId;

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

    console.log("타겟",target, challengeId);
    return(
        <>
            <Grid>
                <Grid>
                    <Swiper
                        modules={[ Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        >
                        <SwiperSlide><img src={target.challengeImage}/></SwiperSlide>
                        <SwiperSlide><img src={target.challengeImage}/></SwiperSlide>
                        <SwiperSlide><img src={target.challengeImage}/></SwiperSlide>
                    </Swiper>
                </Grid>                
                <Grid>
                    <p>{target.title}</p>
                    <p>{target.content}</p>
                    <Grid>
                        {tagList.map((el, i) => {
                            return <Tag key={i}>{el}</Tag>;
                        })}
                    </Grid>
                    <p>{target.currentMember}/{target.maxMember}</p>
                    <Grid>
                        {members.map((el, i) => {
                            return (
                                //만약에 방을 만든 userId와 멤버의 userId가 같은 경우(방장인 경우) className을 붙여준다.
                                <MemberBox key={el.userId} className={admin === el.userId? "admin" : ""} src={el.profileImage}>    
                                </MemberBox>
                            );
                        })}
                    </Grid>
                </Grid>
                {target.isPrivate? ( //비밀방이라면 비밀번호 입력창 show                
                    <button type="button" onClick={
                        prompt
                    }>챌린지 참여하기</button>                    
                ):(
                    <button type="button" onClick={
                        confirm
                    }>챌린지 참여하기</button>
                )}
                
            </Grid>
        </>
    );
};

const Tag = styled.p`
  display: inline-block;
  margin: 0;
  margin-right: 5px;
`;
const MemberBox = styled.div` 
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
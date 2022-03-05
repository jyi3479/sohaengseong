import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { challengeApis } from "../shared/apis";
import { targetChallenge } from "../redux/modules/challenge";

//이미지 슬라이더(Swiper) import 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

//사용자 import
import {Grid, Image, Button} from "../elements/index";
import { actionCreators as challengeAction } from "../redux/modules/challenge";
import * as baseAction from '../redux/modules/base';
import lock from "../image/icons/ic_lock@2x.png";
import empty from "../image/ic_empty_s@2x.png";
import defaultImg from "../image/img_profile_defalt @2x.png";
import crown from "../image/icons/ic_crown@2x.png";
import plus from "../image/icons/ic_plus@2x.png";
import Modal from '../components/Modal';

const ChallengeDetail = (props) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.user);
    const challengeId = props.match.params.challengeId;
    const target = useSelector(state => state.challenge.target);
    const tagList = target&&target.tagName;
    const members = target&&target.members;
    const member_idx = members&&members.findIndex((m) => m.userId === parseInt(target.userId));
    const admin = members&&members[member_idx];      
    const imageList = target&&target.challengeImage;
    const startDate = target&&`${target.startDate.split(" ")[0].split("-")[0]}.${target.startDate.split(" ")[0].split("-")[1]}.${target.startDate.split(" ")[0].split("-")[2]}`;
    const endDate = target&&`${target.endDate.split(" ")[0].split("-")[0]}.${target.endDate.split(" ")[0].split("-")[1]}.${target.endDate.split(" ")[0].split("-")[2]}`;

    //console.log(target, target.title);

    const joinChallenge = () => {
        console.log("참가누름");
        if(target.isPrivate){ //비밀방 일 경우
            console.log("비밀방임");
        }
        //dispatch(challengeAction.joinChallengeDB(challengeId));

    };
    const prompt = () => {
        const pwd = window.prompt("비밀번호를 입력하세요");        
        console.log(pwd);
       
        //history.push(``); //상세페이지 (멤버전용)으로 이동
    };

    const deleteChallenge = () => {
        console.log("챌린지 삭제");
        //dispatch(challengeAction.joinChallengeDB(challengeId));
        history.replace("/");
    };

    //모달 팝업 -----------------------------------------
    const [modalOpen, setModalOpen] = React.useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    
    React.useEffect(() => {
        challengeApis.getOneChallenge(challengeId)
        .then((res)=>{
            const target = res.data;
            dispatch(targetChallenge(target));
            //헤더&푸터 state        
            dispatch(baseAction.setHeader(true,target.title,true));
        }).catch((err)=>{
            console.log("특정 챌린지 조회 오류",err);
        });

        return()=>{
            dispatch(baseAction.setHeader(false,""));
        }
    },[]);

    
    return(
        <>  
        {target&&
            <Grid padding="0" margin="48px 0 64px" bg="#eee">
                <Grid padding="0">
                    {imageList.length > 0?
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            pagination={{
                                type : 'bullets', //페이지네이션 타입 
                                el: '.pagination', //페이지네이션 클래스
                                
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            >
                            {imageList.map((el,i)=>{
                                return(
                                    <SwiperSlide key={i}><Image shape="rectangle" padding="250px" src={el}></Image></SwiperSlide>
                                );
                            })}
                        </Swiper>
                        //이미지 리스트에 이미지가 없다면 디폴트 이미지 노출 (디폴트 이미지 변경예정)
                        : <Image shape="rectangle" padding="250px" src={empty}></Image>
                    }
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
                        <Info>챌린지 기간 <span>{startDate} ~ {endDate}</span></Info>
                        <Info style={{marginTop:"4px"}}>모집 인원 <span>{target.currentMember?target.currentMember:"0"}/{target.maxMember}명</span></Info>
                    </Grid>                    
                    {target.status === "모집중"?admin.userId === userInfo.userId?(
                        //내가 만든 챌린지 (시작 전)
                        <Grid padding="0" is_flex>
                            <Button width="calc(50% - 5px)" margin="30px 0 0" bg="#fff" style={{color:"#666",border:"1px solid #666"}}
                                _onClick={()=>{
                                    deleteChallenge()
                                }}
                            >삭제하기</Button>  
                            <Button width="calc(50% - 5px)" margin="30px 0 0" 
                                _onClick={()=>{
                                    history.push(`/challengewrite/${challengeId}`);
                                }}
                            >수정하기</Button>  
                        </Grid> 
                    ):(
                        //참여가능한 챌린지
                        <Button margin="30px 0 0" 
                            _onClick={()=>{
                                //joinChallenge()
                                openModal()
                            }}
                        >소행성 입주하기</Button>              
                    ): (
                        //내가 참여중인 챌린지 (방장인데 챌린지 시작했을 경우도 포함)
                        <Button margin="30px 0 0" bg="#bbb" color="#fff" style={{cursor:"auto"}} _disabled
                        >이미 입주한 행성입니다.</Button>  
                    )}                    
                </Grid>

                <Grid bg="#fff" padding="20px">
                    <Title>소행성 설명</Title>
                    <ContentBox style={{marginBottom:"20px"}}>
                        <div className="admin_profile">
                            <div  style={{backgroundImage:`url(${admin.profileImage !== null ?admin.profileImage : defaultImg})`}}></div>
                            <p>{admin.nickname}</p>
                        </div>
                        <p>{target.content}</p>
                    </ContentBox>
                    {/* 현재인원 - 디자인 확정 후 작업예정 */}
                    <Title>현재 입주민</Title>
                    <ContentBox  style={{padding:"15px 67px"}}>                       
                        {members&&members.map((el, i) => {
                            return (
                                //만약에 방을 만든 userId와 멤버의 userId가 같은 경우(방장인 경우) className을 붙여준다.
                                <Member 
                                    key={el.userId} 
                                    className={admin.userId === el.userId? "admin" : ""} 
                                    style={{backgroundImage:`url(${el.profileImage !== null ?el.profileImage : defaultImg})`}}
                                    src={el.profileImage}>    
                                </Member>
                            );
                        })}     
                        <MoreMembers className="more_members"></MoreMembers>                   
                    </ContentBox>
                </Grid>            
                
                <Grid padding="0">
                   
                </Grid>
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
                
                <Modal open={modalOpen} close={closeModal} header="Modal heading">
                    팝업창입니다. 쉽게 만들 수 있어요. 같이 만들어봐요!
                </Modal>
            </Grid> 
        }


        </>
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
        height: 20px;
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
    .admin_profile{
        display: flex;
        align-items: center;
        margin-bottom:10px;
        div {
            display: inline-block;
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
                width:17px;
                height: 17px;
                border-radius: 50%;
                background-image: url(${crown});
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
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
    width: 35px;
    height: 35px;
    border: solid 1px #999;
    border-radius:50%;
    background-size: cover;
    background-position: center;
    margin-right: 5px;
    &:nth-child(n+4) {//3번째 멤버 이후로는 미노출
        display: none;
    }
    &.admin { //방장일 경우
        position: relative;
        margin-right: 9px;
        &::after {
            content: '';
            width:17px;
            height: 17px;
            border-radius: 50%;
            background-image: url(${crown});
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            position: absolute;
            bottom:0;
            right: -3px;
        }
    }
`;
const MoreMembers = styled.button`
    display: inline-block;
    width: 35px;
    height: 35px;
    border: solid 1px #999;
    border-radius:50%;
    background-color: #ccc;
    background-size: 20px;
    background-position: center; 
    background-repeat: no-repeat;
    background-image: url(${plus});
`;

export default ChallengeDetail;
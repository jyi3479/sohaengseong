import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import {Grid} from "../elements/index";
import { actionCreators as challengeAction } from "../redux/modules/challenge";

const ChallengeDetail = (props) => {
    const dispatch = useDispatch();
    const challengeId = props.match.params.challengeId;
    const target = useSelector(state => state.challenge.target);
    const  tagList = target.tagName;
    const members = target.members;

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
                <Grid width="200px"> 
                    <img src={target.challengeImage}/>
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
                                <div style={{display:"inline-block"}} key={el.userId}>
                                    <img src={el.profileImage} style={{width:"30px", height:"30px",borderRadius:"50%"}}/>
                                </div>                                
                            );
                        })}
                    </Grid>
                </Grid>
                {target.isPrivate? (                    
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

export default ChallengeDetail;
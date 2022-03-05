import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import {Grid} from "../../elements/index";
import defaultImg from "../../image/img_profile_defalt @2x.png";

const ChatRoomItem = (props) => {
    return(    
        <Grid padding="0" margin="0 0 28px" is_flex style={{alignItems: "flex-start",cursor:"pointer"}}
            _onClick={()=>{
                //뷰 테스트용 임시 주소 - 재설정필요
                history.push(`/chatting/0`);
            }}
        >
            <div style={{width:"calc(100% - 78px)",display: "flex"}}>
                <ProfileBox>
                    {/* 멤버정보 순서대로 노출 시켜줄 것 임의로 만들어둠 */}
                    <div style={{backgroundImage:`url(${defaultImg})`}}></div>
                    <div style={{backgroundImage:`url(${defaultImg})`}}></div>
                </ProfileBox>
                <Info>
                    <div>                        
                        <h3>매주 1시간씩 프렌즈 보면서 영화 어쩌구</h3>
                        <span>23</span>
                    </div>
                    <p>인증 아직 안하신분 없죠~!?!?! 곧 마감이 어쩌구</p>
                </Info>
                </div>
            <span style={{fontSize:"11px",color:"#a8a8a8"}}>오후 12:00</span>
        </Grid>
    );
};

const ProfileBox = styled.div`
    position: relative;
    width: 48px;
    height: 48px;
    margin-right: 8px;
    div {
        position: absolute;
        left:0;
        top:0;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #999;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        &:last-child {
            right: 0;
            bottom: 0;
            left: auto;
            top: auto;
            background-color: #aaa;
        }
    }
`;

const Info = styled.div`
    width: calc(100% - 56px);
    div {
        width: 100%;
        margin-bottom: 4px;        
        h3 {
            display: inline-block;  
            width: calc(100% - 20px); 
            font-size: 14px;     
            margin-right:2px;    
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;//길어지면 말줄임   
        }
        span {
            color:#aaa;
            font-size: 12px;
            vertical-align: top;
        }
    }
    p {
        width: 100%;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;//길어지면 말줄임   
    }
`;

export default ChatRoomItem;
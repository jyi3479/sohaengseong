import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as baseAction from '../redux/modules/base';


import { Grid } from "../elements/index";
import Mark from "../image/icon/ic_notice_mark@2x.png";


const NoticeCard = (props) => {
    const dispatch = useDispatch();

    React.useEffect(()=>{
       
    }); 

    return(
        <>
            <Card className="new" onClick={props.onClick}>
                <img src={Mark}/>
                <div className="text_box">
                    <p>입주하신 소행성이 곧 시작하니 지금 바로 확인하세요!</p>
                    <p className="date small caption_color">18:00</p>
                </div>
            </Card>
            <Card>
                <img src={Mark}/>
                <div className="text_box">
                    <p>현재 진행중인 "<span className="ellipsis">매주 1시간씩 프렌즈...</span>" <span className="more">외 2개</span> 소행성 인증이 아직 안되었네요! 지금 바로 인증해주세요.</p>
                    <p className="date small caption_color">어제</p>
                </div>
            </Card>
        </>
    );
};

const Card = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #eff0f2;
    padding:10px 20px 9px;
    cursor: pointer;
    &.new {
        background-color: rgba(65,73,211,0.1);
    }
    &:last-child {
        border-bottom: none;
    }    
    img {
        width: 48px;
        margin-right: 12px;
    }
    .text_box {
        width: calc(100% - 60px);
        p {
            span.ellipsis {
                display: inline-block;
                width: 130px;
                vertical-align: sub;                
            }
        }
        .date {
            margin-top: 9px;
        }
    }
`;


export default NoticeCard;
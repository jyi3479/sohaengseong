import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

//카카오톡 스크립트 불러오기
import useScript from './useScript';

import closeIcon from "../../image/icons/icon_close_btn@2x.png";
import Line from "../../image/icon/share/btn_share_li@2x.png";
import FB from "../../image/icon/share/btn_share_fb@2x.png";
import Twitter from "../../image/icon/share/btn_share_tw@2x.png";

import { Grid, Button } from "../../elements/index";

//공유하기 라이브러리
import {
  FacebookShareButton,
  TwitterShareButton,
  LineShareButton,
} from "react-share";

//링크복사 기능쓰기 위해서 가져오는 라이브러리
import { CopyToClipboard } from 'react-copy-to-clipboard';
import KakaoShareButton from "./KakaoShareButton";
import { setCopy } from "../../redux/modules/base";

const ShareLink = (props) => {
    const dispatch = useDispatch();

    //카카오톡 공유 주소
    useScript('https://developers.kakao.com/sdk/js/kakao.js');

    //모달 팝업 props
    const { open, close, id } = props;

    //배포 때는  로 주소변경
    const currentUrl = `https://www.sohangsung.co.kr/challenge/${id}`;


    const onCopy = () => {
        console.log("카피했당!");
        dispatch(setCopy(true));
    };

    return (        
        <>
        {/* 모달이 열릴때 openModal 클래스가 생성된다. dim(뒷배경) 클릭 시에도 모달 닫힘*/}
        <div className={open ? 'openModal modal share' : 'modal share'}>
            {open ? (
                <>
                    <div className="dim" onClick={close}></div>
                    <section>
                        <header className='showHeader'> 
                            <h2>콘텐츠 공유하기</h2>
                            <button className="close" onClick={close}>
                                <img src={closeIcon}></img>
                            </button>
                        </header>
                        <Grid padding="22px 20px 40px">
                            <Box>
                                <div className="shares">
                                    <KakaoShareButton id={id}/>
                                    <p className="small">카카오톡</p>
                                </div>
                                <div className="shares">
                                    <FacebookShareButton url={currentUrl}>
                                        <img src={FB} className="shareImg"/>                                                          
                                    </FacebookShareButton>
                                    <p className="small">페이스북</p>      
                                </div>
                                <div className="shares">
                                    <TwitterShareButton url={currentUrl}>
                                        <img src={Twitter} className="shareImg" />
                                    </TwitterShareButton>
                                    <p className="small">트위터</p>  
                                </div>
                                <div className="shares">
                                    <LineShareButton url={currentUrl}>
                                        <img src={Line} className="shareImg"/>
                                    </LineShareButton>     
                                    <p className="small">라인</p>
                                </div>                       
                            </Box>       
                            <CopyToClipboard onCopy={onCopy} text={currentUrl} >
                                <CopyBtn onClick={close}>URL 복사</CopyBtn>
                            </CopyToClipboard>     
                        </Grid>            
                    </section>
                </>
            ) : null}
        </div>   
        </>     
    )
}

const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    .shares {
        text-align: center;
        margin-right: 10px;
        padding:0 5px;
        &:last-child {
            margin-right: 0;
        }
    }
    button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: none !important;
        padding: 0px;
        >img {
            width: 100%;
        }
    }
    .copy_btn {
        background-color: #000;
        margin-right: 0;
    }
`;

const CopyBtn = styled.div`
    width: 100%;
    height: 42px;
    border-radius: 22px;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
    cursor: pointer;
    color: #030102;
    background-color: transparent;
    border: 1px solid #a2aab3;
    text-align: center;
    padding: 10px;
`;

export default ShareLink;
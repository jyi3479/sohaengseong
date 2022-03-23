import React from "react";
import styled from "styled-components";

//카카오톡 스크립트 불러오기
import useScript from './useScript';

//모달
import "../../styles/css/modal.css";


import closeIcon from "../../image/icons/icon_close_btn@2x.png";
import share from "../../image/icons/ic_share@2x.png"

//공유하기 라이브러리
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share";

//링크복사 기능쓰기 위해서 가져오는 라이브러리
import { CopyToClipboard } from 'react-copy-to-clipboard';
import KakaoShareButton from "./KakaoShareButton";

const ShareLink = (props) => {
    //카카오톡 공유 주소
    useScript('https://developers.kakao.com/sdk/js/kakao.js');

    //모달 팝업 props
    const { open, close } = props;    

    //배포 때는 https://www.sohangsung.co.kr/challenge/${challengeId} 로 주소변경
    const currentUrl = window.location.href;


    const onCopy = () => {
        console.log("카피했당!");
    };

    
    return (        
        <>
        {/* 모달이 열릴때 openModal 클래스가 생성된다. dim(뒷배경) 클릭 시에도 모달 닫힘*/}
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <>
                    <div className="dim" onClick={close}></div>
                    <section>
                        <header className='showHeader'> 
                            <button className="close" onClick={close}>
                                <img src={closeIcon}></img>
                            </button>
                        </header>
                        <Box>
                            <KakaoShareButton/>
                            <FacebookShareButton url={currentUrl}>
                                <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
                            </FacebookShareButton>
                            <TwitterShareButton url={currentUrl}>
                                <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
                            </TwitterShareButton>
                            <LineShareButton url={currentUrl}>
                                <LineIcon size={48} round={true} borderRadius={24}></LineIcon>
                            </LineShareButton>
                        
                            <CopyToClipboard onCopy={onCopy} text={currentUrl}>
                                <button className="copy_btn">
                                    <img src={share} width="20"/>
                                </button>
                            </CopyToClipboard>
                        </Box>                        
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
    padding: 40px 20px 20px;

    button {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        padding: 0px;
        margin-right: 10px;
    }
    .copy_btn {
        background-color: #000;
        margin-right: 0;
    }
`;

export default ShareLink;
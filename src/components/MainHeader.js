import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";

import searchIconW from '../image/icon/ic_ search@2x.png';
import searchIconB from "../image/icons/ic_search_b@2x.png";
import noticeIconW from '../image/icon/ic_notice@2x.png'
import noticeIconB from '../image/icon/ic_notice_b@2x.png'
import arrow from "../image/icon/ic_arrow_w@2x.png";
import logo from "../image/logo.png";
import logo2 from "../image/logo2.png";

const MainHeader = (props) => {
    
    //스크롤 위치를 담는 상태값
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    //스크롤 위치를 업데이트 해주는 변수
    const updateScroll = (scrollY) => {
        setScrollPosition(scrollY);
    };
    

    React.useEffect(()=>{       
        let mounted = true; 
        const scrollDiv = document.getElementById("scroll");
        const mainDiv = document.getElementById("main_wrap");

        //스크롤이 일어나면 스크롤 위치를 알아내서 업데이트 해준다.
        scrollDiv.addEventListener("scroll", () => {
            if(mounted){
                let scrollY = Math.abs(mainDiv.getBoundingClientRect().top);
                updateScroll(scrollY);
                setLoading(false);
            }           
        });

        //페이지 벗어나면 스크롤 액션 실행 안되게 하기
        return ()=>{
            mounted = false;
        };
    },[]);



    return(
        <Wrap id="Header"  className={scrollPosition > 50 ? "scroll" : ""} >
            {props.className === "category"? (
                <button onClick={()=>{
                    history.go(-1);
                }}><img src={arrow}></img></button>
            ) : (
                <>
                    <h1><a href="/"></a></h1>
                    <div>
                        <button onClick={()=>{
                            history.push("/notice");
                        }}><img src={scrollPosition > 100 ? noticeIconB : noticeIconW}></img></button>
                        <button onClick={()=>{
                            history.push("/category/all");
                        }}><img src={scrollPosition > 100 ? searchIconB : searchIconW}></img></button>                       
                    </div>
                    
                </>
            )}  
            
        </Wrap>
    );    
};


const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    padding: 11px 20px;
    box-sizing: border-box;
    transition : all 0.1s;
    z-index: 10;
    &.scroll {
        background-color: #fff;
        box-shadow: 0 4px 8px 0 rgba(3, 1, 2, 0.04);
        transition : all 0.1s;
        h1 { 
            a {
                margin-top: -2px;
                margin-left: -3px;
                background-image: url(${logo2});
            }            
        }
    }
    .title {
        display: flex;
        >p {
            font-size: 16px;
            margin: 0px;
            max-width: 230px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;//타이틀 길어지면 말줄임
        }
        span {
            font-size: 12px;
            color: #a3a3a3;
            margin-left: 4px;
        }
    }
    
    >h1 {
        >a {
            display: block;
            width: 69px;
            height: 32px;
            color: white;
            outline: none;
            text-decoration: none;
            background-image: url(${logo});
            background-size: cover;
        }
        font-size: 18px;
        margin: 0;

    }
    button {
        width: 32px;
        height: 32px;
        background-color: transparent;
        border:none;
        padding: 0;
        cursor: pointer;
        img {
            width: 100%;
        }
       &:first-child {
           margin-right: 12px;
       }
    }
`;



export default MainHeader;



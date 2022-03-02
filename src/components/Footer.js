import React from "react";
import styled from "styled-components";
import home from "../image/icons/ic_home@2x.png";
import create from "../image/icons/ic_create@2x.png";
import chat from "../image/icons/ic_chat@2x.png";
import my from "../image/icons/ic_my@2x.png";

const Footer = (props) => {
    return(
        <Wrap>          
            <a>
                <img src={home}></img>
                <p>홈</p>
            </a>
        
            <a>
                <img src={create}></img>
                <p>개설하기</p>
            </a>            
            <a>
                <img src={chat}></img>
                <p>채팅하기</p>
            </a>
        
            <a>
                <img src={my}></img>
                <p>내 정보</p>
            </a>
        </Wrap>
    );
};

const Wrap = styled.div`
    width: 100%;
    height: 64px;
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px 20px;
    box-shadow: 0 -5px 6px 0 rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
   
    display: flex;
    justify-content: space-between;
    a {
        list-style: none;
        display: inline-block;
        text-align: center;
    
            display: inline-block;
            height: 28px;
    
        img {
            width: 28px;
        }
        p {
            color: #000;
            font-size: 11px;
            line-height: 20px;
            margin: 0;
        }
    }
    

`;

export default Footer;




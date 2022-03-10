import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import searchIconW from '../image/icon/ic_ search@2x.png';
import arrow from "../image/icons/ic_arrow_w.png";
import logo from "../image/logo.png";

const MainHeader = (props) => {
    return(        
        <Wrap id="Header" className={props.className}>
            {props.className === "category"? (
                <button onClick={()=>{
                    history.go(-1);
                }}><img src={arrow}></img></button>
            ) : (
                <>
                    <h1><a href="/"></a></h1>
                    <button onClick={()=>{
                        history.push("/search");
                    }}><img src={searchIconW}></img></button>
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
    z-index: 10;
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
        width: 28px;
        height: 28px;
        background-color: transparent;
        border:none;
        padding: 0;
        cursor: pointer;
        img {
            width: 100%;
        }
       
    }
`;



export default MainHeader;



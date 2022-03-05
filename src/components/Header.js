import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import arrow from "../image/icons/ic_arrow@2x.png";
import searchIconW from '../image/icons/ic_search.png';
import searchIconB from '../image/icons/ic_search_b@2x.png';

const Header = (props) => {
    const text = useSelector(state => state.base.header.text);
    const detail = useSelector(state => state.base.header.detail);
    const searchBtn = useSelector(state => state.base.header.search_btn);
    const params = window.location.pathname;

    console.log(params);

    if(detail){
        return(
            <Wrap id="Header" {...props} className="detailHeader">
                <button onClick={()=>{
                    history.go(-1);
                }}><img src={arrow}/></button>
                <div className="title">
                    <p>{text}</p>
                    {params.includes("/chatting/")?<span>23</span>:null}                 
                </div>                
                <button className={"search_btn" + (searchBtn? "" : " hide")} onClick={()=>{
                    history.push("/search");
                }}><img src={searchIconB}/></button>
                <div style={{width:"28px",height:"28px", display:searchBtn?"none":"block"}}></div>
            </Wrap>
        );
    }else {
        return(        
            <Wrap id="Header" {...props}>
                <h1><a href="/">소행성</a></h1>
                <button onClick={()=>{
                    history.push("/search");
                }}><img src={searchIconW}></img></button>
            </Wrap>
        );        
    }
    
};

Header.defaultProps ={
    detail:true,
    search:false,
    search_btn:false,
    text:"",
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
            color: white;
            outline: none;
            text-decoration: none;
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
    &.detailHeader {
        display: flex;
        text-align: center;
        background-color: white;
        border-bottom: solid 1px #e2e2e2;  
        justify-content: space-between;   
        align-items: center;   
        >button {
            width: 32px;
            height: 32px;
            background-color: transparent;
            border:none;
            padding: 0;
            font-size: 25px;
          &.search_btn {
            width: 28px;
            height: 28px;
            >img {
                width: 100%;
            }
            &.hide {
              display: none;
            }
          }       
        }
    }
`;



export default Header;



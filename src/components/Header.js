import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowLeft } from 'react-icons/fi';
import searchIcon from '../image/icons/ic_search.png';

const Header = (props) => {
    const text = useSelector(state => state.base.header.text);
    const detail = useSelector(state => state.base.header.detail);

    if(detail){
        return(
            <Wrap id="Header" {...props} className="detailHeader">
                <button onClick={()=>{
                    history.push(-1);
                }}><FiArrowLeft/></button>
                <p>{text}</p>
            </Wrap>
        );
    }
    return(        
        <Wrap id="Header" {...props}>
            <h1><a href="/">소행성</a></h1>
            <button onClick={()=>{
                history.push("/search");
            }}><img src={searchIcon}></img></button>
        </Wrap>
    );
};

Header.defaultProps ={
    detail:false,
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
    >p {
        font-size: 16px;
        margin: 0px;
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
    >button {
        background-color: transparent;
        border:none;
        padding: 0;
        cursor: pointer;
        >img {
            width: 28px;
        }
    }
    &.detailHeader {
        display: block;
        text-align: center;
        background-color: white;
        border-bottom: solid 1px #e2e2e2;
        >button {
            position: absolute;
            left: 20px;
            background-color: transparent;
            border:none;
            padding: 0;
            font-size: 25px;
        }
    }
`;


export default Header;



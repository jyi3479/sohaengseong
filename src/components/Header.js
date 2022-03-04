import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import arrow from "../image/icons/ic_arrow@2x.png";
import searchIcon from '../image/icons/ic_search.png';

const Header = (props) => {
    const text = useSelector(state => state.base.header.text);
    const detail = useSelector(state => state.base.header.detail);
    const search = useSelector(state => state.base.header.search);


    //console.log(text,detail,search);
    // if(search){
    //     return(
    //         <Wrap id="Header" {...props} className="detailHeader">
    //             <button onClick={()=>{
    //                 history.go(-1);
    //             }}><img src={arrow}/></button>
    //             <div>

    //             </div>
    //         </Wrap>
    //     );
    // }
    if(detail){
        return(
            <Wrap id="Header" {...props} className="detailHeader">
                <button onClick={()=>{
                    history.go(-1);
                }}><img src={arrow}/></button>
                <p>{text}</p>
                <button className={"search_btn" + (search? "" : " hide")} onClick={()=>{
                    history.push("/search");
                }}><img src={arrow}/></button>
                <div style={{width:"28px",height:"28px", display:search?"none":"block"}}></div>
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
        width: 243px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;//타이틀 길어지면 말줄임
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
            >img{
              width: 100%;
            }     
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



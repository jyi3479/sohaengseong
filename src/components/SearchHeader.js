import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import arrow from "../image/icon/ic_arrow@2x.png";
import deleteIcon from '../image/icon/ic_text_delete@2x.png';
import searchIcon from '../image/icons/ic_search_b@2x.png';

const SearchHeader = ({_onChange,_deleteBtn,_onClick,value,ref}) => {

    return(
        <Wrap id="Header" className="searchHeader">
            <button onClick={()=>{
                history.go(-1);
            }}><img src={arrow}/></button>
            <div>
                <input type="text" onChange={_onChange} ref={ref} value={value} placeholder="습관 검색"></input>
                <button type="button" className="delete" onClick={_deleteBtn}><img src={deleteIcon}></img></button>
                <button type="button" className="search_btn" onClick={_onClick} ><img src={searchIcon}></img></button>
            </div>
        </Wrap>
    );
   
    
};

SearchHeader.defaultProps ={
    _onClick: () => {},
    _onChange: () => {},
    value:"",
};

const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    padding: 8px 16px;
    box-sizing: border-box;  
    z-index: 10;    
    >button {
        width: 32px;
        height: 32px;
        background-color: transparent;
        border:none;
        padding: 0;
        cursor: pointer;
        img {
            width: 100%;
        }
       
    }    
    >div {
        position: relative;
        width: 295px;
        input {
            width: 100%;
            height: 100%;
            padding: 5px 50px 5px 5px;
            border: none;
            outline: none;
            font-size: 18px;
            font-weight: bold;
            &::placeholder {
                font-weight: normal;
                color:rgba(124, 130, 136, 0.5);
            }
        }
        button {   
            width: 28px;
            height: 28px;             
            box-sizing: border-box;
            text-align: center;
            border: none;
            background: transparent;
            position: absolute;
            right: 0;
            top: 2px;
            img {
                width: 100%;
            }
            &.delete {
                width: 20px;
                height: 20px;
                right: 44px;
                top: 5px;
            }
        }
    }
    
`;



export default SearchHeader;



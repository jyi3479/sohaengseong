import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import arrow from "../image/icons/ic_arrow@2x.png";
import deleteIcon from '../image/icons/ic_search_delete@2x.png';
import searchIconB from '../image/icons/ic_search_b@2x.png';

const SearchHeader = ({_onChange,_deleteBtn,_onClick,value,ref}) => {

    return(
        <Wrap id="Header" className="searchHeader">
            <button onClick={()=>{
                history.go(-1);
            }}><img src={arrow}/></button>
            <div>
                <input type="text" onChange={_onChange} ref={ref} value={value}></input>
                <button type="button" className="delete" onClick={_deleteBtn}><img src={deleteIcon}></img></button>
                <button type="button" className="search_btn" onClick={_onClick} ><img src={searchIconB}></img></button>
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
    padding: 15px 24px 15px 12px;
    box-sizing: border-box;  
    z-index: 10;    
    border-bottom: 1px solid #ddd;
    >button {
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
    >div {
        position: relative;
        width: 295px;
        height: 40px;
        input {
            width: 100%;
            height: 100%;
            padding: 10px;
            border: solid 1px #ddd;
            outline: none;
        }
        button {   
            width: 28px;
            height: 28px;             
            box-sizing: border-box;
            text-align: center;
            border: none;
            background: transparent;
            position: absolute;
            right: 10px;
            top: 6px;
            img {
                width: 100%;
            }
            &.delete {
                width: 17px;
                height: 17px;
                right: 41px;
                top: 11px;
            }
        }
    }
    
`;



export default SearchHeader;



import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";

import arrow from "../image/icon/ic_arrow@2x.png";
import searchIconB from "../image/icons/ic_search_b@2x.png";
import noticeIconB from '../image/icon/ic_notice_b@2x.png'

const Header = (props) => {
  const text = useSelector((state) => state.base.header.text);
  const search = useSelector((state) => state.base.header.search_btn);
  const notice = useSelector((state) => state.base.header.notice);
  const currentMember = useSelector((state) => state.base.header.currentMember);
  const params = window.location.pathname;

  return (
    <Wrap
      id="Header"
      {...props}
    >
      {params === "/mypage" ? (
        <>
          <div className="title">
            <h2>{text}</h2>
          </div>
          <div className="btns">
            <button 
              style={{ display: notice ? "block" : "none" }}
              onClick={()=>{
                history.push("/notice");
              }}
            ><img src={noticeIconB}></img></button>
            <button
              className="search_btn"
              style={{ display: search ? "block" : "none" }}
              onClick={() => {
                history.push("/category/all");
              }}
            ><img src={searchIconB} /></button>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              history.goBack();
            }}
          >
            <img src={arrow} />
          </button>
          <div className="title">
            <h2>{text}</h2>
            {params.includes("/chatting/") ? (
              <span>{currentMember}</span>
            ) : null}
          </div>
          <div className="btns">
            <button 
              style={{ display: notice ? "block" : "none" }}
              onClick={()=>{
                history.push("/notice");
              }}
            ><img src={noticeIconB}></img></button>
            <button
              className="search_btn"
              style={{ display: search ? "block" : "none" }}
              onClick={() => {
                history.push("/category/all");
              }}
            ><img src={searchIconB} /></button>
          </div>
          
        </>
      )}
    </Wrap>
  );
};

Header.defaultProps = {
  text: "",
  currentMember: false,
};

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  padding: 8px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #e4e5e6;
  z-index: 101;
  .title {
    display: flex;
    align-items: center;
    > h2 {
      max-width: 160px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; //타이틀 길어지면 말줄임
    }
    span {
      font-size: 12px;
      color: #a3a3a3;
      margin-left: 4px;
    }
  }
  .btns {
    display: flex;
    position: absolute;
    right: 16px;
    button {
      &:last-child { margin-left:12px; }
    }
  }
  >button {
    position: absolute;
    left: 16px;
  }
  button {
    width: 32px;
    height: 32px;
    background-color: transparent;
    border: none;
    padding: 0;
    font-size: 25px;
    > img {
      width: 100%;
    }    
  }  
`;

export default Header;

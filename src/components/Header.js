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
  const currentMember = useSelector((state) => state.base.header.currentMember);
  const params = window.location.pathname;

  return (
    <Wrap
      id="Header"
      {...props}
      className={"detailHeader " + (params.includes("/post/") ? "left" : "")}
      style={{ justifyContent: params === "/mypage" ? "center" : "" }}
    >
      {params === "/mypage" ? (
        <>
          <div className="title">
            <h2>{text}</h2>
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
          <button onClick={()=>{
              history.push("/category/all");
          }}><img src={noticeIconB}></img></button>
          <button
            className="search_btn"
            style={{ display: search ? "block" : "none" }}
            onClick={() => {
              history.push("/category/all");
            }}
          >
            <img src={searchIconB} />
          </button>
          
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  padding: 11px 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #e4e5e6;
  z-index: 10;
  .title {
    display: flex;
    align-items: center;
    > h2 {
      max-width: 230px;
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

  > h1 {
    > a {
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
    border: none;
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
    justify-content: space-between;
    align-items: center;
    &.left {
      justify-content: flex-start;
      .title {
        margin-left: 24px;
      }
    }
    > button {
      width: 32px;
      height: 32px;
      background-color: transparent;
      border: none;
      padding: 0;
      font-size: 25px;
      &.search_btn {
        width: 28px;
        height: 28px;
        > img {
          width: 100%;
        }
      }
    }
  }
`;

export default Header;

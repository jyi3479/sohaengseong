import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import home from "../image/icon/navi/ic_home@2x.png";
import active_home from "../image/icon/navi/ic_home_sel@2x.png";
import create from "../image/icon/navi/ic_add@2x.png";
import active_create from "../image/icon/navi/ic_add_sel@2x.png";
import chat from "../image/icon/navi/ic_chat@2x.png";
import active_chat from "../image/icon/navi/ic_chat_sel@2x.png";
import my from "../image/icon/navi/ic_profile@2x.png";
import active_my from "../image/icon/navi/ic_profile_sel@2x.png";


const Footer = (props) => {
  const hide = useSelector((state) => state.base.gnb);
  const params = window.location.pathname;

  if(!hide){
      return null;
  }
  return(
      <Wrap>
          <a href="/">
              <img src={params === "/"? active_home : home}></img>
          </a>        
          <a href="/challengewrite">
              <img src={params === "/challengewrite" ? active_create :create}></img>
          </a>            
          <a href="/chatting">
              <img src={params.includes("/chatting") ? active_chat : chat}></img>
          </a>
      
          <a href="/mypage">
              <img src={params.includes("/mypage")? active_my : my}></img>
          </a>
      
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 56px;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 4px 22px;
  box-shadow: 0 -4px 8px 0 rgba(3, 1, 2, 0.04);
  box-sizing: border-box;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  a {
    display: inline-block;
    text-decoration: none;
    text-align: center;
    img {
      width: 48px;
    }
  }
`;

export default Footer;

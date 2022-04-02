import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { useSelector } from "react-redux";

import home from "../../image/icon/navi/ic_home@2x.png";
import active_home from "../../image/icon/navi/ic_home_sel@2x.png";
import create from "../../image/icon/navi/ic_add@2x.png";
import active_create from "../../image/icon/navi/ic_add_sel@2x.png";
import chat from "../../image/icon/navi/ic_chat@2x.png";
import active_chat from "../../image/icon/navi/ic_chat_sel@2x.png";
import my from "../../image/icon/navi/ic_profile@2x.png";
import active_my from "../../image/icon/navi/ic_profile_sel@2x.png";
import LoginModal from "./LoginModal";

const Footer = (props) => {
  const hide = useSelector((state) => state.base.gnb);
  const is_login = useSelector((state) => state.user.user);

  const router = useSelector((state) => state.router.location.pathname);
  const [params, setParams] = React.useState(window.location.pathname);
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const gnbClick = (e, gnbname) => {
    if (is_login === null && gnbname !== "home") {
      setModalOpen(true);
    } else {
      if (gnbname === "home") {
        history.push("/");
      } else if (gnbname === "write") {
        history.push("/challengewrite");
      } else if (gnbname === "chat") {
        history.push("/chatting");
      } else if (gnbname === "my") {
        history.push("/mypage");
      }
    }
  };

  React.useEffect(() => {
    setParams(router);
  }, [router]);

  if (!hide) {
    return null;
  }
  return (
    <>
      <Wrap>
        <div
          onClick={(e) => {
            gnbClick(e, "home");
          }}
        >
          <img src={params === "/" ? active_home : home}></img>
        </div>
        <div
          onClick={(e) => {
            gnbClick(e, "write");
          }}
        >
          <img
            src={params === "/challengewrite" ? active_create : create}
          ></img>
        </div>
        <div
          onClick={(e) => {
            gnbClick(e, "chat");
          }}
        >
          <img src={params === "/chatting" ? active_chat : chat}></img>
        </div>
        <div
          onClick={(e) => {
            gnbClick(e, "my");
          }}
        >
          <img src={params === "/mypage" ? active_my : my}></img>
        </div>
      </Wrap>
      <LoginModal
        open={modalOpen}
        close={closeModal}
        btnClick={() => {
          history.push("/login");
        }}
      ></LoginModal>
    </>
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
  div {
    display: inline-block;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    img {
      width: 48px;
    }
  }
`;

export default Footer;

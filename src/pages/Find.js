import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router";
import {ActionCreators as userActions} from "../redux/modules/user";
import { userApis } from "../shared/apis";
import * as baseAction from '../redux/modules/base';
import {Grid,Button} from "../elements/index";
import drop from "../image/icons/ic_dropdown@2x.png";
import deleteIcon from "../image/icon/ic_txt_delete@2x.png";
import PopModal from "../components/PopModal";



const Find = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [active,setActive] = React.useState(false);    
    const [email,setEmail] = React.useState("");
    const [option,setOption] = React.useState("");
    const [domain, setDomain] = React.useState("");

    const [modalOpen, setModalOpen] = React.useState(false);


    const closeModal = () => {
        setModalOpen(false);
    };

    const deleteValue = () => {
        setDomain("");
    };

    const send = () => {
        const mail = `${email}@${domain}`;
        dispatch(userActions.emailCheckResend(mail));
    };

    // 드롭박스 - 라벨을 클릭시 옵션 목록이 열림/닫힘
    const selectClick = () => {
        setActive(!active);
        setOption("");
    };

    const optionClick = (e) => {
        setOption(e.target.innerText);
        setActive(false);    
        if (option !== "직접 입력") {
            setDomain(e.target.innerText);
        }
    };

    const findPwd = () => {
        const mail = `${email}@${domain}`;

        const send_email = {
         email: mail
        };

        userApis
        .tempPasswordSend(send_email)
        .then((res) => {
            console.log("비밀번호발급", res);
            if(res.data.result === "true"){ //비밀번호 발급 잘 됐을 때 팝업띄움
                setModalOpen(true);
            };
        })
        .catch((err) => {
            console.log("비밀번호 재발급오류", err);
            window.alert(err.response.data.message);
        });
    };


    React.useEffect(() => {
        dispatch(baseAction.setHeader("비밀번호 찾기"));
        dispatch(baseAction.setGnb(false));
        return()=>{
            dispatch(baseAction.setHeader(""));
            dispatch(baseAction.setGnb(true));
        }
    }, []);

    
    return(
        <>
        <Grid padding="48px 20px" margin="48px 0 0" bg="#fff" style={{overflow: "revert"}}>
            <Content>
                <h1>가입 시 등록한<br/>이메일을 입력해주세요.</h1>
                <p className="sub_color mt12">입력하신 <span className="sub_point_color">이메일로 임시 비밀번호</span>가 발송됩니다.</p>
            </Content>
            <Grid padding="0" style={{ overflow: "revert" }}>
                <label className="small">아이디(이메일)</label>
                <Grid
                padding="0"
                is_flex
                style={{ overflow: "revert" }}
                >
                    <EmailInput
                        onChange={(e) => {
                        setEmail(e.target.value);
                        }}
                        style={{opacity: option ? "1" : "0.5" }}
                        placeholder="이메일 주소"
                    ></EmailInput>
                    <p>@</p>
                    <Select className={active ? "active" : option ? "ok" : ""}>
                        <img src={drop}></img>
                        <button
                        className="label"
                        onClick={() => {
                            selectClick();
                        }}
                        >
                        {option ? option : "선택하세요"}
                        </button>
                        <ul className="optionList" id={active ? "active" : ""}>
                            <li
                                className="optionItem"
                                onClick={(e) => {
                                optionClick(e);
                                }}
                            >
                                naver.com
                            </li>
                            <li
                                className="optionItem"
                                onClick={(e) => {
                                optionClick(e);
                                }}
                            >
                                nate.com
                            </li>
                            <li
                                className="optionItem"
                                onClick={(e) => {
                                optionClick(e);
                                }}
                            >
                                daum.net
                            </li>
                            <li
                                className="optionItem"
                                onClick={(e) => {
                                optionClick(e);
                                }}
                            >
                                hanmail.net
                            </li>
                            <li
                                className="optionItem"
                                onClick={(e) => {
                                optionClick(e);
                                }}
                            >
                                gmail.com
                            </li>
                            <li
                                className="optionItem"
                                onClick={(e) => {
                                optionClick(e);
                                }}
                            >
                                직접 입력
                            </li>
                        </ul>
                    </Select>
                </Grid>
                <SelfInput style={{display: option === "직접 입력" ? "block" : "none"}}>
                    <EmailInput
                        className="width"
                        onChange={(e) => {
                            setDomain(e.target.value);
                        }}
                        disabled={option === "직접 입력" ? "" : "disabled"}
                        value={option !== "직접 입력" ? option : domain}
                        
                    ></EmailInput>
                    <button onClick={deleteValue}></button>
                </SelfInput>        
            </Grid>
        </Grid>
        <Fixed>                
            <Button _onClick={()=>{
                findPwd()                
            }} disabled={email==="" || domain ==="" ? "disabled":""}>계속하기</Button>
        </Fixed>               
        {/* 이메일 전송 팝업 */}
        <PopModal open={modalOpen} close={closeModal} h2="메일함을 확인해주세요!" p={`메일로 임시 비밀번호를 보냈어요.
로그인 후 비밀번호를 변경하시길 바랍니다.`} mail={`${email}@${domain}`} btn_click={send}>
        </PopModal>
    </>
    );
};

const Content = styled.div`
    margin-bottom:64px;    
`;

const EmailInput = styled.input`
  width: calc(50% - 10px);
  height: 28px;
  outline: none;
  padding: 8px 0;
  box-sizing: border-box;
  line-height: 1.29;
  border:none;
  border-bottom: 1px solid #7c8288;
  background-color: transparent;
  opacity: 0.5;
  &.width {
    width: 100%;
    margin-top: 12px;
  }
  &:focus {
    outline: none;
    opacity: 1;
    border-bottom: 1px solid #4149d3;
  }
  ::placeholder {
    font-size: 14px;
    color: #7c8288;
    line-height: 1.29;
  }
`;

const Select = styled.div`
  position: relative;
  width: calc(50% - 10px);
  height: 28px;
  border:none;
  border-bottom: 1px solid rgba(124, 130, 136, 0.5);
  outline: none;
  
  img {
    position: absolute;
    top: 5px;
    right: 0;
    width: 16px;
  }
  &.active {
    outline: none;
    border-bottom: 1px solid #4149d3;    
    .label{
      color:rgba(124, 130, 136, 1);
    }
    img {
      transform: rotate(180deg);
    }
  }
  &.ok {
    border-bottom: 1px solid #7c8288;
    .label{
      color: #030102;
    }
  }
  .label {
    display: flex;
    align-items: center;
    width: 100%;
    height: inherit;
    border: 0 none;
    outline: 0 none;
    padding-left: 10px;
    background: transparent;
    font-size: 14px;
    color:rgba(124, 130, 136, 0.5);
    cursor: pointer;
  }
  .optionList {
    transform: scaleY(0);
    transform-origin: 0px 0px;
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    height: 204px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(3, 1, 2, 0.08);
    border-radius: 4px;
    overflow: hidden;
    transition: 0.2s ease-in;
    opacity: 0;
    padding: 6px 0;
    z-index: 2;
    > li {
      font-size: 12px;
      padding: 9px 10px;
      color: #030102;
      line-height: 14px;
      cursor: pointer;
      :hover {
        background-color: rgba(162,170,179,0.2);
      }
    }
    &#active {
      transform: scaleY(1);
      opacity: 1;
    }
  }
`;

const SelfInput = styled.div`
  position: relative;
  >button {
    position: absolute;
    width: 20px;
    height: 20px;
    background-image: url(${deleteIcon});
    background-size: contain;
    right: 0;
    top: 10px;
    border: none;
    background-color: transparent;
  }
`;

const Fixed = styled.div`
    width: 100%;
    position: fixed;
    background-color: #fff;
    bottom:0;
    left:0;
    padding:12px 20px;
    box-shadow: 0 -4px 8px 0 rgba(3, 1, 2, 0.04);
`;


export default Find;
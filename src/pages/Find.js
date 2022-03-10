import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router";
import {ActionCreators as userActions} from "../redux/modules/user";
import * as baseAction from '../redux/modules/base';
import {Grid,Button} from "../elements/index";
import drop from "../image/icons/ic_dropdown@2x.png";
import Modal from "../components/Modal";

const Find = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [active,setActive] = React.useState(false);    
    const [email,setEmail] = React.useState("");
    const [option,setOption] = React.useState("");
    const [domain, setDomain] = React.useState("");

    const mailCk = useSelector(state => state.user.sendMail);
    const [modalOpen, setModalOpen] = React.useState(true);

    const closeModal = () => {
        setModalOpen(false);
    };

    const send = () => {
        const mail = `${email}@${domain}`;
        dispatch(userActions.emailCheckResend(mail));
    };
    
 
    // 라벨을 클릭시 옵션 목록이 열림/닫힘
    const selectClick = () => {        
        setActive(!active);
        console.log("눌림",active);
    };
    const optionClick = (e) => {
        setOption(e.target.innerText);
        setActive(false);
        if(option!=="직접 입력"){
            setDomain(e.target.innerText);
        }        
    };

    const findPwd = () => {
        const mail = `${email}@${domain}`;
        dispatch(userActions.tempPasswordSend(mail));

        if(mailCk === "true"){
            setModalOpen(true);
        }
    }


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
        <Grid padding="0 40px" margin="120px 0 0" height="70vh">
            <Content>
                <h1>가입 시 등록한<br/>이메일을 입력해주세요.</h1>
                <p>입력하신 이메일로 임시 비밀번호가 발송됩니다.</p>
            </Content>
            <Grid padding="0" style={{overflow: "revert"}}>
                <label style={{fontSize:"14px"}}>이메일</label>
                <Grid padding="0" margin="9px 0 5px" is_flex style={{overflow: "revert"}}>
                    <EmailInput  
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}></EmailInput>
                    <p style={{fontSize:"14px"}}>@</p>
                    <Select>
                        <button className="label" onClick={()=>{selectClick()}}>{option?option:"선택하세요"}</button>
                        <ul className="optionList" id={active?"active":""}>
                            <li className="optionItem" onClick={(e)=>{optionClick(e)}}>naver.com</li>
                            <li className="optionItem" onClick={(e)=>{optionClick(e)}}>nate.com</li>
                            <li className="optionItem" onClick={(e)=>{optionClick(e)}}>daum.net</li>
                            <li className="optionItem" onClick={(e)=>{optionClick(e)}}>hanmail.net</li>
                            <li className="optionItem" onClick={(e)=>{optionClick(e)}}>gmail.com</li>
                            <li className="optionItem" onClick={(e)=>{optionClick(e)}}>직접 입력</li>
                        </ul>
                    </Select>
                </Grid>
                <EmailInput 
                    className="width"
                    onChange={(e) => {
                        setDomain(e.target.value);
                    }}
                    disabled={option==="직접 입력"?"":"disabled"} value={option==="직접 입력"?domain:option}
                ></EmailInput>
                <Fixed>                
                    <Button _onClick={()=>{
                        findPwd()                   
                    }} disabled={email==="" || domain ==="" ? "disabled":""}>계속하기</Button>
                </Fixed>
            </Grid>            
        </Grid>

        {/* 이메일 전송 팝업 */}
        <Modal full_modal header open={modalOpen} close={closeModal}>
            <div style={{width:"180px", height:"180px", backgroundColor:"#ccc" , margin:"0 auto"}}></div>
            <Content className="popup">
                <h1>메일함을 확인해주세요!</h1>
                <p>메일로 임시 비밀번호를 보냈어요.<br/>로그인 후 비밀번호를 변경하시길 바랍니다.</p>
            </Content>
            <div style={{backgroundColor:"#f9f9f9", borderRadius:"10px", padding:"11px", marginBottom:"24px", textAlign:"center"}}>
                <p style={{fontSize:"14px"}}>{email}@{domain}</p>
            </div>
            <Grid padding="0" margin="0 0 56px" style={{textAlign:"center"}}>
                <p style={{fontSize:"14px", color:"#666"}}>메일을 받지 못하셨나요?</p>
                <Button width="250px" margin="10px 0 5px" radius="20px" bg={active?"#fff":"#666"} font_size="16px" style={{color:active?"#666":"#fff",border:"solid 1px #707070"}}
                _onClick={()=>{
                    send()
                }}>이메일 재발송</Button>
                <p style={{display:active?"block":"none",fontSize:"10px", color:"#999"}}>인증 시간 01 : 00 : 00</p>
            </Grid>
            <Fixed>
                <Button _onClick={()=>{history.push("/login")}}>로그인 하기</Button>
            </Fixed>
        </Modal>
    </>
    );
};

const Content = styled.div`
    margin-bottom:30px;
    h1 {
        font-size: 18px;
        margin-bottom: 10px;
        font-weight: 400;
    }
    p {
        font-size: 14px;
        line-height: 1.36;
        letter-spacing: -0.2px;
    }
    &.popup {
        h1 {
            font-size: 20px;
            margin: 24px 0 39px;
            line-height: 1.45;
            font-weight: 400;
        }
        p {
            width: max-content;
            margin: 0 auto;
            font-size: 14px;
            text-align: left;
        }
    }
    
`;

const EmailInput = styled.input`
    width: calc(50% - 10px);
    height: 40px;
    border: solid 1px #999;
    outline: none;
    padding: 10px;
    &.width{
        width: 100%;
    }
`;

const Select = styled.div`
    position: relative;
    width: calc(50% - 10px);
    height: 40px;
    border: solid 1px #999;
    outline: none;
    background-image:url(${drop});
    background-size: 20px;
    background-position: right 10px top 10px;
    background-repeat: no-repeat;
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
        cursor: pointer;
    }
    .optionList {
        transform: scaleY(0);
        transform-origin: 0px 0px;
        position: absolute; 
        top: 40px;
        left: 0;
        width: 100%;
        height: 157px;
        background: #fff;
        color: #fff;
        overflow: hidden;
        transition:.2s ease-in;
        opacity: 0;
        padding: 10px;
        border: solid 1px #999;
        >li {
            font-size: 12px;
            color:#000;
            line-height: 1.5;
            margin-bottom: 2px;
            cursor: pointer;
        }
     &#active {
        transform: scaleY(1); 
        opacity: 1;
     }
    }

`;

const Fixed = styled.div`
    width: 100%;
    position: fixed;
    background-color: #fff;
    bottom:0;
    left:0;
    padding:12px 20px;
    box-shadow: 0 -5px 6px 0 rgba(0, 0, 0, 0.04);
    button {
        border-radius: 5px;
    }
`;



export default Find;
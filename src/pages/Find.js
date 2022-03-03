import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router";
import {ActionCreators as userAction} from "../redux/modules/user";
import * as baseAction from '../redux/modules/base';
import {Grid,Button} from "../elements/index";
import drop from "../image/icons/ic_dropdown@2x.png";
const Find = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [active,setActive] = React.useState(false);    
    const [email,setEmail] = React.useState("");
    const [option,setOption] = React.useState("");
    const [domain, setDomain] = React.useState("");
    
 
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
        dispatch(userAction.tempPasswordSend(mail));
    }


    React.useEffect(() => {
        dispatch(baseAction.setHeader(true,"비밀번호 찾기"));
        dispatch(baseAction.setGnb(false));
        return()=>{
            dispatch(baseAction.setHeader(false,""));
            dispatch(baseAction.setGnb(true));
        }
    }, []);

    
    return(
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
                <Button margin="50px 0 0" _onClick={()=>{
                    findPwd()
                    history.push({                                
                        pathname: "/sendmail",
                        state: {domain: domain},                                  
                    })
                   
                }} domain={domain}>이메일 인증하기</Button>
            </Grid>
            
        </Grid>
    );
};

const Content = styled.div`
    margin-bottom:30px;
    h1 {
        font-size: 20px;
        margin-bottom: 10px;
        line-height: 1.45;
    }
    p {
        font-size: 14px;
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



export default Find;
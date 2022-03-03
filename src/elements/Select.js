import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import {Grid,Button} from "../elements/index";

const Select = (props) => {
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
            console.log("직");
            setDomain(e.target.innerText);
        }        
    };    
    return(
        <>
            <Grid padding="0" margin="9px 0 5px" is_flex style={{overflow: "revert"}}>
                <EmailInput  
                onChange={(e) => {
                    setEmail(e.target.value);
                }}></EmailInput>
                <p style={{fontSize:"14px"}}>@</p>
                <SelectItem>
                    <button className="label" onClick={()=>{selectClick()}}>{option?option:"선택하세요"}</button>
                    <ul className="optionList" style={{display:active?"block":"none"}}>
                        <li className="optionItem" onClick={(e)=>{optionClick(e)}}>naver.com</li>
                        <li className="optionItem" onClick={(e)=>{optionClick(e)}}>nate.com</li>
                        <li className="optionItem" onClick={(e)=>{optionClick(e)}}>daum.net</li>
                        <li className="optionItem" onClick={(e)=>{optionClick(e)}}>hanmail.net</li>
                        <li className="optionItem" onClick={(e)=>{optionClick(e)}}>gmail.com</li>
                        <li className="optionItem" onClick={(e)=>{optionClick(e)}}>직접 입력</li>
                    </ul>
                </SelectItem>            
            </Grid>
            <EmailInput 
                className="width"
                onChange={(e) => {
                    setDomain(e.target.value);
                }}
                disabled={option==="직접 입력"?"":"disabled"} value={option==="직접 입력"?domain:option}
            ></EmailInput>
        </>
    );
};

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

const SelectItem = styled.div`
    position: relative;
    width: calc(50% - 10px);
    height: 40px;
    border: solid 1px #999;
    outline: none;
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
        position: absolute; 
        top: 40px;
        left: 0;
        width: 100%;
        height: 157px;
        background: #fff;
        color: #fff;
        overflow: hidden;
        transition: .3s ease-in;
        padding: 10px;
        border: solid 1px #999;
        >li {
            font-size: 12px;
            color:#000;
            line-height: 1.5;
            margin-bottom: 2px;
            cursor: pointer;
        }
    }

`;

export default Select;
import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import {useLocation} from "react-router";
import {ActionCreators as userAction} from "../redux/modules/user";
import {Grid,Button} from "../elements/index";

const Complete = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    //const mail = location.state.mail;   
    //console.log("회원가입완료",mail);

    const [active,setActive] = React.useState(false);
    const send = () => {
        setActive(true);  
        //dispatch(userAction.emailCheckResend(mail));    
    };

    
    return(
        <Grid padding="0 20px" margin="100px 0 0" height="auto">
            <div style={{width:"180px", height:"180px", backgroundColor:"#ccc" , margin:"0 auto"}}></div>
            <Content>
                <h1>소행성 가입을 환영합니다!</h1>
                <p>메일을 전송하였습니다.<br/>아래의 메일에서 전송된 링크를<br/>클릭하면 회원가입이 완료됩니다.</p>
            </Content>
            <div style={{backgroundColor:"#f9f9f9", borderRadius:"10px", padding:"11px", marginBottom:"24px", textAlign:"center"}}>
                <p style={{fontSize:"14px"}}>abc@gmail.com</p>
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
        </Grid>
    );
};

const Content = styled.div`
    text-align: center;
    margin:40px 0 8px;
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
        font-weight: 400;
    }
`;


export default Complete;
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
    const mail = location.state.mail;   
    console.log("회원가입완료",mail);

    const [active,setActive] = React.useState(false);
    const send = () => {
        setActive(true);  
        dispatch(userAction.emailCheckResend(mail));    
    };

    
    return(
        <Grid padding="0 64px" margin="100px 0 0" height="auto">
            <div style={{width:"180px", height:"180px", backgroundColor:"#ccc" , margin:"0 auto"}}></div>
            <Content>
                <h1>이메일 인증을 해주세요.</h1>
                <p>가입하신 이메일로 확인 메일을 보냈어요.<br/>이메일 인증을 하셔야 로그인이 가능합니다.</p>
            </Content>
            <Grid padding="0" margin="0 0 56px" style={{textAlign:"center"}}>
                <p style={{fontSize:"14px", color:"#666"}}>인증 메일이 오지 않으셨나요?</p>
                <Button margin="10px 0 5px" radius="20px" bg={active?"#fff":"#666"} font_size="16px" style={{color:active?"#666":"#fff",border:"solid 1px #707070"}}
                _onClick={()=>{
                    send()
                }}>이메일 재발송</Button>
                <p style={{display:active?"block":"none",fontSize:"10px", color:"#999"}}>인증 시간 01 : 00 : 00</p>
            </Grid>
            <Link href="/login">로그인 하러 가기</Link>
        </Grid>
    );
};

const Content = styled.div`
    text-align: center;
    margin:40px 0 50px;
    h1 {
        font-size: 22px;
        margin-bottom: 9px;
        font-weight: 500;
    }
    p {
        font-size: 14px;
        line-height: 1.36;
        letter-spacing: -0.2px;
    }
`;


const Link = styled.a`
    display: block;
    text-decoration: underline;
    font-size: 14px;
    text-align: center;
`;

export default Complete;
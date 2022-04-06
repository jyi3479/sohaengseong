import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import {Grid,Button} from "../elements/index";
import confirm_img from "../image/img_good@2x.png";
import logo from "../image/logo2.png";

const SignComplete = () => {
    return(
        <>
            <Grid style={{height: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexFlow: "column"}}>
                <Logo className="t_center">
                    <p>나를 변화시키는 습관</p>
                    <img src={logo} alt="플랫폼 로고이미지"/>
                </Logo>                              
                <Img src={confirm_img} alt="회원가입 완료이미지"/>
                <Content className="popup">
                    <h2>회원가입이 완료되었습니다!</h2>
                </Content>  
                <Button width="200px" _onClick={()=>{history.push("/login")}}>로그인 하기</Button>                
            </Grid>
        </>
    );
};

const Logo = styled.div`
    margin-bottom: 20px ;
  img {
    width: 106px;
    margin-top: 2px;
  }
`;

const Img = styled.img`
    width: 160px;
    margin-bottom: 28px;
`;

const Content = styled.div`
    margin-bottom: 40px;
    h2 {
        margin-bottom: 8px;
    }
`;


export default SignComplete;